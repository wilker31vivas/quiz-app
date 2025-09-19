// Componente principal del quiz
import { useContext } from "react"
import { Category } from '../types'
import { QuizContext } from '../context/QuizContext'

const QuizCategory = () => {
    const { categoryList, dispatch, quizConfig } = useContext(QuizContext)

    return (
        <>
            <h1 className="category-title">
                {quizConfig?.category ? (
                    <>Selected category: <span>{quizConfig.category.name}</span></>
                ) : (
                    "Please select a category:"
                )}
            </h1>
            <div className='category-container'>
                {
                    categoryList.map((item: Category) => (
                        <button
                            className="category-button"
                            onClick={() => dispatch({ type: "CATEGORY", payload: item })}
                            key={item?.id}
                        >
                            <span className="emoji">{item?.emoji}</span>
                            <span>{item?.name}</span>
                        </button>
                    ))
                }
            </div>
        </>
    )
}

export default QuizCategory