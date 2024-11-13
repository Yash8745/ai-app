import { useState, useEffect, useRef } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/AudioRecorder.css';

const AudioModel = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [status, setStatus] = useState('');
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);


    useEffect(() => {
        const initializeRecorder = async () => {
            console.log("Initializing recorder...");
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const recorder = new MediaRecorder(stream);
                mediaRecorderRef.current = recorder;

                recorder.ondataavailable = (event) => {
                    console.log("Data available", event.data);
                    audioChunksRef.current.push(event.data);
                };

                recorder.onstop = () => {
                    console.log("Recording stopped");
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

        console.log(`Uploading file: ${filename}, size: ${audioBlob.size}, type: ${audioBlob.type}`);

        try {
            const response = await fetch('http://localhost:5000/model/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Transcription and vectorization response:-----------------------------', data);
                setStatus('Saved');
            } else {
                const text = await response.text();
                console.error('Error uploading audio:', text);
                setStatus('Error uploading audio');
            }
        } catch (error) {
            console.error('Error uploading audio:', error);
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

            
            <Footer />
        </div>
    );
};

export default AudioModel;