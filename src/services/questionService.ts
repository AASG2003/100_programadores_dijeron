// src/services/questionService.ts
import { PrismaClient } from '@prisma/client';
import { randomInt } from 'crypto';

const prisma = new PrismaClient();

// Crear una nueva pregunta
export const createQuestion = async (data: { question: string; available: boolean }) => {
    return prisma.question.create({
        data,
    });
};

// Obtener todas las preguntas
export const getQuestions = async () => {
    return prisma.question.findMany();
};

// Actualizar una pregunta existente
export const updateQuestion = async (id: number, data: { question: string; available: boolean }) => {
    return prisma.question.update({
        where: { id },
        data,
    });
};

// Eliminar una pregunta
export const deleteQuestion = async (id: number) => {
    return prisma.question.delete({
        where: { id },
    });
};

export const getRandomQuestion = async () => {
    const count = await prisma.question.count({
        where: {
            available:true
        }
    });
    const question = randomInt(0, count)
    console.log(question)
    const response = await prisma.question.findFirst({
        orderBy: {
           id: 'desc',
        },
        skip: question,
        take: 1,
        include : {answers: true}
    });
    return response;
}
