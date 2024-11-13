// src/app/api/answers/route.ts
import { NextResponse } from 'next/server';
import { createAnswer, getAnswersByQuestionId, getAnswerById, updateAnswer, deleteAnswer, getAnswers } from '../../../services/answerService';

// Crear una nueva respuesta (POST)
export async function POST(request: Request) {
  try {
    const { respuesta, puntos, idPregunta } = await request.json();
    const newAnswer = await createAnswer({ respuesta, puntos, idPregunta });
    return NextResponse.json(newAnswer, { status: 201 });
  } catch (error) {
    console.error('Error creating answer:', error);
    return NextResponse.json({ message: 'Failed to create answer' }, { status: 500 });
  }
}

// Obtener todas las respuestas de una pregunta (GET)
export async function GET(request: Request) {
  try {
    const answers = await getAnswers();
    return NextResponse.json(answers, { status: 200 });
  } catch (error) {
    console.error('Error fetching answers:', error);
    return NextResponse.json({ message: 'Failed to fetch answers' }, { status: 500 });
  }
}

// Obtener una respuesta por su id (GET /:id)
export async function GET_BY_ID(request: Request) {
  try {
    const { id } = await request.json();
    const answer = await getAnswerById(id);
    if (!answer) {
      return NextResponse.json({ message: 'Answer not found' }, { status: 404 });
    }
    return NextResponse.json(answer, { status: 200 });
  } catch (error) {
    console.error('Error fetching answer:', error);
    return NextResponse.json({ message: 'Failed to fetch answer' }, { status: 500 });
  }
}

// Actualizar una respuesta (PUT)
export async function PUT(request: Request) {
  try {
    const { id, respuesta, puntos } = await request.json();
    const updatedAnswer = await updateAnswer(id, { respuesta, puntos });
    if (!updatedAnswer) {
      return NextResponse.json({ message: 'Answer not found' }, { status: 404 });
    }
    return NextResponse.json(updatedAnswer, { status: 200 });
  } catch (error) {
    console.error('Error updating answer:', error);
    return NextResponse.json({ message: 'Failed to update answer' }, { status: 500 });
  }
}

// Eliminar una respuesta (DELETE)
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const deletedAnswer = await deleteAnswer(id);
    if (!deletedAnswer) {
      return NextResponse.json({ message: 'Answer not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Answer deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting answer:', error);
    return NextResponse.json({ message: 'Failed to delete answer' }, { status: 500 });
  }
}
