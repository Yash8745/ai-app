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
    const [imageStatus, setImageStatus] = useState('');

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

    const handleImageUpload = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedImage(URL.createObjectURL(file));
            uploadImage(file);  // Call uploadImage after selecting the file
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
            const file = files[0];
            setSelectedImage(URL.createObjectURL(file));
            uploadImage(file);  // Call uploadImage after dropping the file
        }
    };

    // Upload Image Function
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('http://localhost:5000/image/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Image upload response:', data);
                setImageStatus(`Image uploaded successfully: ${data.filename}`);
            } else {
                const error = await response.json();
                setImageStatus(`Error uploading image: ${error.error}`);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setImageStatus('Error uploading image');
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
                setStatus('Audio saved');
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
            
            {/* Audio description below the button */}
            {status && <p style={{ color: '#003366' }}>{status}</p>}

            <p style={{ fontSize: '1.2em', marginTop: '10px', color: '#003366' }}>
                {isRecording ? "Recording in progress..." : "Click the button to start recording your audio."}
            </p>

            {/* Dotted line separator for image upload section */}
            <hr style={{ borderTop: '2px dotted #003366', margin: '20px 0' }} />

            <div 
                className={`image-upload ${dragging ? 'dragging' : ''}`} 
                onDragOver={handleDragOver} 
                onDragLeave={handleDragLeave} 
                onDrop={handleDrop}
            >
                <label htmlFor="image-input" className="image-upload-button">
                    Drag & Drop your image here
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

            {/* Image description below dotted line */}
            {imageStatus && <p style={{ color: '#003366' }}>{imageStatus}</p>}

            <Footer />
        </div>
    );
};

export default AudioRecorder;
