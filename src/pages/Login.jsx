import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Grid, Box, CircularProgress, GlobalStyles } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const user = {
      username: username.toLowerCase(),
      password,
    };

    try {
      const response = await axios.post('http://localhost:3001/api/login', user);
      setSuccessMessage(response.data.message || "Login successful!");
      setErrorMessage('');
      navigate('/home');
    } catch (error) {
      setErrorMessage(error.response?.data.message || 'Login failed. Please check your credentials.');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#ffffff', margin: 0, padding: 0, minHeight: '100vh' },
          html: { backgroundColor: '#ffffff', margin: 0, padding: 0, minHeight: '100vh' },
        }}
      />
      <Box
        sx={{
          height: '100vh',
          backgroundColor: '#ffffff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container
          component="main"
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch', // Stretch child components to fill container
            padding: 0, // Remove padding
            height: '80vh', // Make the container taller to better fill the screen
          }}
        >
          {/* Left Side Box (Form) */}
          <Box
            sx={{
              flex: 1, // Takes up 50% of the container
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 4,
              backgroundColor: '#add8e6',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Typography component="h1" variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#003366' }}>
              Login
            </Typography>
            {successMessage && (
              <Typography variant="body1" sx={{ color: '#003366', marginBottom: 2 }}>
                {successMessage}
              </Typography>
            )}
            {errorMessage && (
              <Typography variant="body1" sx={{ color: '#003366', marginBottom: 2 }}>
                {errorMessage}
              </Typography>
            )}
            <Box component="form" sx={{ mt: 1, width: '100%' }} onSubmit={handleSubmit}>
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      '& .MuiInputBase-input': {
                        color: '#003366',
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      '& .MuiInputBase-input': {
                        color: '#003366',
                      },
                    }}
                  />
                </Grid>
              </Grid>
              {loading ? (
                <CircularProgress sx={{ mt: 3, mb: 2, color: '#003366' }} />
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
                    backgroundColor: '#003366',
                    color: '#ffffff',
                    '&:hover': {
                      backgroundColor: '#ffffff',
                      color: '#003366',
                    },
                    textTransform: 'none',
                  }}
                  disabled={loading}
                >
                  Login
                </Button>
              )}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Typography variant="body2" sx={{ color: '#003366' }}>
                    Don’t have an account?{' '}
                    <Link to="/" style={{ textDecoration: 'none', color: '#003366', transition: 'color 0.3s' }}>
                      Sign up
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>

          {/* Right Side Box (Welcome Message) */}
          <Box
            sx={{
              flex: 1, // Takes up 50% of the container
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#003366',
              color: '#ADD8E6',
              padding: 4,
              textAlign:'center',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Hello, Friend
            </Typography>
            <Typography variant="body1">
              Welcome back! Please login to access your account.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Login;
