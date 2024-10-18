import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-scroll';

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
    <AppBar position="fixed" sx={{ backgroundColor: '#1a1a1a', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo or brand name */}
        <Typography variant="h6" component="div" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
          Memopin
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {['Home', 'Features', 'Get Started'].map((text) => (
            <Button
              key={text}
              sx={{
                margin: '0 12px',
                textTransform: 'none',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon sx={{ color: '#ffffff' }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {['Home', 'Features', 'Get Started'].map((text) => (
              <MenuItem key={text} onClick={handleMenuClose}>
                <Link to={text.toLowerCase().replace(/\s+/g, '-')} smooth={true} duration={500}>{text}</Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
