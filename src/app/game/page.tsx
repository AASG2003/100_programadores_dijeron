// src/app/question/page.tsx
"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './styles.module.css'
import fondo from "@/public/img/fondo_100_bolivianos.png"

interface Answer {
  id: number;
  respuesta: string;
  puntos: number;
}

interface Question {
  id: number;
  question: string;
  available: boolean;
  answers: Answer[];
}

const QuestionPage: React.FC = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Función para obtener la pregunta aleatoria
    const fetchQuestion = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/questions/randoms`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch the question');
        }
        const data: Question = await response.json();
        setQuestion(data);
      } catch (error) {
        setError('Error fetching random question');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, []);

  if (loading) {
    return <p>Loading question...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!question) {
    return <p>No questions available at the moment.</p>;
  }

  return (
    <div className={styles.background}>
      <Image src={fondo}
        width={500}
        height={500}
        className={styles.background_image}
        alt="imagen de fondo" />
      <div className={styles.question_container}>
        <div className={styles.decor}>
          <span style={{ backgroundColor: '#FF69B4' }}></span>
          <span style={{ backgroundColor: '#FF9A00' }}></span>
          <span style={{ backgroundColor: '#9ACD32' }}></span>
          <span style={{ backgroundColor: '#FF69B4' }}></span>
          <span style={{ backgroundColor: '#FF9A00' }}></span>
          <span style={{ backgroundColor: '#9ACD32' }}></span>
        </div>

        {/* Pregunta */}
        <div className={styles.question}>{question.question}</div>

        {/* Opciones de respuesta */}
        {question.answers.map((answer: Answer) => (
          <div className={styles.answer} key={answer.id}>
            <div className={styles.answer_number}>{answer.id}</div>
            <div className={styles.answer_text}>{answer.respuesta}</div>
            <div className={styles.answer_points}>{answer.puntos}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionPage;
