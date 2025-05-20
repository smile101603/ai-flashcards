"use client";

import { useEffect, useState } from "react";
import { Container, Typography, Box, Button, List, ListItem, ListItemText, Divider, CircularProgress } from "@mui/material";
import { db, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function FlashcardsPage() {
    const [flashcardSets, setFlashcardSets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchFlashcardSets = async () => {
            const user = auth.currentUser;

            if (!user) {
                setError('No user is logged in.');
                setLoading(false);
                return;
            }

            try {
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (!userDocSnap.exists()) {
                    setError('No flashcard sets found.');
                    setLoading(false);
                    return;
                }

                const userData = userDocSnap.data();
                const flashcardSets = userData.flashcardSets || [];
                setFlashcardSets(flashcardSets);
            } catch (error) {
                console.error('Error fetching flashcard sets:', error);
                setError('An error occurred while fetching flashcard sets.');
            } finally {
                setLoading(false);
            }
        };

        fetchFlashcardSets();
    }, []);

    const handleViewSet = (setName) => {
        router.push(`/flashcards/${setName}`);
    };

    if (loading) {
        return (
            <Container maxWidth="md" sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md" sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color="error">{error}</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ minHeight: '80vh' }}>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Your Flashcard Sets
                </Typography>
                {flashcardSets.length === 0 ? (
                    <Typography>No flashcard sets found.</Typography>
                ) : (
                    <List>
                        {flashcardSets.map((set) => (
                            <Box key={set.name}>
                                <ListItem button onClick={() => handleViewSet(set.name)}>
                                    <ListItemText primary={set.name} />
                                </ListItem>
                                <Divider />
                            </Box>
                        ))}
                    </List>
                )}
            </Box>
        </Container>
    );
}
