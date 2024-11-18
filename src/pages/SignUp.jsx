import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Checkbox, FormControlLabel, Grid, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GlobalStyles } from '@mui/system';

const SignUp = () => {
  const navigate = useNavigate();
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
      email,
      password,
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
      setTimeout(() => {
        navigate('/Login');
      }, 1000);
    } catch (error) {
      console.error('Error during signup:', error.response?.data);
      setErrorMessage('Registration failed. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <>
      {/* Global background styles */}
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#ffffff', margin: 0, padding: 0, minHeight: '100vh' },
          html: { backgroundColor: '#ffffff', margin: 0, padding: 0, minHeight: '100vh' },
        }}
      />

      <Container component="main" maxWidth="lg" sx={{ height: '90vh', display: 'flex', padding: 0 }}>
        {/* Left Side: Signup Form */}
        <Box
          sx={{
            flex:1,
            alignItems: 'center',
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#ADD8E6',
            color: '#003366',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
            Sign Up
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

          <Box component="form" sx={{ mt: 1,width:'100%' }} onSubmit={handleSubmit}>
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
                    backgroundColor: '#ffffff',
                    '& .MuiInputBase-input': { color: '#003366' },
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
                    backgroundColor: '#ffffff',
                    '& .MuiInputBase-input': { color: '#003366' },
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
                    backgroundColor: '#ffffff',
                    '& .MuiInputBase-input': { color: '#003366' },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={allowExtraEmails}
                      onChange={(e) => setAllowExtraEmails(e.target.checked)}
                      sx={{ color: '#003366', '&.Mui-checked': { color: '#003366' } }}
                    />
                  }
                  label="I want to receive updates via email."
                  sx={{ color: '#003366' }}
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
                backgroundColor: '#003366',
                color: '#ffffff',
                '&:hover': { backgroundColor: '#003366' },
              }}
            >
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2" sx={{ color: '#003366' }}>
                  Already have an account?{' '}
                  <Link to="/Login" style={{ textDecoration: 'none', color: '#003366' }}>
                    Login
                  </Link>
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon sx={{ color: '#003366' }} />}
                  sx={{
                    borderColor: '#003366',
                    color: '#003366',
                    '&:hover': { borderColor: '#003366', backgroundColor: '#ffffff' },
                  }}
                >
                  Sign up with Google
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Right Side: Information Box */}
        <Box
          sx={{
            flex:1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#003366',
            color: '#ADD8E6',
            padding: 4,
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <Typography component="h5" variant="h4" sx={{ marginBottom: 2 }}>
            Hello, Friend!
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: '80%' }}>
            Please set your username and password and get ready to meet your enhanced memory and recall tool. A more organized way to store and retrieve your precious memories!
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
