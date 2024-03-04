import React, { useState } from 'react';
import {
  TextField,
  Typography,
  FormControl,
  Grid,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { MuiTelInput } from 'mui-tel-input'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { countries } from 'countries-list';


export default function Contact(){

  //EMAIL
    const [email, setEmail] = useState('');
    const [error2, setError2] = useState('');
    const handleEmailChange = (event: { target: { value: any; }; }) => {
      const newEmail = event.target.value;
      setEmail(newEmail);
      // Regular expression for validating email format
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (newEmail === '' || emailPattern.test(newEmail)) {
        setError2('');
      } else {
        setError2('Invalid email format');
      }
    };
    const handleKeyPress = (event: { key: string; preventDefault: () => void; }) => {
      if (event.key === 'Enter' && error2) {
        event.preventDefault();
      }
    };

  //PHONENUMBER
    const [value, setValue] = React.useState('')
    const handleChange = (newValue: React.SetStateAction<string>) => {
      setValue(newValue)
    }

  //NATIVEPLACE
    const [name, setName] = useState('');
    const namePattern = /^[A-Za-z]+$/; // Regular expression pattern for names (only alphabets allowed)
    const handleNameChange = (event: { target: { value: any; }; }) => {
      const inputValue = event.target.value;
      if (namePattern.test(inputValue)) {
        setName(inputValue);
      }
    };

  //CITY
    const [city, setCity] = useState('');
    const cityPattern = /^[A-Za-z]+$/;
    const handleCityChange = (event: { target: { value: any; }; }) => {
      const inputValue = event.target.value;
      if (cityPattern.test(inputValue)) {
        setCity(inputValue);
      }
    };

  //STATE
    const [state, setState] = useState('');
    const statePattern = /^[A-Za-z]+$/;
    const handleStateChange = (event: { target: { value: any; }; }) => {
      const inputValue = event.target.value;
      if (statePattern.test(inputValue)) {
        setState(inputValue as string);
      }
    };

  //ZIP
    const [zip, setZip] = useState('');
    const zipPattern = /^[0-9]+$/;
    const handleZipChange = (event: { target: { value: any; }; }) => {
      const inputValue = event.target.value;
      if (zipPattern.test(inputValue)) {
        setZip(inputValue);
      }
    };

  //COUNTRY
    const [, setCountry] = useState('');
    const countryPattern = /^[A-Za-z]+$/;
    const handleCountryChange = (event: { target: { value: any; }; }) => {
      const inputValue = event.target.value;
      if (countryPattern.test(inputValue)) {
        setCountry(inputValue as string);
      }
    };
    const defaultCountry = 'US';

    
    return(
    <>
      <Typography variant='h6'>Contact Details</Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            margin='normal'
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            onKeyDown={handleKeyPress}
            error={Boolean(error2)}
            helperText={error2}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth margin='normal'>
            <MuiTelInput label="Phone Number" fullWidth value={value} onChange={handleChange} defaultCountry='US'/>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <TextField
            margin='normal'
            label="Address Line 1"
            variant="outlined"
            fullWidth
            type="address"
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            margin='normal'
            label="Address Line 2"
            variant="outlined"
            fullWidth
            type="address"
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            margin='normal'
            label='City'
            value={city}
            onChange={handleCityChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            margin='normal'
            label='State'
            value={state}
            onChange={handleStateChange}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <TextField
            margin='normal'
            label="Zip"
            variant="outlined"
            fullWidth
            type="Zip"
            onChange={handleZipChange}
            value={zip}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth margin='normal'>
            <InputLabel id="country-dropdown-label">Select Country</InputLabel>
            <Select
              label="Select Country"
              labelId="country-dropdown-label"
              id="country-dropdown"
              onChange={handleCountryChange}
              defaultValue={defaultCountry}
            >
              {Object.entries(countries).map(([code, country]) => (
                <MenuItem key={code} value={code}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <TextField
            margin='normal'
            label="Native Place"
            variant="outlined"
            fullWidth
            value={name}
            onChange={handleNameChange}
            inputProps={{
              pattern: namePattern.source, // Set the regular expression pattern
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth margin='normal'>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Membership Since"
                slotProps={{ textField: { size: 'medium' } }}
                views={['year']}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>
      </Grid>
      <br></br>
    </>
    );
}
