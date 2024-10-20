import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { Container, Typography, TextField, Button, Checkbox, FormControlLabel, Grid, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [allowExtraEmails, setAllowExtraEmails] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      username: fullName,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:3001/api/signup', user);
      console.log(response.data);
      setSuccessMessage('User registered successfully!');
      setErrorMessage('');
      setFullName('');
      setEmail('');
      setPassword('');
      setAllowExtraEmails(false);

      // Redirect to login page after successful signup
      setTimeout(() => {
        navigate('/Login'); // Navigate to the login page
      }, 1000); // Optional: delay for 1 second to show success message

    } catch (error) {
      console.error('Error during signup:', error.response?.data);
      setErrorMessage('Registration failed. Please try again.');
      setSuccessMessage('');
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
          backgroundColor: '#000000',
          color: '#ffffff',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#ffffff' }}>
          Sign Up
        </Typography>

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

        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="fullName"
                label="Full Name"
                name="fullName"
                autoComplete="name"
                variant="outlined"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                autoComplete="new-password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <FormControlLabel
                control={
                  <Checkbox
                    value={allowExtraEmails}
                    onChange={(e) => setAllowExtraEmails(e.target.checked)}
                    sx={{ color: '#ffffff', '&.Mui-checked': { color: '#ffffff' } }}
                  />
                }
                label="I want to receive updates via email."
                sx={{ color: '#ffffff' }}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              borderRadius: '20px',
              padding: '10px 0',
              backgroundColor: '#555555',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#ffffff',
                color: '#000000',
              },
              textTransform: 'none',
            }}
          >
            Sign Up
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="body2" sx={{ color: '#ffffff' }}>
                Already have an account?{' '}
                <a href="/sign-in" style={{ textDecoration: 'none', color: '#ffffff', transition: 'color 0.3s' }}>
                  <span style={{ color: '#ffffff', transition: 'color 0.3s' }}>
                    Sign in
                  </span>
                </a>
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon sx={{ color: '#4285F4' }} />}
              sx={{
                borderRadius: '20px',
                padding: '10px 0',
                color: '#ffffff',
                borderColor: '#444444',
                '&:hover': {
                  borderColor: '#ffffff',
                  color: '#000000',
                  '& .MuiSvgIcon-root': {
                    color: '#4285F4',
                  },
                  backgroundColor: '#ffffff',
                },
              }}
            >
              Sign up with Google
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SignUp;