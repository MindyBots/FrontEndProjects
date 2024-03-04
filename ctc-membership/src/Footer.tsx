import React from 'react';
import { AppBar, Container, Toolbar, Typography, Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const outerTheme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
});

const Footer: React.FC = () => {
  return (
    <AppBar 
     position="absolute" 
     style={{ 
      top: 'auto', 
      bottom: 'auto', 
      backgroundColor:'#ffffff', 
      backgroundImage: 'url("https://test.chicagotamilcatholics.org/wp-content/uploads/2021/12/footer-bg-im-21.jpg")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat' 
    }}>
      <Toolbar>
      <Container maxWidth='md'>
        <Toolbar />
        <Typography variant='h5' fontWeight='bold'>Chicago Tamil Catholics</Typography>
        <br></br>
        <Typography>
          Chicago Tamil Catholics (CTC) brings the Tamil Catholics together living in and around the Chicago area as a community to share our faith and culture for mutual support and growth.
        </Typography>
        <br></br>
        <ThemeProvider theme={outerTheme}>
          <Button sx={{bgcolor:'#3b5999', mr:2}} variant='contained' href='https://www.facebook.com/chicagotamilcatholics' color='primary' target="_blank" rel="noopener noreferrer">
            <FacebookIcon sx={{color:'#ffffff'}} />
          </Button>
          <Button sx={{bgcolor:'#cd201f', mr:2}} variant='contained' href='https://www.youtube.com/@chicagotamilcatholics' color='primary' target="_blank" rel="noopener noreferrer">
            <YouTubeIcon sx={{color:'#ffffff'}} />
          </Button>
          <Button sx={{bgcolor:'#2bb140'}} variant='contained' href='https://chat.whatsapp.com/HLGO12Uhc4CLYO98UQWc7w' color='primary' target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon sx={{color:'#ffffff'}} />
          </Button>
        </ThemeProvider>
        <Toolbar />
      </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
