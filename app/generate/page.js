"use client";

import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/system";
import { db } from '../firebase';
import { collection, doc, getDoc, setDoc, updateDoc, writeBatch } from 'firebase/firestore';

const FlippableCard = styled(Card)(({ theme }) => ({
  perspective: "1000px",
  height: "100%",
  width: "100%", // Make sure the card takes up full width
}));

const InnerCard = styled(Box)(({ theme, flipped }) => ({
    position: "absolute", // Change to absolute
    width: "100%",
    height: "100%",
    transition: "transform 0.6s",
    transformStyle: "preserve-3d",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
  }));

const CardFace = styled(CardContent)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
}));

const CardFront = styled(CardFace)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const CardBack = styled(CardFace)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: "black",
  transform: "rotateY(180deg)",
}));

export default function Generate() {
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("CANT GIVE YOU FLASHCARDS WITHOUT A TOPIC BRO!");
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ text }), // Make sure to stringify the body
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        alert("UNLUCKY, NO FLASHCARDS FOR YOU BRO!");
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();

      // Ensure data.flashcards is an array
      const flashcards = Array.isArray(data.flashcards) ? data.flashcards : [];
      setFlashcards(flashcards.map((fc) => ({ ...fc, flipped: false })));
    } catch (error) {
      console.error("Error generating flashcards", error);
      alert("An error occurred while generating flashcards please try again");
    }
  };

  const handleCardClick = (index) => {
    setFlashcards((prevFlashcards) =>
      prevFlashcards.map((flashcard, i) =>
        i === index ? { ...flashcard, flipped: !flashcard.flipped } : flashcard
      )
    );
  };

  const saveFlashcards = async () => {
    if (!setName.trim()) {
      alert('Please enter a name for your flashcard set.');
      return;
    }

    try {
      const userDocRef = doc(collection(db, 'users'), 'user-id'); // Replace 'user-id' with actual user ID
      const userDocSnap = await getDoc(userDocRef);

      const batch = writeBatch(db);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedSets = [...(userData.flashcardSets || []), { name: setName }];
        batch.update(userDocRef, { flashcardSets: updatedSets });
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: setName }] });
      }

      const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName);
      batch.set(setDocRef, { flashcards });

      await batch.commit();

      alert('Flashcards saved successfully!');
      handleCloseDialog();
      setSetName('');
    } catch (error) {
      console.error('Error saving flashcards:', error);
      alert('An error occurred while saving flashcards. Please try again.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ minHeight: '80vh' }}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Generate Flashcards
        </Typography>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{
            "& .MuiInputBase-input": {
              color: "black",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiInputLabel-root": {
              color: "gray",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white",
            },
            mb: 2,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          sx={{ mb: 2, backgroundColor: "#241571" }}
        >
          Generate Flashcards
        </Button>

        {flashcards.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Generated Flashcards
            </Typography>
            <Grid container spacing={2} sx={{ height: "calc(70vh - 350px)", overflowY: 'auto' }}>
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index} sx={{ height: "100%" }}>
                  <FlippableCard onClick={() => handleCardClick(index)}>
                    <InnerCard flipped={flashcard.flipped}>
                      <CardFront>
                        <Typography>{flashcard.front}</Typography>
                      </CardFront>
                      <CardBack>
                        <Typography>{flashcard.back}</Typography>
                      </CardBack>
                    </InnerCard>
                  </FlippableCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
}
