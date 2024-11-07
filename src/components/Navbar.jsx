import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-scroll';
import Memopin from '../assets/Memopin.png'; // Import your PNG logo

const Navigation = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#ADD8E6', boxShadow: 'none', height: '70px' }}>
      <Toolbar sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
        {/* Logo using PNG image */}
        <Box
          component="img"
          src={Memopin} // Ensure it's pointing to the PNG image
          alt="Memopin Logo"
          sx={{
            height: '70px', // Adjust the size of the logo
            width: '220px',
            objectFit: 'contain', // Ensures the aspect ratio remains intact
            marginLeft: '0px', // Add margin if needed for spacing
          }}
        />

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {['Home', 'Features', 'Get Started'].map((text) => (
            <Button
              key={text}
              sx={{
                margin: '0 12px',
                textTransform: 'none',
                color: '#003366', // Dark Blue color similar to the logo
                '&:hover': {
                  backgroundColor: 'rgba(0, 51, 102, 0.1)', // Slight dark blue hover effect
                },
              }}
            >
              <Link to={text.toLowerCase().replace(/\s+/g, '-')} smooth={true} duration={500}>
                {text}
              </Link>
            </Button>
          ))}

          {/* Profile Picture Dropdown */}
          <IconButton onClick={handleProfileMenuOpen}>
            <Avatar alt="Profile" src="/path/to/profile.jpg" /> {/* Update the path to your profile picture */}
          </IconButton>
          <Menu
            anchorEl={profileMenuAnchorEl}
            open={Boolean(profileMenuAnchorEl)}
            onClose={handleProfileMenuClose}
            sx={{ mt: '45px' }}
          >
            <MenuItem onClick={handleProfileMenuClose}>Login</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
          </Menu>
        </Box>

        {/* Mobile Navigation Menu */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon sx={{ color: '#003366' }} /> {/* Adjust icon color */}
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {['Home', 'Features', 'Get Started'].map((text) => (
              <MenuItem key={text} onClick={handleMenuClose}>
                <Link to={text.toLowerCase().replace(/\s+/g, '-')} smooth={true} duration={500}>
                  {text}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
