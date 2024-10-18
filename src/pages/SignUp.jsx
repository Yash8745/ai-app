import React from 'react';
import { Container, Typography, TextField, Button, Checkbox, FormControlLabel, Grid, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const SignUp = () => {
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
          Sign Up
        </Typography>

        {/* Sign Up Form */}
        <Box component="form" sx={{ mt: 1 }}>
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
                sx={{
                  borderRadius: '8px',
                  backgroundColor: '#333333', // Dark background for input field
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ffffff', // Light border on hover
                  },
                  '& .MuiInputBase-input': {
                    color: '#ffffff', // White text for input
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
                control={<Checkbox value="allowExtraEmails" sx={{ color: '#ffffff', '&.Mui-checked': { color: '#ffffff' } }} />}
                label="I want to receive updates via email."
                sx={{ color: '#ffffff' }} // White text for the label
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
              backgroundColor: '#555555', // Darker gray button color
              color: '#ffffff', // White text on button
              '&:hover': {
                backgroundColor: '#ffffff', // Button turns white on hover
                color: '#000000', // Text turns black on hover
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

        {/* Social Signup Option */}
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon sx={{ color: '#4285F4' }} />} // Original Google color
              sx={{
                borderRadius: '20px',
                padding: '10px 0',
                color: '#ffffff', // White text
                borderColor: '#444444', // Darker border color
                '&:hover': {
                  borderColor: '#ffffff', // Light border on hover
                  color: '#000000', // Keep text white on hover
                  '& .MuiSvgIcon-root': {
                    color: '#4285F4', // Google icon returns to original color on hover
                  },
                  backgroundColor: '#ffffff', // Dark background on hover
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
