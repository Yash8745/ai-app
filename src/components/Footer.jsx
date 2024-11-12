import { Box, Grid, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#ffffff',
        color: '#003366',
        width: '100%',
        position: 'relative', // Ensure the footer stays fixed at the bottom
        bottom: 0, // Attach to the bottom of the viewport
        left: 0,   // Aligns to the left edge of the viewport
        right: 0,  // Aligns to the right edge of the viewport
        boxShadow: 'none',
        padding: '10px 0', // Add padding for better appearance
      }}
    >
      <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Grid container spacing={2}>
          {/* Row 1: Brand and Description */}
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
              Memopin
            </Typography>
            <Typography variant="body2" sx={{ color: '#003366', fontSize: '12px' }}>
              Your enhanced memory assistant, capturing moments effortlessly.
            </Typography>
          </Grid>

          {/* Row 2: Explore and Stay Connected */}
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '30px',
                flexWrap: 'wrap',
              }}
            >
              {/* Explore Links */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                  Explore
                </Typography>
                <Box sx={{ display: 'flex', gap: '16px' }}>
                  {['Home', 'Features', 'Get Started'].map((text) => (
                    <Link
                      key={text}
                      href={`#${text.toLowerCase().replace(/\s+/g, '-')}`}
                      sx={{
                        color: '#003366',
                        textDecoration: 'none',
                        fontSize: '12px',
                        transition: 'color 0.3s ease',
                        '&:hover': { color: '#ffffff' },
                      }}
                    >
                      {text}
                    </Link>
                  ))}
                </Box>
              </Box>

              {/* Stay Connected Links */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '14px' }}>
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
          <Grid item xs={12} sx={{ textAlign: 'center', borderTop: '1px solid #444444', paddingTop: '8px' }}>
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
