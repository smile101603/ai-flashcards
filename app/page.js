"use client";

import { Button } from "@mui/material";
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import SlightFlip from '@/components/magicui/flip-text';
import { useEffect, useState } from "react";
import BlurIn from "@/components/magicui/blur-in";
// Import Montserrat font from next/font/google
import { Montserrat } from 'next/font/google';

// Create a Montserrat font instance with specified weights
const montserrat = Montserrat({
  weights: [400, 500, 700, 900],
  subsets: ['latin'],
});

export default function Home() {
  const taglines = ["Effortless Learning", "AI-Powered Flashcards" , "Ace Your Next Exam"];
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentTaglineIndex(prevIndex =>
        prevIndex === taglines.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => clearTimeout(timeout);
  }, [currentTaglineIndex]);

  return (
    <div className={`container mx-auto text-center ${montserrat.className}`}>
      <BlurIn word="AI Flashcards" />
      <SlightFlip
        key={currentTaglineIndex}
        className="text-4xl font-bold text-blue-600"
        word={taglines[currentTaglineIndex]}
      />
      <p className="text-xl text-gray-700 mb-8 mt-4 font-light">
        Revolutionize your study routine with AI-generated flashcards.
      </p>
      <Button className="mb-12 font-medium" size="large" variant="outlined" sx={ { color: "black" } }>
        Create Your Flashcards Now
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-white shadow-lg transform transition-transform duration-300 hover:scale-110">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-blue-600">AI-Powered Creation</h2>
          </CardHeader>
          <CardContent>
            <p className="font-light">Generate comprehensive flashcards from your notes or textbooks using advanced AI technology.</p>
          </CardContent>
          <CardFooter className="flex justify-center py-4">
            <Button variant="link" className="font-medium">See How It Works</Button>
          </CardFooter>
        </Card>
        <Card className="bg-white shadow-lg transform transition-transform duration-300 hover:scale-110">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-blue-600">Exam Prep</h2>
          </CardHeader>
          <CardContent>
            <p className="font-light">Excellent for studying for big exams through quick, targeted review of key concepts via digital flashcards.</p>
          </CardContent>
          <CardFooter className="flex justify-center py-4">
            <Button variant="link" className="font-medium">Explore Features</Button>
          </CardFooter>
        </Card>
        <Card className="bg-white shadow-lg transform transition-transform duration-300 hover:scale-110">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-blue-600 font-medium">Study Anywhere</h2>
          </CardHeader>
          <CardContent>
            <p className="font-light">Access your AI-generated flashcards on any device, anytime, anywhere.</p>
          </CardContent>
          <CardFooter className="flex justify-center py-4">
            <Button variant="link" className="font-medium">Try It Free</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
