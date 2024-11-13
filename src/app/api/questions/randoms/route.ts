// src/app/api/questions/random/route.ts
import { NextResponse } from 'next/server';
import { getRandomQuestion } from '@/services/questionService';

export async function GET() {
  try {
    const randomQuestion = await getRandomQuestion()
    if (!randomQuestion) {
       return NextResponse.json({ message: 'No hay respuestas' }, { status: 404 });
    } else {
        console.log("hola")
        const response = NextResponse.json(randomQuestion, { status: 200 });
        return response
    }
  } catch (error) {
    console.error('Error fetching random question:', error);
    return NextResponse.json({ message: 'Failed to fetch random question' }, { status: 500 });
  }
}
