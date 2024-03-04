import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CopyRightCTC from "../components/CopyRightCTC";
import { Link, useNavigate } from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { FormControl } from "@mui/material";

const firebaseConfig = {
  apiKey: "AIzaSyB4nDQAhRmAbX9qW1-MsaZJtw8JlyTa7Qw",
  authDomain: "chicagotamilcatholics-6f433.firebaseapp.com",
  projectId: "chicagotamilcatholics-6f433",
  storageBucket: "chicagotamilcatholics-6f433.appspot.com",
  messagingSenderId: "160168855788",
  appId: "1:160168855788:web:75136e333a89160fd47dc9",
  measurementId: "G-F0BZLVYY89"
};

const app = initializeApp(firebaseConfig);
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignInSide() {

  const [error, setError] = React.useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); // Clear previous error messages

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email')?.toString().trim() || '';
    const password = formData.get('password')?.toString() || '';

    try {
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setIsFormValid(true);
      console.log('Signed in:', user);
      navigate('/landingpage')
    } catch (error) {
      setIsFormValid(false);
      console.error('Sign-in error:', error);
      handleSignInError(error as AuthError);
    }
  };

  const handleSignInError = (_error: AuthError) => {
    setError('Incorrect email or password. Please try again.');
  };
  
  useEffect(() => {
    setIsFormValid(email.trim() !== '' && password !== '');
  }, [email, password]);


  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ width: {md:'850px'} }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <FormControl margin="normal" fullWidth>
                  <Typography variant="body2" color="error" align="center">
                    {error}
                  </Typography>
                </FormControl>
              )}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                sx={{my:2}}
              />
              <Link to="/forgot-password"><Typography variant="body2">Forgot Password?</Typography></Link>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 5, mb: 2 }}
                disabled={!isFormValid}
              >
                Sign In
              </Button>
              <Grid container sx={{my:2}}>
                <Grid item xs>
                  <Link to={`signup`}>{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
              <CopyRightCTC />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
