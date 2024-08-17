import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given text. The flashcards should be easy to understand and should cover the main points of the text. Follow the guidelines below to create the flashcards:
1. Each flashcard should cover a single concept.
2. Use simple and clear language.
3. Include only the most important information.
4. Avoid using long sentences.
5. Use bullet points to list related information.
6. Use the active voice.
7. Use present tense.
8. Use the second person point of view.
9. Use the imperative mood.
10. Use the following format: "Front of the card: Back of the card."

Return in the following JSON format:
{
  "flashcards": [{
    "front": str,
    "back": str
}]
}`;

export async function POST(req) {
  const openai = new OpenAI();
  const data = await req.text();

  const completion = await openai.chat.completion.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: data }
    ],
    model: 'gpt-4o',
    response_format: {type: 'json_object'},
  })

  const flashcards = JSON.parse(completion.data.choices[0].message.content)

  return NextResponse.json(flashcards.flashcards)
}