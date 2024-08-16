import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div">
            <Link href="/" passHref>
              <Typography
                component="a"
                sx={{ color: 'inherit', textDecoration: 'none' }}
              >
                AI Flashcards
              </Typography>
            </Link>
          </Typography>
          <Button color="inherit" component={Link} href="/login" sx={{ color: 'inherit', textDecoration: 'none' }}>
            Log In
          </Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
