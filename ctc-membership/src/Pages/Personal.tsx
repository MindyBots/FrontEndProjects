import React, { useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
} from '@mui/material';


export default function Personal() {

  //TITLE
    const [title, setTitle] = React.useState('');
    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setTitle(event.target.value);
      };

  //NAMES
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const firstNamePattern = /^[A-Za-z]+$/; 
    const handleFirstNameChange = (event: { target: { value: any; }; }) => {
    const inputValue = event.target.value;
    if (firstNamePattern.test(inputValue)) {
        setFirstName(inputValue);
    }
    };
    const handleLastNameChange = (event: { target: { value: any; }; }) => {
    const inputValue = event.target.value;
    if (firstNamePattern.test(inputValue) && inputValue !== firstName) {
        setLastName(inputValue);
    }
    };

  //FAMILYNAME
    const [name, setName] = useState('');
    const namePattern = /^[A-Za-z]+$/; 
    const handleNameChange = (event: { target: { value: any; }; }) => {
      const inputValue = event.target.value;
      if (namePattern.test(inputValue)) {
        setName(inputValue);
      }
    };

  //IMAGEFILE
    const [, setSelectedFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [error1, setError1] = useState('');
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]; // Use optional chaining to handle possible null
      if (file) {
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (allowedTypes.includes(file.type)) {
          setSelectedFile(file);
          setError1('');
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewImage(reader.result as string); // Assert that reader.result is a string
          };
          reader.readAsDataURL(file);
        } else {
          setSelectedFile(null);
          setPreviewImage(null);
          setError1('Invalid file type. Please select a JPEG or PNG file.');
        }
      }
    };

  //GENDER
    const [gender, setGender] = React.useState('');
    const handleChange1 = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setGender(event.target.value);
    };
    const [, setAnchorEl] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const handleMenuItemClick = (option : any) => {
      setSelectedOption(option);
      setAnchorEl(null);
    };
    const [gender1, setGender1] = useState('');
    const namePattern1 = /^[A-Za-z]+$/; 
    const handleChange3 = (event: { target: { value: any; }; }) => {
      const inputValue = event.target.value;
      if (namePattern1.test(inputValue)) {
        setGender1(inputValue);
      }
    };

  //MARITALSTATUS
    const [status, setStatus] = React.useState('');
    const handleChange2 = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setStatus(event.target.value);
    };

  //DATEOFBIRTH
    const [selectedDate, setSelectedDate] = useState('');
    const handleDateChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedDate(event.target.value);
    };

    return(
      <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              margin='normal'
              label="Family Name or Household Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={handleNameChange}
              inputProps={{
                pattern: namePattern.source,
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth margin='normal'>
              <TextField
                type="file"
                onChange={handleFileChange}
                inputProps={{ accept: '.jpg, .jpeg, .png' }}
                error={Boolean(error1)}
                helperText={error1}
              />
              {previewImage && <img src={previewImage} alt="Family" style={{ marginTop: '10px', maxWidth: '100%' }} />}
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth margin='normal'>
              <InputLabel id="demo-simple-select-label">Title</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={title}
                label="Title"
                onChange={handleChange}
              >
                <MenuItem value={1}>Mr</MenuItem>
                <MenuItem value={2}>Mrs</MenuItem>
                <MenuItem value={3}>Master</MenuItem>
                <MenuItem value={4}>Miss</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              margin='normal'
              label="First Name"
              variant="outlined"
              fullWidth
              value={firstName}
              onChange={handleFirstNameChange}
              inputProps={{
                pattern: firstNamePattern.source,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              margin='normal'
              label="Last Name"
              variant="outlined"
              fullWidth
              value={lastName}
              onChange={handleLastNameChange}
              inputProps={{
                pattern: firstNamePattern.source,
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin='normal'>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="Gender"
                onChange={handleChange1}
              >
                <MenuItem onClick={() => handleMenuItemClick('anotherOption')} value={10}>Male</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('anotherOption1')} value={20}>Female</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('text')} value={30}>Others</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            {selectedOption === 'text' && (
              <TextField
                label="Enter your Gender"
                variant="outlined"
                fullWidth
                margin='normal'
                value={gender1}
                onChange={handleChange3}
              />
            )}
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              margin='normal'
              label="Date of Birth"
              type="date"
              variant="outlined"
              fullWidth
              value={selectedDate}
              onChange={handleDateChange}
              InputLabelProps={{
                  shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin='normal'>
              <InputLabel id="demo-simple-select-label">Marital Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Marital Status"
                onChange={handleChange2}
              >
                <MenuItem value={11}>Single</MenuItem>
                <MenuItem value={22}>Married</MenuItem>
                <MenuItem value={33}>Unmarried</MenuItem>
                <MenuItem value={44}>Prefer not to mention</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </>
    );
}