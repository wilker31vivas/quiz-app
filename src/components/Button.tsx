import { useContext } from "react";
import { QuizContext } from "../context/QuizContext";

const Button = () => {
    const { step, prevStep, nextStep, quizConfig, fetchDatos } = useContext(QuizContext)

    return (
        <div className="container-step">
            {step > 0 && step < 3 && (
                <button className="button" onClick={prevStep}>Back</button>
            )}
            {step === 0 && (
                <button className="button" onClick={nextStep}>Let's play</button>
            )}
            {step === 1 && quizConfig?.category && (
                <button className="button" onClick={nextStep}>Next</button>
            )}
            {step === 2 && (
                <button className="button" onClick={fetchDatos}>Finish</button>
            )}
        </div>
    )
}

export default Button