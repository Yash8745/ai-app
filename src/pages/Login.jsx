import { useState } from 'react'; // Import useState to manage form data
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { Container, Typography, TextField, Button, Grid, Box, CircularProgress } from '@mui/material';
import axios from 'axios'; // Import axios for making HTTP requests

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // State variables to manage form input and messages
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload on form submit

    // Start loading
    setLoading(true);

    // Create user object with username converted to lowercase
    const user = {
      username: username.toLowerCase(), // Use username here
      password: password,
    };

    try {
      // Send POST request to login endpoint
      const response = await axios.post('http://localhost:3001/api/login', user);
      console.log(response.data); // Log success message

      setSuccessMessage(response.data.message || "Login successful!"); // Set success message
      setErrorMessage(''); // Clear any existing error message

      // Navigate to Home page after a successful login
      navigate('/home'); // Adjust the path according to your routing setup

    } catch (error) {
      console.error('Error during login:', error.response?.data); // Log error message

      // Set error message based on server response or a default one
      setErrorMessage(error.response?.data.message || 'Login failed. Please check your credentials.');
      setSuccessMessage(''); // Clear any existing success message
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
          padding: 3,
          backgroundColor: '#000000', // Black background for the container
          color: '#ffffff', // White text for contrast
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)', // Deeper shadow for a more elevated look
        }}
      >
        {/* Heading */}
        <Typography component="h1" variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#ffffff' }}>
          Login
        </Typography>

        {/* Success and Error Messages */}
        {successMessage && (
          <Typography variant="body1" sx={{ color: '#76ff03', marginBottom: 2 }}>
            {successMessage}
          </Typography>
        )}
        {errorMessage && (
          <Typography variant="body1" sx={{ color: '#ff1744', marginBottom: 2 }}>
            {errorMessage}
          </Typography>
        )}

        {/* Login Form */}
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                variant="outlined"
                value={username} // Bind state value
                onChange={(e) => setUsername(e.target.value)} // Update state on input change
                sx={{
                  borderRadius: '8px',
                  backgroundColor: '#333333',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ffffff',
                  },
                  '& .MuiInputBase-input': {
                    color: '#ffffff',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                variant="outlined"
                value={password} // Bind state value
                onChange={(e) => setPassword(e.target.value)} // Update state on input change
                sx={{
                  borderRadius: '8px',
                  backgroundColor: '#333333',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ffffff',
                  },
                  '& .MuiInputBase-input': {
                    color: '#ffffff',
                  },
                }}
              />
            </Grid>
          </Grid>

          {/* Show loading spinner when loading, else show Login button */}
          {loading ? (
            <CircularProgress sx={{ mt: 3, mb: 2, color: '#ffffff' }} />
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                borderRadius: '20px',
                padding: '10px 0',
                backgroundColor: '#555555', // Darker gray button color
                color: '#ffffff', // White text on button
                '&:hover': {
                  backgroundColor: '#ffffff', // Button turns white on hover
                  color: '#000000', // Text turns black on hover
                },
                textTransform: 'none',
              }}
              disabled={loading} // Disable button when loading
            >
              Login
            </Button>
          )}

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="body2" sx={{ color: '#ffffff' }}>
                Don’t have an account?{' '}
                <a href="/sign-up" style={{ textDecoration: 'none', color: '#ffffff', transition: 'color 0.3s' }}>
                  <span style={{ color: '#ffffff', transition: 'color 0.3s' }}>Sign up</span>
                </a>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
