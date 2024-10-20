import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '@mui/material/Button'; // Import Button from Material-UI

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleNext = () => {
    navigate('/main'); // Navigate to the Main component
  };

  return (
    <div>
      <Navbar />
      <main>
        {/* Add your main content here */}
        <h1>Welcome to Memopin!</h1>
        <p>Your AI-enhanced memory recall tool.</p>
        
        {/* Next Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          sx={{
            mt: 3,
            borderRadius: '20px',
            padding: '10px 20px',
            textTransform: 'none',
          }}
        >
          Next
        </Button>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
