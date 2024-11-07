import { Box, Grid, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#ADD8E6', // Blue background
        color: '#003366',
        width: '100%', // Ensures the footer stretches across the full page width
        padding: '10px 0', // Same height as header (10px top and bottom padding)
        position: 'relative', // Fixes the footer at the bottom
        bottom: 10, // Attaches the footer to the bottom
        left: 10, // Aligns to the left edge
        right: 10, // Aligns to the right edge
        boxShadow: 'none', // No shadow to maintain uniformity with header
      }}
    >
      <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
        <Grid container spacing={2}>
          {/* Row 1: Brand and Description */}
          <Grid item xs={12} sx={{ textAlign: 'center', marginBottom: '8px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '16px' }}>
              Memopin
            </Typography>
            <Typography variant="body2" sx={{ color: '#003366', fontSize: '12px' }}>
              Your enhanced memory assistant, capturing moments effortlessly.
            </Typography>
          </Grid>

          {/* Row 2: Explore and Stay Connected */}
          <Grid item xs={12} sx={{ textAlign: 'center', marginBottom: '8px' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '30px', // Reduced space between Explore and Stay Connected
                flexWrap: 'wrap', // Allows wrapping in case of smaller screens
              }}
            >
              {/* Explore Links */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '6px', fontSize: '14px' }}>
                  Explore
                </Typography>
                <Box sx={{ display: 'flex', gap: '16px' }}>
                  {['Home', 'Features', 'Get Started'].map((text) => (
                    <Link
                      key={text}
                      href={`#${text.toLowerCase().replace(/\s+/g, '-')}`}
                      sx={{
                        color: '#003366', // Slightly gray color for links
                        textDecoration: 'none',
                        fontSize: '12px',
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
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '6px', fontSize: '14px' }}>
                  Stay Connected
                </Typography>
                <Box sx={{ display: 'flex', gap: '16px' }}>
                  {['Twitter', 'LinkedIn', 'Facebook'].map((platform) => (
                    <Link
                      key={platform}
                      href={`https://${platform.toLowerCase()}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: '#003366',
                        textDecoration: 'none',
                        fontSize: '12px',
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
          <Grid item xs={12} sx={{ textAlign: 'center', borderTop: '1px solid #444444', paddingTop: '4px' }}>
            <Typography variant="body2" sx={{ color: '#003366', fontSize: '10px' }}>
              © 2024 Memopin. All Rights Reserved.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
