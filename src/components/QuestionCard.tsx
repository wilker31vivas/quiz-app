import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../context/QuizContext";
import Score from "./Score";
import { motion, AnimatePresence } from "framer-motion";

//Muestra la pregunta y opciones de respuesta
const QuestionCard = () => {
    const { currentQuestion, handleNextQuestion, numberQuiz, updateSelectedAnswer, quiz, answered } = useContext(QuizContext)
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        setDisabled(currentQuestion?.selected_answer !== undefined); // Desactiva el botón después del primer click
    }, [currentQuestion])

    if (!currentQuestion?.question) return null;
    if (numberQuiz >= quiz.length) return <Score></Score>
        
    const decodeHTML = (html: string) => {
        const txt = document.createElement("textarea")
        txt.innerHTML = html
        return txt.value
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={numberQuiz}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="question-card-container"
            >
                <div className="question-card">
                    <p className="question-counter">{numberQuiz + 1} / {quiz.length}</p>
                    <h2 className="question-title">{decodeHTML(currentQuestion.question)}</h2>
                    <div className="answers-container">
                        {currentQuestion.answers.map((answer: string, index: number) => {
                            const isSelected = currentQuestion.selected_answer === answer;
                            const isCorrect = currentQuestion.correct_answer === answer && currentQuestion.selected_answer === answer;
                            const isWrongSelection = isSelected && !isCorrect;

                            return (
                                <button className={`answer-btn ${isCorrect ? 'correct' : ''} ${isWrongSelection ? 'incorrect' : ''}`}
                                    key={index}
                                    value={answer}
                                    disabled={disabled}
                                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => { updateSelectedAnswer(e.currentTarget.value) }}>
                                    {answer}
                                </button>
                            )
                        })}
                    </div>
                        {answered && (<button className="button" onClick={handleNextQuestion}>Next</button>)}
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default QuestionCard