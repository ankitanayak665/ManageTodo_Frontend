import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { TextField } from '@mui/material';
import LoginPage from './LoginPage';
import { useNavigate } from 'react-router-dom';
function HeaderSection() {
    const navigate = useNavigate();
    const handleLogin =()=>{
        navigate('/login');
    }
    const handleSignUp =()=>{
        navigate('/signUp');
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <IconButton ><EventNoteIcon /></IconButton>
              <div>
              <Button color="inherit" sx={{ textTransform: "none",color:"blue" }} variant="contained" size="small" onClick={handleLogin}>Login</Button>
    
              <Button color="inherit" sx={{ textTransform: "none" }} onClick={handleSignUp}>Signup</Button>
              </div>
            </Toolbar>
          </AppBar>
        </Box>
  )
}

export default HeaderSection
