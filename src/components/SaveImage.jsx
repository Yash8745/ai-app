import { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/AudioRecorder.css';

const SaveImage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [imageStatus, setImageStatus] = useState('');
    const [loading, setLoading] = useState(false);  // New state for loading

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
        setLoading(true);  // Set loading state to true when the upload starts
        setImageStatus('Generating description... Please wait.');

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
                setImageStatus(`Image processed and saved successfully: ${data.filename}`);
                setSelectedImage(null);  // Clear the image after upload
            } else {
                const error = await response.json();
                setImageStatus(`Error processing image: ${error.error}`);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setImageStatus('Error uploading image');
        } finally {
            setLoading(false);  // Set loading to false when processing is done
        }
    };

    return (
        <div className="image-uploader-container">
            <Navbar />
            <div style={{ textAlign: 'center', marginTop: '20px', padding: '20px' }}>
                <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '20px 0', color: '#003366' }}>
                    Upload an image to store and retrieve it whenever you need.
                </p>
            </div>

            {/* Status message above the upload area */}
            {imageStatus && !loading && (
                <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#003366', marginBottom: '20px' }}>
                    {imageStatus}
                </p>
            )}

            {/* Loading indicator */}
            {loading && (
                <div style={{ margin: '20px', fontSize: '1.2em', color: '#003366' }}>
                    <div className="spinner" style={{ display: 'inline-block', marginRight: '10px' }}></div>
                    <span>Processing image...</span>
                </div>
            )}

            <div 
                className={`image-upload ${dragging ? 'dragging' : ''}`} 
                onDragOver={handleDragOver} 
                onDragLeave={handleDragLeave} 
                onDrop={handleDrop}
                style={{ textAlign: 'center', padding: '120px', cursor: 'pointer' }}
                onClick={() => document.getElementById('image-input').click()}  // Trigger file input on click anywhere in the area
            >
                <label htmlFor="image-input" className="image-upload-button" style={{ display: 'inline-block', cursor: 'pointer' }}>
                    Drag & Drop your image here
                </label>
                <input 
                    type="file" 
                    id="image-input" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="image-input"
                    style={{ display: 'none' }}  // Hide the input file
                />
                {selectedImage && <img src={selectedImage} alt="Selected" className="image-preview" />}
            </div>
        </div>
    );
};

export default SaveImage;
