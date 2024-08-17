"use client"; // Ensure this is at the top to make the component a Client Component

import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../app/firebase'; // Adjust the path to firebase.js as needed

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear the user state after logout
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

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
          <div>
            <Button
              color="inherit"
              component={Link}
              href="/pricing"
              sx={{ color: 'inherit', textDecoration: 'none', mx: 4 }}
            >
              Pricing
            </Button>
            {!user ? (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  href="/signup"
                  sx={{ color: 'inherit', textDecoration: 'none', mx: 4 }}
                >
                  Sign Up
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  href="/login"
                  sx={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Log In
                </Button>
              </>
            ) : (
              <>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ mx: 4 }}
                >
                  Welcome, {user.email}
                </Typography>
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  sx={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Log Out
                </Button>
              </>
            )}
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
