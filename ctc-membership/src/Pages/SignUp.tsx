import React, { useState } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import {
  Paper,
  Checkbox,
  Box,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  FormControl,
  Typography,
  Container
} from "@mui/material";
import PasswordField from "../components/PasswordField";
import CopyRightCTC from "../components/CopyRightCTC";
import EmailField from "../components/EmailField";
import { createUserWithEmailAndPassword, getAuth, AuthError } from 'firebase/auth';
import { initializeApp } from 'firebase/app';


const firebaseConfig = {
  apiKey: "AIzaSyB4nDQAhRmAbX9qW1-MsaZJtw8JlyTa7Qw",
  authDomain: "chicagotamilcatholics-6f433.firebaseapp.com",
  projectId: "chicagotamilcatholics-6f433",
  storageBucket: "chicagotamilcatholics-6f433.appspot.com",
  messagingSenderId: "160168855788",
  appId: "1:160168855788:web:75136e333a89160fd47dc9",
  measurementId: "G-F0BZLVYY89"
};

const auth = getAuth(initializeApp(firebaseConfig));

if (!auth) {
  throw new Error('Firebase authentication not initialized!');
}


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {

  const [error, setError] = React.useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    //const { password, confirmPassword } = event.currentTarget.elements;
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed up:', user);
      navigate('/landingpage')
    } catch (error: any) {
      console.error('Error signing up:', error.code, error.message);
      handleSignInError(error as AuthError);
    }
  }    

  const handleSignInError = (error: AuthError) => {
    if (error.code === 'auth/email-already-in-use') {
      setError('Email is already in use');
    } else {
      setError('Incorrect Email or Password. Please try again.');
    }       
  };


  const paperStyle = { padding: "1vh" };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md" sx={{width: {md:'900px'}}}>
        <CssBaseline />
        <Paper elevation={2} style={paperStyle}>
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Avatar
              sx={{ m: 1, bgcolor: "secondary.main", width: "50" }}
              src="src\images\ctc_vertical.png"
              sizes="20"
            />

            <Typography variant="h5">Membership SignUp</Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              //noValidate
              sx={{ mt: 1, p: 2, width: {md:'800px'} }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="firstName"
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lastName"
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12}>
                  <EmailField setEmail={setEmail} />
                </Grid>
                <Grid item xs={12} sx={{my:2}}>
                  <PasswordField
                    id="password"
                    label="Password"
                    passwordValue={setPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <PasswordField
                    id="confirmpassword"
                    label="Confirm Password"
                    passwordValue={setConfirmPassword}             
                  />
                </Grid>
              </Grid>
              {error && (
                <FormControl margin="normal" fullWidth>
                  <Typography variant="body2" color="error" align="center">
                    {error}
                  </Typography>
                </FormControl>
              )}

              <Typography variant="h6" justifyContent="center">
                <Checkbox value="remember" color='primary' required sx={{display:'inline-block'}} size='medium'/>
                <Typography variant='body1' sx={{display:'inline-block'}}>I accept the <Link to='#'>Terms and Conditions</Link></Typography>
              </Typography>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign Up
                </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link to={`../`}>Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <CopyRightCTC sx={{ mt: 4, mb: 4 }} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
