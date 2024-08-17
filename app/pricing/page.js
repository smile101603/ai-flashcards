'use client';
import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';

const PricingPage = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleSubscribe = async (plan) => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate/checkout_sessions', {
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
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Choose Your Plan
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card raised>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Free Plan
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                $0/month
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Basic access to flashcards.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Create up to 50 flashcards.
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 4 }}
                onClick={() => handleSubscribe('free')}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card raised sx={{ borderColor: 'primary.main', borderWidth: 2, borderStyle: 'solid' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Pro Plan
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                $10/month
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Unlimited flashcards and premium support.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Advanced study tools and analytics.
              </Typography>
              <Box sx={{ mt: 4 }}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleSubscribe('pro')}
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
