import { useState, useEffect, useRef } from 'react';
import { FaMicrophone } from 'react-icons/fa';  // Import FaMicrophone icon
import '../styles/AudioRecorder.css';

const AudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [status, setStatus] = useState('');  // New state to manage status messages
    const mediaRecorderRef = useRef(null);  // Ref to hold mediaRecorder
    const audioChunksRef = useRef([]);  // Ref to hold audio chunks (avoiding unnecessary re-renders)

    useEffect(() => {
        const initializeRecorder = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const recorder = new MediaRecorder(stream);
                mediaRecorderRef.current = recorder;

                recorder.ondataavailable = (event) => {
                    audioChunksRef.current.push(event.data);  // Append to ref instead of state
                };

                recorder.onstop = () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' }); // Keep default type
                    uploadAudio(audioBlob);  // Upload the recorded audio once stop is triggered
                };
            } catch (err) {
                console.error('Error accessing the microphone', err);
            }
        };

        initializeRecorder();
    }, []); // Empty dependency array, `mediaRecorderRef` will not trigger re-renders

    const handleRecord = () => {
        if (mediaRecorderRef.current) {
            setIsRecording(true);
            audioChunksRef.current = []; // Reset ref to avoid stale data
            setStatus('Recording...');  // Show the status message
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
            console.log("Recording done.");
        }
    };

    const uploadAudio = async (audioBlob) => {
        setStatus('Processing...');  // Set the status to "Processing" while uploading

        const formData = new FormData();
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        const filename = `recording_${timestamp}.wav`;  // Default filename is .wav, but can handle others

        formData.append('audio', audioBlob, filename);  // Append audio with unique filename

        console.log(`Uploading file: ${filename}, size: ${audioBlob.size}, type: ${audioBlob.type}`);

        try {
            const response = await fetch('http://localhost:5000/audio/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Transcription and vectorization response:', data);
                setStatus('Saved');  // Update the status once saved
            } else {
                const text = await response.text();
                console.error('Error uploading audio:', text);
                setStatus('Error uploading audio');  // Show error status if upload fails
            }
        } catch (error) {
            console.error('Error uploading audio:', error);
            setStatus('Error uploading audio');  // Show error status on failure
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
            {status && <p>{status}</p>}  {/* Show status messages */}
        </div>
    );
};

export default AudioRecorder;
