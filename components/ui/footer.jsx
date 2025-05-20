"use client";
import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';
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
        textAlign: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" sx={{ mb: 1 }}>
          &copy; DG MS SO JF 2024. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Link href="/" style={{ color: theme.palette.text.secondary, textDecoration: 'none', margin: '0 8px' }}>
            Home
          </Link>
          <Divider orientation="vertical" flexItem sx={{ borderColor: theme.palette.text.secondary }} />
          <Link href="/pricing" style={{ color: theme.palette.text.secondary, textDecoration: 'none', margin: '0 8px' }}>
            Pricing
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
