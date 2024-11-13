import  { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Memopin from '../assets/Memopin.png';

const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  const [featuresMenuAnchorEl, setFeaturesMenuAnchorEl] = useState(null);
  const navigate = useNavigate(); // useNavigate hook for navigation

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

  const handleFeaturesMenuOpen = (event) => {
    setFeaturesMenuAnchorEl(event.currentTarget);
  };

  const handleFeaturesMenuClose = () => {
    setFeaturesMenuAnchorEl(null);
  };

  // Navigate to the selected page
  const navigateToPage = (page) => {
    navigate(`/${page}`); // Navigate to the page based on the passed string
    handleFeaturesMenuClose(); // Close the menu after navigation
    handleProfileMenuClose(); // Close the profile menu after navigation
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#ffffff', boxShadow: 'none', height: '70px' }}>
      <Toolbar sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
        {/* Logo */}
        <Box
          component="img"
          src={Memopin}
          alt="Memopin Logo"
          sx={{
            height: '70px',
            width: '220px',
            objectFit: 'contain',
          }}
        />

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Home Button */}
          <Button
            sx={{
              margin: '0 12px',
              textTransform: 'none',
              color: '#003366',
              '&:hover': {
                backgroundColor: 'rgba(0, 51, 102, 0.1)',
              },
            }}
            onClick={() => navigateToPage('home')} // Navigate to home page
          >
            Home
          </Button>

          {/* Get Started Button */}
          <Button
            sx={{
              margin: '0 12px',
              textTransform: 'none',
              color: '#003366',
              '&:hover': {
                backgroundColor: 'rgba(0, 51, 102, 0.1)',
              },
            }}
            onClick={() => navigateToPage('main')} // Navigate to main page
          >
            Get Started
          </Button>

          {/* Features Button with Dropdown */}
          <Button
            sx={{
              margin: '0 12px',
              textTransform: 'none',
              color: '#003366',
              '&:hover': {
                backgroundColor: 'rgba(0, 51, 102, 0.1)',
              },
            }}
            onClick={handleFeaturesMenuOpen}
          >
            Features
          </Button>
          <Menu
            anchorEl={featuresMenuAnchorEl}
            open={Boolean(featuresMenuAnchorEl)}
            onClose={handleFeaturesMenuClose}
            sx={{ mt: '45px' }}
          >
            <MenuItem onClick={() => navigateToPage('model')}>Model</MenuItem>
            <MenuItem onClick={() => navigateToPage('main')}>Main</MenuItem>
          </Menu>

          {/* Profile Menu */}
          <IconButton onClick={handleProfileMenuOpen}>
            <Avatar alt="Profile" src="/path/to/profile.jpg" />
          </IconButton>
          <Menu
            anchorEl={profileMenuAnchorEl}
            open={Boolean(profileMenuAnchorEl)}
            onClose={handleProfileMenuClose}
            sx={{ mt: '45px' }}
          >
            <MenuItem onClick={() => navigateToPage('login')}>Login</MenuItem>
            <MenuItem onClick={() => navigateToPage('settings')}>Settings</MenuItem>
          </Menu>
        </Box>

        {/* Mobile Navigation Menu */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon sx={{ color: '#003366' }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {['Home', 'Get Started'].map((text) => (
              <MenuItem key={text} onClick={() => navigateToPage(text.toLowerCase().replace(/\s+/g, '-'))}>
                {text}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
