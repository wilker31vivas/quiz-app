import { useContext, useEffect, useState } from "react"
import './App.css'
import QuizCategory from "./components/QuizCategory"
import QuestionCard from './components/QuestionCard'
import { QuizContext } from './context/QuizContext'
import QuizOnSet from "./components/QuizOnSet"
import QuizParam from "./components/QuizParam"
import Button from "./components/Button"
import { motion, AnimatePresence } from "framer-motion";
import QuizLogin from "./components/QuizLogin"
import { UserDates } from './types'

function App() {
  const { step, userDates, setUserDates } = useContext(QuizContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let storedData = localStorage.getItem("user-dates")
    if (storedData) {
      const parsedData: UserDates = JSON.parse(storedData)
      if (parsedData.name && !userDates.name) {
        setUserDates((prevState: UserDates) => ({
          ...prevState,
          name: parsedData.name
        }))
      }
    }
    setIsLoading(false)
  }, [])

  if (isLoading) return null

  const renderStep = () => {
    switch (step) {
      case 0:
        return <QuizOnSet></QuizOnSet>
      case 1:
        return <QuizCategory></QuizCategory>
      case 2:
        return <QuizParam></QuizParam>
      case 3:
        return <QuestionCard></QuestionCard>
      default:
        return null
    }
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="app-container"
        >
          {userDates.name !== undefined ? (
            <>
              {renderStep()}
              <Button></Button>
            </>
          ) : <QuizLogin></QuizLogin>}
        </motion.div>
      </AnimatePresence >
    </>
  )
}

export default App

