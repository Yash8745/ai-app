import { useState, useEffect, useRef } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/AudioRecorder.css';

const AudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [status, setStatus] = useState('');
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [dragging, setDragging] = useState(false);

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

    const handleImageUpload = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const files = event.dataTransfer.files;
        if (files && files.length > 0) {
            setSelectedImage(URL.createObjectURL(files[0]));
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
            const response = await fetch('http://localhost:5000/audio/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Transcription and vectorization response:', data);
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
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Navbar />
            <div style={{ textAlign: 'center', marginTop: '20px', padding: '20px' }}>
    <p style={{ fontSize: '1.2em', fontWeight: 'bold', margin: '20px 0', color: '#333' }}>
        Enter an image, document, or record your day to ensure you never forget anything and can retrieve it whenever needed.
    </p>
</div>

            <h2>Audio Recorder</h2>
            <button 
                className={`record-button ${isRecording ? 'glow' : ''}`} 
                onClick={isRecording ? handleStop : handleRecord}
                aria-label={isRecording ? 'Stop Recording' : 'Start Recording'}
            >
                <FaMicrophone size={50} color="white" />
            </button>
            {status && <p>{status}</p>}

            <div 
                className={`image-upload ${dragging ? 'dragging' : ''}`} 
                onDragOver={handleDragOver} 
                onDragLeave={handleDragLeave} 
                onDrop={handleDrop}
            >
                <label htmlFor="image-input" className="image-upload-button">
                    Select an Image or Drop Here
                </label>
                <input 
                    type="file" 
                    id="image-input" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="image-input"
                />
                {selectedImage && <img src={selectedImage} alt="Selected" className="image-preview" />}
            </div>
            <Footer />
        </div>
    );
};

export default AudioRecorder;
