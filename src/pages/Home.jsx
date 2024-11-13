/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '@mui/material/Button'; // Import Button from Material-UI
import { Carousel } from 'react-responsive-carousel'; // Import the Carousel component
import '../styles/Home.css'; // Importing the CSS file for Home page
// Import react-responsive-carousel CSS for Home component only
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const carouselImages = [
  '/Carouselimages/1.png',
  '/Carouselimages/2.png',
  '/Carouselimages/3.png',
  '/Carouselimages/4.png'
];

const techStackImages = [
  '/TechStackimages/nlp_lib.avif',  // NLP image
  '/TechStackimages/rag-framework.webp',  // RAG AI image
  '/TechStackimages/llm.png',  // LLM image
  '/TechStackimages/pinecone.png',  // Vector Database image
];

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleNext = () => {
    navigate('/main'); // Navigate to the Main component
  };

  return (
    <div>
      <Navbar />
      <div style={{ marginTop: '80px' }}>
        {/* Carousel Slider Above Home Content */}
        <Carousel
          infiniteLoop
          autoPlay
          interval={3000}
          showThumbs={false}
          showStatus={false}
          emulateTouch
          dynamicHeight={false}
          className="carousel-slider"
        >
          {carouselImages.map((src, index) => (
            <div key={index}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="carousel-image"
              />
            </div>
          ))}
        </Carousel>

        <main className="home-main">
          {/* First Two-column layout for Welcome Section */}
          <div className="welcome-container">
            <div className="welcome-video">
              <video width="100%" controls>
              <source src="/public/Video/Memopin.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="welcome-text">
              <h1>Welcome to Memopin!</h1>
              <p>
                Your AI-enhanced memory recall tool. In today’s digital world, fragmented memories and forgetfulness across platforms are common 
                challenges. People often struggle to recall meaningful moments, as photos, conversations, and 
                videos are scattered across different apps, making retrieval difficult.
                For individuals with Alzheimer's, memory impairments cause daily challenges like confusion, 
                disorientation, and emotional distress. This affects their sense of self, relationships, and emotional 
                well-being, particularly when they struggle to recall important memories..
                Memopin tackles these challenges with an AI-Enhanced Memory Recall Tool that stores key 
                moments on a unified platform. Using Retrieval-Augmented Generation (RAG) AI, large language 
                models (LLMs), and Natural Language Processing (NLP), it helps users retrieve detailed, context-rich memories from audio, video, and photos.
                Memopin’s video analysis enhances memory recall by providing a deeper understanding of 
                multimedia content. Unlike other solutions, it organizes memories into a searchable, context-aware database, making it easy to retrieve and reflect on past experiences. This approach aims to 
                improve personal memory management, cognitive health, and emotional well-being.
              </p>
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="tech-container">
            <div className="tech-text">
              <h1>Tech Stack</h1>
              <ul>
                <li><strong>Natural Language Processing (NLP):</strong> Analyzes speech and text within recorded content to enhance memory context and improve relevance.</li>
                <li><strong>Retrieval-Augmented Generation (RAG) AI:</strong> Combines memory storage and querying for contextually accurate responses to user queries.</li>
                <li><strong>Large Language Models (LLMs):</strong> Understands and contextualizes user queries, offering detailed and relevant memories reflecting personal experiences.</li>
                <li><strong>Video Analysis:</strong> Provides comprehensive understanding and recall of multimedia content, enhancing user experience with rich, contextual memory retrieval.</li>
                <li><strong>Vector Databases:</strong> Enables efficient storage and retrieval of multimedia data, ensuring structured organization for quick access.</li>
              </ul>
            </div>
            <div className="tech-stack-images">
              {techStackImages.map((src, index) => (
                <div key={index} className="tech-stack-item">
                  <img src={src} alt={`Tech Stack ${index + 1}`} className="tech-stack-image" />
                </div>
              ))}
            </div>
          </div>

          {/* About Us Section */}
          <div className="about-us-container">
  <h2>About Us</h2>
  <div className="about-us-team">
    {/* Person 1 */}
    <div className="team-member">
      <img src="/PersonImages/person 1.webp" alt="Person 1" className="team-image" />
      <h3>Yash Narang</h3>
      
      <p className="role">Model Architect</p>
      <p className="description"> Created the whole architecture of model and pipeline</p>
    </div>

    {/* Person 2 */}
    <div className="team-member">
      <img src="/PersonImages/person 2.jpg" alt="Person 2" className="team-image" />
      <h3>Nivarthi Ananya</h3>
      <p className="role">Frontend and Database Engineer</p>
      <p className="description">Made the UI and connected with database.</p>
    </div>

    {/* Person 3 */}
    <div className="team-member">
      <img src="/PersonImages/person 3.jpg" alt="Person 3" className="team-image" />
      <h3>Rudransh Singh</h3>
      <p className="role">Model Engineer</p>
      <p className="description">Wrote the code for models.</p>
    </div>
  </div>
</div>


          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            sx={{
              mt: 3,
              mb: 5, // Add margin-bottom to create space below the button
              borderRadius: '20px',
              padding: '15px 30px', // Larger padding
              textTransform: 'none',
              fontSize: '30px',
              minWidth: '200px',
              height: '70px',
            }}
          >
            Next
          </Button>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
