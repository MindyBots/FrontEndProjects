import { Link, Typography } from "@mui/material";

export default function CopyRightCTC(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://chicagotamilcatholics.org/" target="_blank" rel="noopener noreferrer">
        https://chicagotamilcatholics.org
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
