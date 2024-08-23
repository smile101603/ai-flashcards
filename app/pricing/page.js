'use client';
import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Box, List, ListItem, ListItemIcon, ListItemText, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import CheckCircle from '@mui/icons-material/CheckCircle';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import SupportIcon from '@mui/icons-material/Support';

const PricingPage = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleSubscribe = async (plan) => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      });
      const session = await response.json();
      router.push(session.url);
    } catch (error) {
      console.error('Error during subscription process:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className='' maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Choose Your Plan
      </Typography>
      <Grid container spacing={4}>
        {/* Free Plan Card */}
        <Grid item xs={12} md={6}>
          <Card raised>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Free Plan
              </Typography>
              <FlashOnIcon sx={{ color: "#241571", fontSize: 60, mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                $0/month
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#241571" }} />
                  </ListItemIcon>
                  <ListItemText primary="Basic access to flashcards" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#241571" }} />
                  </ListItemIcon>
                  <ListItemText primary="Create up to 50 flashcards" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#241571" }} />
                  </ListItemIcon>
                  <ListItemText primary="Basic study tools" />
                </ListItem>
              </List>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 4, backgroundColor: "#241571", color: "white" }}
                onClick={() => handleSubscribe('free')}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Pro Plan Card */}
        <Grid item xs={12} md={6}>
          <Card raised sx={{ borderColor: '#c3c3c3', borderWidth: 2, borderStyle: 'solid' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Pro Plan
              </Typography>
              <SupportIcon sx={{ fontSize: 60, color: '#241571', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                $10/month
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#241571" }} />
                  </ListItemIcon>
                  <ListItemText primary="Unlimited flashcards" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#241571" }} />
                  </ListItemIcon>
                  <ListItemText primary="Premium support" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#241571" }} />
                  </ListItemIcon>
                  <ListItemText primary="Advanced study tools" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#241571" }} />
                  </ListItemIcon>
                  <ListItemText primary="Analytics and progress tracking" />
                </ListItem>
              </List>
              <Box sx={{ mt: 4 }}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleSubscribe('pro')}
                    sx={{ backgroundColor: "#241571", color: "white" }}
                  >
                    Subscribe Now
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PricingPage;
