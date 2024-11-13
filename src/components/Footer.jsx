import { Box, Grid, Link, Typography } from '@mui/material';
import '../styles/Footer.css';  // Make sure to import the CSS file

const Footer = () => {
  return (
    <Box component="footer" className="footer">
      <Box className="footer-container">
        <Grid container spacing={2}>
          {/* Row 1: Brand and Description */}
          <Grid item xs={12} className="footer-brand-description">
            <Typography variant="h6" className="footer-title">
              Memopin
            </Typography>
            <Typography variant="body2" className="footer-description">
              Your enhanced memory assistant, capturing moments effortlessly.
            </Typography>
          </Grid>

          {/* Row 2: Explore and Stay Connected */}
          <Grid item xs={12} className="footer-links">
            <Box className="footer-link-section">
              <Typography variant="h6" className="footer-column-title">
                Explore
              </Typography>
              <Box className="footer-link-list">
                {['Home', 'Features', 'Get Started'].map((text) => (
                  <Link
                    key={text}
                    href={`#${text.toLowerCase().replace(/\s+/g, '-')}`}
                    className="footer-link"
                  >
                    {text}
                  </Link>
                ))}
              </Box>
            </Box>

            {/* Stay Connected Links */}
            <Box className="footer-link-section">
              <Typography variant="h6" className="footer-column-title">
                Stay Connected
              </Typography>
              <Box className="footer-link-list">
                {['Twitter', 'LinkedIn', 'Facebook'].map((platform) => (
                  <Link
                    key={platform}
                    href={`https://${platform.toLowerCase()}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    {platform}
                  </Link>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Footer Bottom Line */}
          <Grid item xs={12} className="footer-bottom">
            <Typography variant="body2" className="footer-bottom-text">
              © 2024 Memopin. All Rights Reserved.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
