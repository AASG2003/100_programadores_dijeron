// src/app/question/page.tsx
"use client"
import React, { useState, useEffect } from 'react';
import styles from '@/public/styles.module.css';

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
    <div className="question-container">
      {/* Decoración superior */}
      <div className="decor">
        <span style={{ backgroundColor: '#FF69B4' }}></span>
        <span style={{ backgroundColor: '#FF9A00' }}></span>
        <span style={{ backgroundColor: '#9ACD32' }}></span>
        <span style={{ backgroundColor: '#FF69B4' }}></span>
        <span style={{ backgroundColor: '#FF9A00' }}></span>
        <span style={{ backgroundColor: '#9ACD32' }}></span>
      </div>

      {/* Pregunta */}
      <div className="question">{question.question}</div>

      {/* Opciones de respuesta */}
      {question.answers.map((answer: Answer) => (
        <div className="answer" key={answer.id}>
          <div className="answer-number">{answer.id}</div>
          <div className="answer-text">{answer.respuesta}</div>
          <div className="answer-points">{answer.puntos}</div>
        </div>
      ))}

      <style jsx>{`
        /* Estilos embebidos dentro del componente */

        /* Fondo general */
        body {
          margin: 0;
          padding: 0;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #292135;
        }

        .question-container {
          background-color: #3f2a5e;
          padding: 20px;
          border-radius: 10px;
          width: 100%;
          heigh: 100%;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          text-align: center;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        /* Decoración superior */
        .decor {
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
        }
        .decor span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin: 0 2px;
        }

        /* Pregunta */
        .question {
          font-size: 22px;
          margin-bottom: 20px;
          color: #ffffff;
        }

        /* Contenedor de respuestas */
        .answer {
          display: flex;
          align-items: center;
          background-color: #f8f8f8;
          border-radius: 20px;
          padding: 5px 10px;
          margin: 8px 0;
          width: 100%;
        }

        .answer-number {
          background-color: #ff69b4;
          color: white;
          font-size: 14px;
          width: 25px;
          height: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
        }

        .answer-text {
          flex: 1;
          text-align: left;
          margin: 0 10px;
          color: #333333;
        }

        .answer-points {
          background-color: #a0d2d0;
          width: 50px;
          height: 20px;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default QuestionPage;
