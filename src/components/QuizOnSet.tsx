import { useContext } from "react"
import { QuizContext } from '../context/QuizContext'
import Accordion from "./Accordion"

const QuizOnSet = () => {
    const { userDates } = useContext(QuizContext)

    return (
        <>
            <h1>Quiz by Wilker</h1>
            <div className="container-user">
                <div className="user">
                        <img src={userDates.avatar} alt="" className="avatar-img" />
                        <p className="user-edit__name">{userDates.name}</p>
                </div>
                <Accordion></Accordion>
            </div>
        </>
    )
}

export default QuizOnSet