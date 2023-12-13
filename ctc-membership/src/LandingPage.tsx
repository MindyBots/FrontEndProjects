import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Toolbar} from '@mui/material';
import { Link, Navigate } from "react-router-dom";
import { useAuth } from './AuthProvider';


const LandingPage: React.FC = () => {

  const { user } = useAuth();

  // Redirect to sign-in page if not authenticated
  if (!user) {
      return <Navigate to="/" />;
  }

  return (
    <Container>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12} sx={{my:2}}>
            <Card>
                <CardContent>
                <Typography variant="h4" gutterBottom>
                    Membership Page
                </Typography>
                <br></br>
                <Typography variant="h6">
                    Explore exclusive benefits by becoming a member!
                </Typography>
                <br></br><br></br>
                <Link to={'/'}>
                    <Button variant="contained" color="secondary" size='large'>
                        Learn More
                    </Button>
                </Link>
                </CardContent>
            </Card>
            </Grid>
            <Grid item xs={12} sx={{my:3}}>
            <Card>
                <CardContent>
                <Typography variant="h4" gutterBottom>
                    Registration Form
                </Typography>
                <br></br>
                <Typography variant="h6">
                    Fill out the form to register for our services.
                </Typography>
                <br></br><br></br>
                <Link to={'/registrationform'}>
                    <Button variant="contained" color="primary" size='large'>
                        Register Now
                    </Button>
                </Link>
                </CardContent>
            </Card>
            </Grid>
        </Grid>
        <Toolbar />
    </Container>
  );
};

export default LandingPage;
