"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Typography, Box, Grid, Card, CardContent, CircularProgress } from "@mui/material";
import { db, auth } from '../../firebase';
import { doc, getDoc, collection } from 'firebase/firestore';
import { styled } from "@mui/system";

const FlippableCard = styled(Card)(({ theme }) => ({
  perspective: "1000px",
  height: "100%",
  width: "100%",
}));

const InnerCard = styled(Box)(({ theme, flipped }) => ({
  position: "absolute",
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

export default function FlashcardSetPage({ params }) {
  const { setName: rawSetName } = params;
  const setName = decodeURIComponent(rawSetName); // Decode the setName
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          setError("No user is logged in.");
          return;
        }

        console.log("Fetching flashcards for set:", setName);

        const userDocRef = doc(db, 'users', user.uid);
        const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName);
        const setDocSnap = await getDoc(setDocRef);

        if (setDocSnap.exists()) {
          const data = setDocSnap.data();
          console.log("Flashcards fetched:", data.flashcards);
          setFlashcards(data.flashcards || []);
        } else {
          console.error("Flashcard set not found:", setName);
          setError("Flashcard set not found.");
        }
      } catch (err) {
        console.error("Error fetching flashcards:", err);
        setError("An error occurred while fetching flashcards.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [setName]);

  const handleCardClick = (index) => {
    setFlashcards((prevFlashcards) =>
      prevFlashcards.map((flashcard, i) =>
        i === index ? { ...flashcard, flipped: !flashcard.flipped } : flashcard
      )
    );
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ minHeight: '80vh' }}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Flashcard Set: {setName}
        </Typography>
        {flashcards.length > 0 ? (
          <Grid container spacing={2} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{ height: 'auto' }}>
                <FlippableCard 
                  onClick={() => handleCardClick(index)} 
                  sx={{ height: '300px' }}
                >
                  <InnerCard flipped={flashcard.flipped}>
                    <CardFront>
                      <Typography variant="h6">{flashcard.front}</Typography>
                    </CardFront>
                    <CardBack>
                      <Typography variant="h6">{flashcard.back}</Typography>
                    </CardBack>
                  </InnerCard>
                </FlippableCard>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" color="textSecondary">
            No flashcards found in this set.
          </Typography>
        )}
      </Box>
    </Container>
  );
}
