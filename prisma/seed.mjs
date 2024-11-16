import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';

const prisma = new PrismaClient();

async function main() {
  // Leer el archivo JSON
  const data = JSON.parse(await fs.readFile('./data.json', 'utf-8'));

  // Limpiar las tablas
  await prisma.answer.deleteMany({});
  await prisma.question.deleteMany({});

  console.log('Base de datos vaciada.');

  // Insertar la pregunta y sus respuestas

  for (const item of data.questions) {
    const { question, order, answers } = item;
    console.log(order)
    const newQuestion = await prisma.question.create({
      data: {
        question,
        order : order,
        answers: {
          create: answers.map(answer => ({
            respuesta: answer.respuesta,
            puntos: answer.puntos,
          })),
        },
      },
    });
    console.log(`Pregunta "${newQuestion.question}" insertada con respuestas.`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
