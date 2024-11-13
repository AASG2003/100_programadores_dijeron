// src/services/answerService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createAnswer = async (data: { respuesta: string; puntos: number; idPregunta: number }) => {
  return prisma.answer.create({
    data,
  });
};

export const getAnswersByQuestionId = async (idPregunta: number) => {
  return prisma.answer.findMany({
    where: { idPregunta }
  });
};

export const getAnswers = async() => {
    return prisma.answer.findMany()
}

export const getAnswerById = async (id: number) => {
  return prisma.answer.findUnique({
    where: { id },
  });
};

export const updateAnswer = async (id: number, data: { respuesta: string; puntos: number }) => {
  return prisma.answer.update({
    where: { id },
    data,
  });
};

export const deleteAnswer = async (id: number) => {
  return prisma.answer.delete({
    where: { id },
  });
};
