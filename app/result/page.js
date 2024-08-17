'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { CircularProgress, Container, Typography, Box, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ReplayIcon from '@mui/icons-material/Replay';
import HomeIcon from '@mui/icons-material/Home';

const ResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) return;

      try {
        const res = await fetch(`/api/generate/checkout_sessions?session_id=${session_id}`);
        const sessionData = await res.json();

        if (res.ok) {
          setSession(sessionData);
        } else {
          setError(sessionData.error || 'An unexpected error occurred during the checkout process.');
        }
      } catch (err) {
        setError('An error occurred while fetching the session. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutSession();
  }, [session_id]);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
        <ErrorIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h4" sx={{ mt: 2 }}>
          Something Went Wrong
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          An error occurred during checkout. Please try again!
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ReplayIcon />}
            onClick={() => router.push('/pricing')}
          >
            Retry Payment
          </Button>
          <Button
            variant="outlined"
            sx={{ ml: 2 }}
            startIcon={<HomeIcon />}
            onClick={() => router.push('/')}
          >
            Go to Homepage
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
      {session?.payment_status === 'paid' ? (
        <>
          <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h4">Thank you for your purchase.</Typography>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Session ID: {session_id}</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              We have received your payment. You will receive an email with the order details shortly.
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <ErrorIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h4">Payment Failed</Typography>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Session ID: {session_id}</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Your payment was not successful. Please try again.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 4 }}
              startIcon={<ReplayIcon />}
              onClick={() => router.push('/pricing')}
            >
              Retry Payment
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default ResultPage;
