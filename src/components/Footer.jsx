import React from 'react';
import { Box, Grid, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#000000', // Black background
        color: '#ffffff',
        width: '100%', // Ensures the footer stretches across the full page width
        padding: '15px 0', // Slimmer padding for a more aesthetic design
        position: 'fixed', // Fixes the footer at the bottom
        bottom: 0, // Attaches the footer to the bottom
        left: 0, // Aligns to the left edge
        right: 0, // Aligns to the right edge
      }}
    >
      <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}> {/* Controls content width */}
        <Grid container spacing={3}>
          {/* Row 1: Brand and Description */}
          <Grid item xs={12} sx={{ textAlign: 'center', marginBottom: '15px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
              Memopin
            </Typography>
            <Typography variant="body2" sx={{ color: '#888888' }}>
              Your enhanced memory assistant, capturing moments effortlessly.
            </Typography>
          </Grid>

          {/* Row 2: Explore and Stay Connected */}
          <Grid item xs={12} sx={{ textAlign: 'center', marginBottom: '15px' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '50px', // Space between Explore and Stay Connected
                flexWrap: 'wrap', // Allows wrapping in case of smaller screens
              }}
            >
              {/* Explore Links */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                  Explore
                </Typography>
                <Box sx={{ display: 'flex', gap: '24px' }}>
                  {['Home', 'Features', 'Get Started'].map((text) => (
                    <Link
                      key={text}
                      href={`#${text.toLowerCase().replace(/\s+/g, '-')}`}
                      sx={{
                        color: '#888888', // Slightly gray color for links
                        textDecoration: 'none',
                        fontSize: '14px',
                        transition: 'color 0.3s ease',
                        '&:hover': { color: '#ffffff' }, // Turn white on hover
                      }}
                    >
                      {text}
                    </Link>
                  ))}
                </Box>
              </Box>

              {/* Stay Connected Links */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                  Stay Connected
                </Typography>
                <Box sx={{ display: 'flex', gap: '24px' }}>
                  {['Twitter', 'LinkedIn', 'Facebook'].map((platform) => (
                    <Link
                      key={platform}
                      href={`https://${platform.toLowerCase()}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: '#888888',
                        textDecoration: 'none',
                        fontSize: '14px',
                        transition: 'color 0.3s ease',
                        '&:hover': { color: '#ffffff' },
                      }}
                    >
                      {platform}
                    </Link>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Footer Bottom Line */}
          <Grid item xs={12} sx={{ textAlign: 'center', borderTop: '1px solid #444444', paddingTop: '10px' }}>
            <Typography variant="body2" sx={{ color: '#888888' }}>
              © 2024 Memopin. All Rights Reserved.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
