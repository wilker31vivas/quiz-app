import { useContext } from "react"
import { QuizContext } from '../context/QuizContext'

// Configuración inicial (cantidad, categoría, dificultad)

const QuizParam = () => {
  const { quizConfig, dispatch} = useContext(QuizContext)

  return (
    <form className="quiz-form">
      <div className="form-group">
        <label htmlFor="quantity">Number of questions:</label>
        <input
          id="quantity"
          className="form-input"
          type="number"
          min={1}
          max={50}
          value={quizConfig?.quantity}
          onChange={(e) =>
            dispatch({ type: "QUANTITY", payload: e.target.valueAsNumber })
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="difficulty">Difficulty:</label>
        <select
          name="difficulty"
          id="difficulty"
          className="form-select"
          onChange={(e) =>
            dispatch({
              type: "DIFFICULTY",
              payload: e.target.selectedOptions[0].value,
            })
          }
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="type">Type:</label>
        <select
          name="type"
          id="type"
          className="form-select"
          onChange={(e) =>
            dispatch({
              type: "TYPE",
              payload: e.target.selectedOptions[0].value,
            })
          }
        >
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True / False</option>
        </select>
      </div>
    </form>
  )
}

export default QuizParam