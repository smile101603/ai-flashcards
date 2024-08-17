"use client";
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Grid } from '@mui/material';
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'; // Ensure correct import path

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter(); // Initialize useRouter

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setError(null);
      router.push('/'); // Redirect to the homepage after successful login
    } catch (error) {
      setError('Failed to login. Please check your credentials.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Log In
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </form>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button href="/signup" variant="text">
              Don't have an account? Sign up
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
