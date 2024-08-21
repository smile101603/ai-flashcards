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
      router.push('/generate'); // Redirect to the flashcards page
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
            sx={{
              '& .MuiInputBase-input': {
                color: 'black', // Text color
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'gray', // Default border color
                },
                '&:hover fieldset': {
                  borderColor: 'white', // Border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', // Border color when focused
                },
              },
              '& .MuiInputLabel-root': {
                color: 'gray', // Label color when not focused
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'white', // Label color when focused
              },
            }}
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
            sx={{
              '& .MuiInputBase-input': {
                color: 'black', // Text color
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'gray', // Default border color
                },
                '&:hover fieldset': {
                  borderColor: 'white', // Border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', // Border color when focused
                },
              },
              '& .MuiInputLabel-root': {
                color: 'gray', // Label color when not focused
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'white', // Label color when focused
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "#241571" }}
          >
            Log In
          </Button>
        </form>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button href="/signup" variant="text" sx={{ color: "black" }}>
              Don't have an account? Sign up
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
