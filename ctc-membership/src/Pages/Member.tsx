import React, { useState } from 'react';
import { Box, TextField, Button, Select, MenuItem, IconButton, Typography, FormControl, InputLabel, Grid, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Person } from '@mui/icons-material';


interface Person {
  id: number;
  firstName: string;
  lastName: string;
  relationship: string;
  value: string;
  selectedOption: string;
  textInput: string;
  option: string;
  dob: string;
  gradeLevel: string;
}

const ShrinkingButton = styled(Button)({
  transition: 'all 0s ease-in-out',
  '&.shrinked': {
    width: '140px', 
    fontSize: '10px',
    marginRight: '13px'
  },
});

export default function Member(){
  const [people, setPeople] = useState<Person[]>([]);
  const [uniqueKey, setUniqueKey] = useState(0);
  const isNameValid = (name: string) => /^[A-Za-z]+$/.test(name);
  const isNameValid1 = (name1: string) => /^[A-Za-z]+$/.test(name1);
  const isNumberValid = (number: string) => /^[1-12]+$/.test(number);

  const [shrinked, setShrinked] = useState(false);

  const handleButtonClick = () => {
    setShrinked(true);
  };


 //BOXES
  const handleAddButtonClick = () => {
    const newPerson: Person = {
      id: Date.now(),
      firstName: '',
      lastName: '',
      relationship: '',
      value: '',
      selectedOption: '',
      textInput: '',
      option: '',
      dob: '',
      gradeLevel: ''
    };
    setPeople((prevPeople) => [...prevPeople, newPerson]);
    setUniqueKey((prevId) => prevId + 1);
  };
  const handleRemoveBox = (id: number) => {
    setPeople((prevPeople) => {
      const updatedPeople = prevPeople.filter((person) => person.id !== id);
      if (updatedPeople.length === 0) {
        setShrinked(false); // Set shrinked to false if no box components are left
      }
      return updatedPeople;
    });
  };

 //NAMES
  const handleTextFieldChange = (id: string, field: 'firstName' | 'lastName') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.trim();
    if (field === 'lastName') {
      const personWithSameFirstName = people.find((person) => person.id === Number(id));
      if (personWithSameFirstName && personWithSameFirstName.firstName === newValue) {
        // Last Name cannot be the same as First Name
        return;
      }
    }
    if (isNameValid(newValue)) {
      setPeople((prevPeople) =>
        prevPeople.map((person) =>
          person.id === Number(id) ? { ...person, [field]: newValue } : person
        )
      );
    }
  };

 //RELATIONSHIP
  const handleInputChange = (id: number, field: keyof Person, value: string) => {
    setPeople((prevPeople) =>
      prevPeople.map((person) =>
        person.id === id ? { ...person, [field]: value } : person
      )
    );
  };

 //SELECTED OPTION
  const handleTextInputChange = (id: string, field: 'textInput') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (isNameValid1(inputValue)) {
      setPeople((prevPeople) =>
        prevPeople.map((person) =>
          person.id === Number(id) ? { ...person, [field]: inputValue } : person
        )
      );
    }
  };

 //DATE OF BIRTH
  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    // Check if the birthday has occurred this year
    if (currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
      return age - 1;
    }

    return age;
  };
  const handleInputChange1 = (id: number, field: keyof Person, value: string) => {
    setPeople((prevPeople) =>
      prevPeople.map((person) =>
        person.id === id ? { ...person, [field]: value } : person
      )
    );
  };

 //GRADE LEVEL
  const handleInputChange2 = (id: string, field: 'gradeLevel') => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const number = event.target.value;
    const numericValue = parseInt(number, 10);
    if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 12) {
      if (isNumberValid(number)) {
        setPeople((prevPeople) =>
          prevPeople.map((person) =>
            person.id === Number(id) ? { ...person, [field]: number } : person
          )
        );
      }
    }
  };

  const handleMultipleClicks = () =>{
      handleAddButtonClick();
      handleButtonClick();
  };


  return (
    <>
      {people.map((person) => (
        <Box key={person.id} sx={{ position: 'relative', marginBottom: 6 }}>
          <IconButton
            sx={{ position: 'absolute', top: 0, right: 0 }}
            onClick={() => handleRemoveBox(person.id)}
          >
            <CloseIcon />
          </IconButton>
            <Typography variant="h6" sx={{display:'inline-block'}}>Member</Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  label="First Name"
                  value={person.firstName}
                  onChange={handleTextFieldChange(String(person.id), 'firstName')}
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  label="Last Name"
                  value={person.lastName}
                  onChange={handleTextFieldChange(String(person.id), 'lastName')}
                  fullWidth
                  margin='normal'
                />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin='normal'>
                  <InputLabel id="select-label">Relationship</InputLabel>
                  <Select
                    label="Select Option"
                    value={person.selectedOption}
                    onChange={(e) => handleInputChange(person.id, 'selectedOption', e.target.value)}
                    fullWidth
                  >
                    <MenuItem value={'option-1'}>Husband</MenuItem>
                    <MenuItem value={'option-2'}>Wife</MenuItem>
                    <MenuItem value={'option-3'}>Son</MenuItem>
                    <MenuItem value={'option-4'}>Daughter</MenuItem>
                    <MenuItem value={'option-5'}>Father</MenuItem>
                    <MenuItem value={'option-6'}>Mother</MenuItem>
                    <MenuItem value={'option-7'}>Brother</MenuItem>
                    <MenuItem value={'option-8'}>Sister</MenuItem>
                    <MenuItem value={'option-9'}>Others</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                {person.selectedOption === 'option-9' && (
                  <TextField
                    label="Enter Your relationship"
                    value={person.textInput}
                    onChange={handleTextInputChange(String(person.id), 'textInput')}
                    fullWidth
                    margin='normal'
                    key={`textfield-${uniqueKey}`}
                  />
                )}
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Date of Birth"
                  type="date"
                  value={person.dob}
                  onChange={(e) => handleInputChange1(person.id, 'dob', e.target.value)}
                  fullWidth
                  margin='normal'
                  InputLabelProps={{
                    shrink: true,
                }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                {calculateAge(person.dob) < 18 && (
                  <TextField
                    label="Grade Level"
                    value={person.gradeLevel}
                    onChange={handleInputChange2(String(person.id), 'gradeLevel')}
                    fullWidth
                    margin='normal'
                  />
                )}
              </Grid>
            </Grid>
        </Box>
      ))}
      <Grid container spacing={1}>
        {shrinked && (
          <Grid item xs={5.3} sx={{display:'inline-block'}}>
          </Grid>
        )}
        <Grid item xs={shrinked ? 6 : 12} sx={{display:'inline-block'}}>
          <ShrinkingButton
            variant="contained"
            color="primary"
            sx={{flexWrap : 'wrap'}}
            onClick={handleMultipleClicks}
            className={shrinked ? 'shrinked' : ''}
            fullWidth
          >
            Add Family Member
          </ShrinkingButton>
        </Grid>
      </Grid>
    </>
  );
};
