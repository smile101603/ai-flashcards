"use client";

import { Button } from "@mui/material";
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import SlightFlip from '@/components/magicui/flip-text';
import { useEffect, useState } from "react";
import BlurIn from "@/components/magicui/blur-in";

export default function Home() {
  const taglines = ["Effortless Learning", "AI-Powered Flashcards"];
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
    <div className="container mx-auto text-center">
      <BlurIn word="AI Flashcards" />
      <SlightFlip
        key={currentTaglineIndex}
        className="text-4xl font-bold text-blue-600"
        word={taglines[currentTaglineIndex]}
      />
      <p className="text-xl text-gray-700 mb-8 mt-4">
        Revolutionize your study routine with AI-generated flashcards.
      </p>
      <Button className="mb-12" size="lg" variant="outlined">
        Create Your Flashcards
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-white shadow-lg transform transition-transform duration-300 hover:scale-110">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-blue-600">AI-Powered Creation</h2>
          </CardHeader>
          <CardContent>
            <p>Generate comprehensive flashcards from your notes or textbooks using advanced AI technology.</p>
          </CardContent>
          <CardFooter className="flex justify-center py-4">
            <Button variant="link">See How It Works</Button>
          </CardFooter>
        </Card>
        <Card className="bg-white shadow-lg transform transition-transform duration-300 hover:scale-110">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-blue-600">Exam Prep</h2>
          </CardHeader>
          <CardContent>
            <p>Excellent for studying for big exams through quick, targeted review of key concepts via digital flashcards.</p>
          </CardContent>
          <CardFooter className="flex justify-center py-4">
            <Button variant="link">Explore Features</Button>
          </CardFooter>
        </Card>
        <Card className="bg-white shadow-lg transform transition-transform duration-300 hover:scale-110">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-blue-600">Study Anywhere</h2>
          </CardHeader>
          <CardContent>
            <p>Access your AI-generated flashcards on any device, anytime, anywhere.</p>
          </CardContent>
          <CardFooter className="flex justify-center py-4">
            <Button variant="link">Try It Free</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
