import { useState, useEffect, useRef } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import '../styles/AudioRecorder.css';

const AudioModel = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [status, setStatus] = useState('');
    const [responseText, setResponseText] = useState(''); // State to store only the response text
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

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

    const handleStop = () => {
        if (mediaRecorderRef.current) {
            setIsRecording(false);
            setStatus('Recording done.');
            mediaRecorderRef.current.stop();
        }
    };

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
            // Only display the value of the "filename" key
            if (data && data.filename) {
                setResponseText(data.filename); // Display only the filename value
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

    return (
        <div className="audio-recorder-container">
            <Navbar />
            <div style={{ textAlign: 'center', marginTop: '20px', padding: '20px' }}>
                <p style={{ fontSize: '1.2em', fontWeight: 'bold', margin: '20px 0', color: '#003366' }}>
                    Enter an image, document, or record your day to ensure you never forget anything and can retrieve it whenever needed.
                </p>
            </div>

            <h2 style={{ color: '#003366' }}>Audio Recorder</h2>
            <button 
                className={`record-button ${isRecording ? 'glow' : ''}`} 
                onClick={isRecording ? handleStop : handleRecord}
                aria-label={isRecording ? 'Stop Recording' : 'Start Recording'}
            >
                <FaMicrophone size={50} color="#ADD8E6" />
            </button>

            {/* Display status messages with dark blue color */}
            {status && <p style={{ color: '#003366' }}>{status}</p>}

            {/* Display response text only */}
            {responseText && <p style={{ color: '#003366', fontWeight: 'bold' }}>{responseText}</p>}
        </div>
    );
};

export default AudioModel;
