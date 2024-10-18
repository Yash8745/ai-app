import React, { useState, useEffect } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import  '../styles/AudioRecorder.css';

const AudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const recorder = new MediaRecorder(stream);
                setMediaRecorder(recorder);

                recorder.ondataavailable = (event) => {
                    setAudioChunks(prev => [...prev, event.data]);
                };

                recorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    // Store or play the audioBlob as needed
                    // You can also provide an option to download or save the recording here
                };
            })
            .catch(err => {
                console.error('Error accessing the microphone', err);
            });
    }, [audioChunks]);

    const handleRecord = () => {
        setIsRecording(true);
        mediaRecorder.start();
    };

    const handleStop = () => {
        setIsRecording(false);
        mediaRecorder.stop();
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
        </div>
    );
};

export default AudioRecorder;
