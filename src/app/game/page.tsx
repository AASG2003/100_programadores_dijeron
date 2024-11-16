// src/app/question/page.tsx
"use client"
import React, { useState, useEffect} from 'react';
import Image from 'next/image';
import styles from './styles.module.css'
import fondo from "@/public/img/fondo_100_bolivianos.png"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import SvgOverlay from '@/components/svgWrongComponente';

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
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [flippedAnswers, setFlippedAnswers] = useState<number[]>([]);
  const [totalPoints, setTotalPoints] = useState<number>()
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleWrongAnswers = () =>{
    const audio = new Audio('/sounds/buzzer-or-wrong-answer-20582.mp3');
    audio.play();
    if(wrongAnswers < 2)
    setWrongAnswers(wrongAnswers + 1)
    setShowOverlay(true);
    setTimeout(() => setShowOverlay(false), 4000);
  }

  const handleNext = () => {
    setWrongAnswers(0)
    if (questions != null) {
      if (questionNumber < questions.length - 1) {
        setQuestionNumber(questionNumber + 1)
      } else {
        setQuestionNumber(0)
      }
    }
  }

  const handlePrevious = () => {
    setWrongAnswers(0)
    if (questions != null) {
      if (questionNumber == 0) {
        setQuestionNumber(questions?.length - 1)
      } else {
        setQuestionNumber(questionNumber - 1)
      }
    }
  }

  const handleFlip = (answerId: number) => {
    const audio = new Audio('/sounds/copper-bell-ding-16-215298.mp3');
    audio.play();
    setFlippedAnswers((prev) => 
      prev.includes(answerId) ? prev.filter((id) => id !== answerId) : [...prev, answerId]
    );
  };

  const fetchQuestion = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/questions`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al obtener la pregunta');
      }
      const data: Question[] = await response.json();
      setQuestions(data);
      console.log(questionNumber)
      setQuestion(data[questionNumber])
    } catch (error) {
      setError('Error obteniendo pregunta aleatoria');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  function sumFlipedAnswers(): number {
    if(question?.answers != null){
      return question.answers
      .filter(answer => flippedAnswers.includes(answer.id)) 
      .reduce((sum, answer) => sum + answer.puntos, 0); 
    } else {
      return 0;
    }
  }

  useEffect(() => {
    // Función para obtener la pregunta aleatoria
    fetchQuestion();
    if (questions != null) {
      setQuestion(questions[questionNumber])
    }
    setTotalPoints(sumFlipedAnswers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionNumber, flippedAnswers, wrongAnswers]);

  if (loading) {
    return <p>Cargando Pregunta</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!question) {
    return <p>No hay preguntas disponibles</p>;
  }

  return (
    <div className={styles.background}>
      <div>
        <button className={`${styles.fixed_button} ${styles.left_button}`} onClick={handlePrevious}>
          <FaArrowLeft style={{ marginRight: '8px' }} />
        </button>
        <button className={`${styles.fixed_button} ${styles.right_button}`} onClick={handleNext}>
          <FaArrowRight style={{ marginLeft: '8px' }} />
        </button>
      </div>
      <div>
      {showOverlay && <SvgOverlay count={wrongAnswers} />}
      </div>
      <Image src={fondo}
        width={500}
        height={500}
        className={styles.background_image}
        alt="imagen de fondo" />
      <div className={styles.question_container}>

        <div className={styles.question}>{questionNumber + 1}: {question.question}</div>

        {question.answers.map((answer, index) => (
          <div
            className={`${styles.answer} ${!flippedAnswers.includes(answer.id) ? styles.flipped : ""}`}
            key={answer.id}
            onClick={() => handleFlip(answer.id)}
          >
            <div className={styles.front}>
              <section className={styles.answer_number}>{index + 1}</section>
              <section className={styles.answer_text}>{answer.respuesta}</section>
              <section className={styles.answer_points}>{answer.puntos}</section>
            </div>
            <div className={styles.back}></div>
          </div>
        ))}
      </div>
      <div className={styles.fixed_box_left}>
        Puntos: {totalPoints}
      </div>
      <button onClick={handleWrongAnswers}>
        <div className={styles.fixed_box_right}>
          Respuestas <br/>
          Incorrectas: {wrongAnswers}
        </div>
      </button>
    </div>
  );
};

export default QuestionPage;
