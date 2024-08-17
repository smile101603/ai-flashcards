"use client";
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Grid } from '@mui/material';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'; // Ensure correct import path

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(`Account created successfully for ${userCredential.user.email}!`);
      setError(null);
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Sign Up
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success">{success}</Typography>}
        <form onSubmit={handleSignup}>
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
            Sign Up
          </Button>
        </form>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button href="/login" variant="text" sx={{ color: "black" }}>
              Already have an account? Log in
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Signup;
