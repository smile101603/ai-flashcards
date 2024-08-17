"use client";

import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Container, Divider } from "@mui/material";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../app/firebase"; // Adjust the path to firebase.js as needed

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <AppBar sx={{backgroundColor: "#241571"}} position="sticky">
      <Toolbar>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="div">
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
              AI Flashcards
            </Link>
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link href="/pricing" passHref>
              <Button
                color="inherit"
                sx={{ color: "inherit", textDecoration: "none" }}
              >
                Pricing
              </Button>
            </Link>
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            {!user ? (
              <>
                <Link href="/signup" passHref>
                  <Button
                    color="inherit"
                    sx={{ color: "inherit", textDecoration: "none" }}
                  >
                    Sign Up
                  </Button>
                </Link>
                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                <Link href="/login" passHref>
                  <Button
                    color="inherit"
                    sx={{ color: "inherit", textDecoration: "none" }}
                  >
                    Log In
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Typography variant="body1" component="span" sx={{ mx: 2 }}>
                  Welcome, {user.email}
                </Typography>
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  sx={{ color: "inherit", textDecoration: "none" }}
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
