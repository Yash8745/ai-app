import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import '../styles/AudioRecorder.css';

const AudioModel = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [status, setStatus] = useState('');
    const [responseText, setResponseText] = useState(''); // State to store the response text
    const [hasSpoken, setHasSpoken] = useState(false); // Track if the text has been spoken
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    // Initialize MediaRecorder
    useEffect(() => {
        const initializeRecorder = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const recorder = new MediaRecorder(stream);
                mediaRecorderRef.current = recorder;

                recorder.ondataavailable = (event) => {
                    audioChunksRef.current.push(event.data);
                };

                recorder.onstop = () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                    uploadAudio(audioBlob);
                };
            } catch (err) {
                console.error('Error accessing the microphone', err);
            }
        };

        initializeRecorder();
    }, []);

    // Start recording
    const handleRecord = () => {
        if (mediaRecorderRef.current) {
            setIsRecording(true);
            audioChunksRef.current = [];
            setStatus('Recording...');
            mediaRecorderRef.current.start();
        } else {
            console.error('Media recorder is not initialized');
        }
    };

    // Stop recording
    const handleStop = () => {
        if (mediaRecorderRef.current) {
            setIsRecording(false);
            setStatus('Recording done.');
            mediaRecorderRef.current.stop();
        }
    };

    // Upload audio and get response
    const uploadAudio = async (audioBlob) => {
        setStatus('Processing...');

        const formData = new FormData();
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        const filename = `recording_${timestamp}.wav`;

        formData.append('audio', audioBlob, filename);

        try {
            const response = await fetch('http://localhost:5000/model/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                if (data && data.filename) {
                    setResponseText(data.filename); // Display only the filename value
                } else if (data && data.transcription) {
                    setResponseText(data.transcription); // Or display the transcription, if needed
                } else {
                    setResponseText('Audio processed successfully');
                }
                setStatus('Saved');
            } else {
                const text = await response.text();
                setResponseText(`Error uploading audio: ${text}`);
                setStatus('Error uploading audio');
            }
        } catch (error) {
            setResponseText(`Error uploading audio: ${error.message}`);
            setStatus('Error uploading audio');
        }
    };

    // Convert text to speech
    const speakText = (text) => {
        if (text) {
            console.log('Speaking text:', text);

            const speech = new SpeechSynthesisUtterance(text);
            speech.lang = 'en-US';

            const voices = window.speechSynthesis.getVoices();
            const femaleVoice = voices.find((voice) =>
                voice.name.toLowerCase().includes('female')
            );

            speech.voice = femaleVoice || voices[0];

            speech.onstart = () => {
                console.log('Speech started');
            };

            speech.onend = () => {
                console.log('Speech ended');
                setHasSpoken(true); // Mark as spoken after speech ends
            };

            window.speechSynthesis.speak(speech);
        } else {
            console.error('No text to speak!');
        }
    };

    // Trigger speech when responseText updates
    useEffect(() => {
        if (responseText && !hasSpoken) {
            speakText(responseText); // Speak the response text
        }
    }, [responseText, hasSpoken]);

    return (
        <div className="audio-recorder-container">
            <Navbar />
            <div style={{ textAlign: 'center', marginTop: '20px', padding: '20px' }}>
                <p
                    style={{
                        fontSize: '28px',
                        fontWeight: 'bold',
                        margin: '20px 0',
                        color: '#003366',
                    }}
                >
                    Ask Question so that you can retrieve your moments.
                </p>
            </div>

            <h2 style={{ color: '#003366' }}>
                Hey Friend! Ask anything about you. I am here to answer
            </h2>

            {/* Avatar interaction */}
            <div
                className={`avatar-container ${isRecording ? 'recording' : ''}`}
                onClick={isRecording ? handleStop : handleRecord}
            >
                <img
                    src="/Avatar/boy.png" // Correct path to the public folder
                    alt="Interactive Avatar"
                    className="avatar"
                />
            </div>

            {/* Display status messages with dark blue color */}
            {status && <p style={{ color: '#003366' }}>{status}</p>}

            {/* Display response text */}
            {responseText && (
                <p style={{ color: '#003366', fontWeight: 'bold' }}>{responseText}</p>
            )}
        </div>
    );
};

export default AudioModel;
