import React, { useState, useEffect } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import '../styles/AudioRecorder.css';

const AudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);

    useEffect(() => {
        const initializeRecorder = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const recorder = new MediaRecorder(stream);
                setMediaRecorder(recorder);

                recorder.ondataavailable = (event) => {
                    setAudioChunks(prev => [...prev, event.data]);
                };

                recorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    // Send audioBlob to the backend
                    uploadAudio(audioBlob);
                };
            } catch (err) {
                console.error('Error accessing the microphone', err);
            }
        };

        initializeRecorder();
    }, []);

    const handleRecord = () => {
        if (mediaRecorder) {
            setIsRecording(true);
            setAudioChunks([]); // Clear previous audio chunks
            mediaRecorder.start();
        } else {
            console.error('Media recorder is not initialized');
        }
    };

    const handleStop = () => {
        if (mediaRecorder) {
            setIsRecording(false);
            mediaRecorder.stop();
            console.log("Recording done.");
        }
    };

    const uploadAudio = async (audioBlob) => {
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.wav'); // Append the audio file

        try {
            const response = await fetch('http://localhost:5000/upload', { // Adjust the URL to your backend's address
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log('Transcription and vectorization response:', data);
        } catch (error) {
            console.error('Error uploading audio:', error);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Audio Recorder</h2>
            <button 
                className={`record-button ${isRecording ? 'glow' : ''}`} 
                onClick={isRecording ? handleStop : handleRecord}
                aria-label={isRecording ? 'Stop Recording' : 'Start Recording'}
            >
                <FaMicrophone size={50} color="white" />
            </button>
            {isRecording && <p>Recording...</p>}
            {!isRecording && audioChunks.length > 0 && <p>Recording done.</p>}
        </div>
    );
};

export default AudioRecorder;
