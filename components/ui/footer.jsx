"use client";
import React from 'react';
import { Container, Typography, Box, Link as MuiLink } from '@mui/material';
import Link from 'next/link'; // Import Next.js Link component
import { useTheme } from '@mui/material/styles'; // Import useTheme hook

const Footer = () => {
  const theme = useTheme();

  // Determine background color based on the current theme
  const backgroundColor = theme.palette.mode === 'light'
    ? theme.palette.grey[200]
    : theme.palette.grey[800];

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: backgroundColor,
        textAlign: 'center', // Center align the text
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" sx={{ mb: 1 }}>
          &copy; DG MS SO JF 2024. All rights reserved.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Link href="/" passHref>
            <MuiLink color="inherit">Home</MuiLink>
          </Link>{' '}
          |{' '}
          <Link href="/about" passHref>
            <MuiLink color="inherit">About</MuiLink>
          </Link>{' '}
          |{' '}
          <Link href="/contact" passHref>
            <MuiLink color="inherit">Contact</MuiLink>
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
