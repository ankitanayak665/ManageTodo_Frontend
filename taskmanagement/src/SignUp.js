import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
function SignUp() {
  const [open, setOpen] = useState(false);
  const [validation,setValidation] = useState("")
  const [credentials,setCredentials]= useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:""
  })
    const navigate = useNavigate();

   const handleSignUp =async()=>{
    // const hasMissingValues = (obj) => {
    //   return Object.values(obj).some(value => value === undefined || value === null || value === '');
    // };
    const isAnyFieldEmpty = Object.values(credentials).some(value => value === "");
    
    if(!isAnyFieldEmpty){
    try {
      const response = await axios.post(`https://taskmanagementbackend-3.onrender.com/auth/signUp`,credentials);
      
      if(response.status === 201){
        navigate('/login');
      }else{
        
      }
    } catch (error) {
      setValidation(error?.response?.data?.error?.details[0]?.message)
      setOpen(true);
    }
  }else{
    setOpen(true);
  }
   }
   const handleLogin =()=>{
    navigate('/login');
   }
   const handleInput =(e)=>{

    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value
    }));
   }
   const handleClose = (event, reason) => {
    setValidation("")
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
   const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
   
  return (
    <Box sx={{ flexGrow: 1 }}>
          {/* <AppBar position="static">
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <IconButton ><EventNoteIcon /></IconButton>
              <div>
              <Button color="inherit" sx={{ textTransform: "none",color:"blue" }} variant="contained" size="small">Login</Button>
    
              <Button color="inherit" sx={{ textTransform: "none" }}>Signup</Button>
              </div>
            </Toolbar>
          </AppBar> */}
          <Box sx={{display:"flex",justifyContent:"center",flexDirection:"column" ,alignItems: "center",}}>
          <Typography sx={{ display:"flex",justifyContent:"center",mt:"5vh", fontWeight:"10px"}}>Signup</Typography>
          <Box sx={{p:"10px",display:"flex",justifyContent:"center",flexDirection:"column" ,border: "1px solid",borderColor:"blue", width:"40%",alignItems: "center"}}>
          <TextField
           sx={{
        mt: "10px",
        width: "100%",
        "& .MuiOutlinedInput-root": {
          height: "40px", // Set the same height for consistency
        }
      }} id="outlined-basic" name="firstName" label="First Name" variant="outlined" onChange={(e)=>{handleInput(e)}} />
          <TextField sx={{
        mt: "10px",
        width: "100%",
        "& .MuiOutlinedInput-root": {
          height: "40px", // Set the same height for consistency
        },
      }} id="outlined-basic" name="lastName" label="Last Name" variant="outlined" onChange={(e)=>{handleInput(e)}}/>
      <TextField sx={{
        mt: "10px",
        width: "100%",
        "& .MuiOutlinedInput-root": {
          height: "40px", // Set the same height for consistency
        },
      }} id="outlined-basic" name="email" label="Email" variant="outlined" onChange={(e)=>{handleInput(e)}}/>
      <TextField sx={{
        mt: "10px",
        width: "100%",
        "& .MuiOutlinedInput-root": {
          height: "40px", // Set the same height for consistency
        },
      }} id="outlined-basic" name="password" label="Password" variant="outlined" onChange={(e)=>{handleInput(e)}}/>
      <TextField sx={{
        mt: "10px",
        width: "100%",
        "& .MuiOutlinedInput-root": {
          height: "40px", // Set the same height for consistency
        },
      }} id="outlined-basic" name="confirmPassword" label="Confirm Password" variant="outlined" onChange={(e)=>{handleInput(e)}}/>
          <Button onClick={handleSignUp} variant="contained" sx={{mt:"10px",width:"100%"}}>Signup</Button>
          <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>Already have an account?</Typography>
          <Button sx={{textTransform: "none"}} onClick={handleLogin}>Login</Button>
        </Box>
          {/* <Button variant="contained" sx={{textTransform: "none"}}>Signup with Google</Button> */}
          </Box>
          </Box>
          <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={validation ? validation : "No datas found"}
        action={action}
      />
        </Box>
  )
}

export default SignUp
