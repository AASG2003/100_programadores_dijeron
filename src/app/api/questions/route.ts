// src/app/api/questions/route.ts
import { NextResponse } from 'next/server';
import { createQuestion, getQuestions, updateQuestion, deleteQuestion } from '../../../services/questionService';

// Crear una nueva pregunta (POST)
export async function POST(request: Request) {
  try {
    const { question, available } = await request.json();
    const newQuestion = await createQuestion({ question, available });
    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json({ message: 'Failed to create question' }, { status: 500 });
  }
}

// Obtener todas las preguntas (GET)
export async function GET() {
  try {
    const questions = await getQuestions();
    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json({ message: 'Failed to fetch questions' }, { status: 500 });
  }
}

// Actualizar una pregunta (PUT)
export async function PUT(request: Request) {
  try {
    const { id, question, available } = await request.json();
    const updatedQuestion = await updateQuestion(id, { question, available });
    if (!updatedQuestion) {
      return NextResponse.json({ message: 'Question not found' }, { status: 404 });
    }
    return NextResponse.json(updatedQuestion, { status: 200 });
  } catch (error) {
    console.error('Error updating question:', error);
    return NextResponse.json({ message: 'Failed to update question' }, { status: 500 });
  }
}

// Eliminar una pregunta (DELETE)
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const deletedQuestion = await deleteQuestion(id);
    if (!deletedQuestion) {
      return NextResponse.json({ message: 'Question not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Question deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting question:', error);
    return NextResponse.json({ message: 'Failed to delete question' }, { status: 500 });
  }
}
