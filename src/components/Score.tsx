import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../context/QuizContext";
import { feedbackMessages } from "../types"
import { motion, AnimatePresence } from "framer-motion";

//Resumen final del puntaje
const Score = () => {
    const listFeedbackMessages: feedbackMessages[] = [
        {
          title: "Keep trying!",
          description: "Don't get discouraged! Every mistake is a chance to learn. 🚀"
        },
        {
          title: "Step by step!",
          description: "You're just getting started, keep going. Practice will take you far. 🌱"
        },
        {
          title: "Halfway there!",
          description: "Good try, you're halfway through. Don't give up! 💪"
        },
        {
          title: "You're on the right track!",
          description: "You're doing well! A bit more effort and you'll make it. 🌟"
        },
        {
          title: "Great progress!",
          description: "Excellent progress! It shows you've been studying. 🏅"
        },
        {
          title: "Almost perfect!",
          description: "Incredible! Almost perfect, just one step away from perfection. 🎯"
        },
        {
          title: "Awesome!",
          description: "Awesome! You're practically an expert. 🌟"
        },
        {
          title: "Perfect!",
          description: "Perfect! You're a knowledge machine. 🏆"
        }
      ];
      

    const [messagesToDisplay, setMessagesToDisplay] = useState<feedbackMessages>({ title: "", description: "" })

    const { quiz, userDates, backToHome, numberQuiz, quizCompleted } = useContext(QuizContext)

    useEffect(() => {
        const resultado = Math.round((userDates.points.quiz * 100) / quiz.length)
        const index =
            resultado === 100 ? 7 :
            resultado >= 96 ? 6 :
            resultado >= 86 ? 5 :
            resultado >= 71 ? 4 :
            resultado >= 51 ? 3 :
            resultado >= 31 ? 2 :
            resultado >= 11 ? 1 :
            0;
        setMessagesToDisplay(listFeedbackMessages[index]);
    }, [userDates])

    useEffect(()=>{
        quizCompleted()
    },[])

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={numberQuiz}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                 className="score-container"
            >
                 <div className="score-card">
                    <h2 className="score-title">{messagesToDisplay.title}</h2>
                    <p className="score-description">{messagesToDisplay.description}</p>
                    <div className="score-result">
                        <span className="score-points">{userDates.points.quiz}</span>
                        <span className="score-total"> / {quiz.length}</span>
                    </div>
                    <button onClick={backToHome} className="button">Back to start</button>
                </div>
            </motion.div>
        </AnimatePresence>

    )
}

export default Score