import * as React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import PasswordStrengthBar from "react-password-strength-bar";

interface Props {
  id: string;
  label: string;
  passwordValue: (pass:string) => void;
}

export default function PasswordField(props: Props) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [password, setPassword] = React.useState("");
  

  function onChangeHandler(
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const pass = event.currentTarget.value;
    //console.log(pass);
    setPassword(pass);
    props.passwordValue(pass);
  }

  return (
    <Box>
      <FormControl
        variant="outlined"
        required
        fullWidth
        id={props.id}
      >
        <InputLabel htmlFor="outlined-adornment-password">
          {props.label}
        </InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          fullWidth
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label={props.label}
          onChange={onChangeHandler}
        />
        <PasswordStrengthBar password={password} />
      </FormControl>
    </Box>
  );
}
