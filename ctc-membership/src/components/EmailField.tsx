import { TextField } from '@mui/material';
import React from 'react';

interface EmailFieldProps {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export default function EmailField({ setEmail }: EmailFieldProps) {
  const [email, setEmailValue] = React.useState('');
  const [error, setError] = React.useState('');

  const validateEmail = (input: string) => {
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(input)) {
      return 'Invalid email address';
    }

    return '';
  };

  const handleEmailChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputEmail = event.currentTarget.value;
    const errorMessage = validateEmail(inputEmail);
    setError(errorMessage);
    setEmailValue(inputEmail);
    setEmail(inputEmail); // Set email in the parent component
  };

  const handleOnBlur = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();

    if (!error) {
      // Do something with the valid email address
      console.log('Valid email:', email);
    }
  };

  return (
    <TextField
      label="Email"
      variant="outlined"
      fullWidth
      required
      value={email}
      onChange={handleEmailChange}
      error={Boolean(error)}
      helperText={error}
      onBlur={handleOnBlur}
      margin="normal"
    />
  );
}
