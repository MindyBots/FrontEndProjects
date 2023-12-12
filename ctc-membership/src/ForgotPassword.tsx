import React, { useState } from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';


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
const auth = getAuth(app);


const ForgotPassword: React.FC = () => {

  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);

  const handleResetPassword = async () => {
    try {
      // Attempt to send a password reset email
      await sendPasswordResetEmail(auth,email);
      setMessage('Password reset email sent successfully. Check your inbox.');
    } catch (error) {
      setMessage('Error sending password reset email. Please check the email address.');
    }
  };

  return (
   <>
    <Paper elevation={4}>
    <div style={{ maxWidth: '600px', margin: 'auto', marginTop: '100px', padding: '25px', textAlign: 'center', maxHeight: "100vh" }}>
      <Typography variant="h5" style={{ marginBottom: '50px', marginTop: '20px' }}>
        Forgot Password
      </Typography>
      <TextField
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: '40px' }}
      />
      <Button variant="contained" color="primary" onClick={handleResetPassword}>
        Reset Password
      </Button>
      <br /><br />
      {message && (
        <Typography style={{ marginTop: '20px', color: message.includes('Error') ? 'red' : 'green' }}>
          {message}
        </Typography>
      )}
    </div>
    </Paper>
    <div style={{height:'400px'}}></div>
  </>
  );
};

export default ForgotPassword;
