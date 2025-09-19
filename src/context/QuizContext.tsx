import { createContext, useEffect, useReducer, FormEventHandler, useState } from "react";
export const QuizContext = createContext<any>(null);
import { QuizConfig, Category, Quiz, UserDates, Stats, Difficulty } from '../types'

const InitialState: QuizConfig = { category: null, quantity: 1, difficulty: "easy", type: "multiple" }

type Action = { type: "RESET" } | { type: "CATEGORY"; payload: Category } | { type: "QUANTITY"; payload: number } | { type: "DIFFICULTY"; payload: Difficulty } | { type: "TYPE"; payload: string }

const quizReducer = (state: QuizConfig, action: Action): QuizConfig => {
    switch (action.type) {
        case "CATEGORY":
            return { ...state, category: action.payload }
        case "DIFFICULTY":
            return { ...state, difficulty: action.payload }
        case "QUANTITY":
            return { ...state, quantity: action.payload }
        case "TYPE":
            return { ...state, type: action.payload }
        case "RESET":
            return InitialState
        default:
            return state
    }
}

const currentQuestionReset: Quiz = {
    correct_answer: "",
    selected_answer: undefined,
    answers: [],
    question: undefined,
}

export const QuizContextProvider = (props: any) => {
    //preguntas
    const [quiz, setQuiz] = useState<Quiz[]>([]);
    //indice de pregunta
    const [numberQuiz, setNumberQuiz] = useState<number>(0)
    //pregunta actual
    const [currentQuestion, setCurrentQuestion] = useState<Quiz>(currentQuestionReset);
    //configuracion de quiz
    const [quizConfig, dispatch] = useReducer(quizReducer, InitialState)
    //avatar por defecto
    const avatarDefault = "https://api.dicebear.com/9.x/dylan/svg?seed=Andrea&backgroundColor=29e051&hair=plain&mood=superHappy&skinColor=c26450"
    //datos del usuario
    const [userDates, setUserDates] = useState<UserDates>({ name: undefined, points: { quiz: 0, total: 0 }, avatar: avatarDefault })
    //datos de estadisticas
    const initialStats: Stats = {
        points: 0,
        questionsResponded: 0,
        percentage: 0,
        completedQuizzes: 0,
        maxStreak: 0,
        currentStreak: 0,
        playedDifficulties: { easy: 0, medium: 0, hard: 0, },
    }
    const [stats, setStats] = useState<Stats>(initialStats)
    //mostrar si es verdero o incorrecto
    const [response, setResponse] = useState<boolean | undefined>(undefined)
    //mostrar si respondio o no 
    const [answered, setAnswered] = useState<boolean | undefined>(undefined)
    //mostrar los componentes quizSetup 
    const [step, setStep] = useState<number>(0)
    //avatares
    const avatarsURL = [
        "https://api.dicebear.com/9.x/dylan/svg?seed=Andrea&backgroundColor=29e051&hair=plain&mood=superHappy&skinColor=c26450",
        "https://api.dicebear.com/9.x/dylan/svg?seed=Brooklynn&mood=confused,happy,hopeful,neutral,superHappy",
        "https://api.dicebear.com/9.x/dylan/svg?seed=Alexander&backgroundColor=619eff&mood=happy",
        "https://api.dicebear.com/9.x/dylan/svg?seed=Aidan&backgroundColor=ffa6e6&mood=happy",
        "https://api.dicebear.com/9.x/dylan/svg?seed=Chase&backgroundColor=619eff&mood=confused,happy,hopeful,neutral,superHappy",
        "https://api.dicebear.com/9.x/dylan/svg?seed=Eden&backgroundColor=ffa6e6&mood=superHappy",
        "https://api.dicebear.com/9.x/dylan/svg?seed=Eliza&backgroundColor=619eff&mood=hopeful",
        "https://api.dicebear.com/9.x/dylan/svg?seed=Caleb&backgroundColor=ffa6e6&hair=shaggy&mood=hopeful",
        "https://api.dicebear.com/9.x/dylan/svg?seed=Robert&mood=confused,happy,hopeful,neutral,superHappy",
        "https://api.dicebear.com/9.x/dylan/svg?seed=Ryan&mood=confused,happy,hopeful,neutral,superHappy",
    ]

    const categoryList: Category[] = [
        { name: "Any", id: 0, emoji: "⚡" },
        { name: "Films", id: 11, emoji: "🎬" },
        { name: "Science", id: 17, emoji: "🧬" },
        { name: "Art", id: 25, emoji: "🎨" },
        { name: "Sport", id: 21, emoji: "🏆" },
        { name: "Geography", id: 22, emoji: "🗺" },
        { name: "History", id: 23, emoji: "📜" },
        { name: "Politics", id: 24, emoji: "⚖" },
        { name: "Animals", id: 27, emoji: "🦁" },
    ]

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

    const fetchDatos: FormEventHandler = async () => {
        const baseURL = "https://opentdb.com/api.php"
        const any = `amount=${quizConfig?.quantity}&difficulty=${quizConfig?.difficulty}&type=${quizConfig?.type}`
        const params = `amount=${quizConfig?.quantity}&category=${quizConfig?.category?.id}&difficulty=${quizConfig?.difficulty}&type=${quizConfig?.type}`
        let URL_API = ""
        if (quizConfig?.category?.id == 0) {
            URL_API = `${baseURL}?${any}`
        } else {
            URL_API = `${baseURL}?${params}`
        }
        try {
            const response = await fetch(URL_API)
            if (response.ok) {
                const data = await response.json()
                const newData: Quiz[] = data.results.map((item: any) => {
                    return {
                        correct_answer: item.correct_answer,
                        selected_answer: undefined,
                        answers: [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5),
                        question: item.question,
                    }
                })
                setQuiz(newData)
                setCurrentQuestion(newData[numberQuiz])
                setNumberQuiz(0)
                setUserDates((prevState) => ({
                    ...prevState,
                    points: { ...prevState.points, quiz: 0 }
                }))

                nextStep()
            }
        } catch (e) {
            console.log(e)
        }
    }

    //ir a la siguiente pregunta
    const handleNextQuestion = () => {
        if (currentQuestion?.selected_answer === undefined) {
            setAnswered(false)
        } else if (numberQuiz <= quiz.length - 1) {
            setNumberQuiz(prev => prev + 1)
            setResponse(undefined)
            setAnswered(undefined)
        }
    }

    //actualizar respuesta
    const updateSelectedAnswer = (newAnswer: string) => {
        if (currentQuestion !== undefined) {
            setCurrentQuestion((prevQuestion) => ({
                ...prevQuestion,
                selected_answer: newAnswer,
            }));

            setAnswered(true)

            setStats((prevState) => ({
                ...prevState,
                questionsResponded: prevState.questionsResponded + 1
            }))

            if (newAnswer == currentQuestion.correct_answer) {
                setUserDates((prevState) => ({
                    ...prevState,
                    points: { quiz: prevState.points.quiz + 1, total: prevState.points.total + 1 },
                }))

                setStats((prevState) => {
                    const newStreak = prevState.currentStreak + 1;
                    return {
                        ...prevState,
                        currentStreak: newStreak,
                        maxStreak: newStreak > prevState.maxStreak ? newStreak : prevState.maxStreak
                    };
                })

                setResponse(true)
            } else {
                setResponse(false)
                setStats((prevState) => ({
                    ...prevState,
                    currentStreak: 0
                }))
            }

        }
    }

    //volver al home
    const backToHome = () => {
        setStep(0)
        dispatch({ type: "RESET" })
        setQuiz([])
        setCurrentQuestion(currentQuestionReset)
        setNumberQuiz(0)
        setUserDates((prevState) => ({
            ...prevState,
            points: { ...prevState.points, quiz: 0 }
        }));
    }

    //Eliminar cuenta
    const deleteUser = () => {
        localStorage.setItem('user-dates', JSON.stringify({ name: undefined, points: { quiz: 0, total: 0 }, avatar: avatarDefault }))
        setUserDates({ name: undefined, points: { quiz: 0, total: 0 }, avatar: avatarDefault })

        localStorage.setItem('statistics', JSON.stringify(initialStats))
        setStats(initialStats)
    }

    //Accion cuando finaliza un quiz
    const quizCompleted = () => {
        setStats((prevState) => ({
            ...prevState,
            completedQuizzes: prevState.completedQuizzes + 1,
            playedDifficulties: {
                ...prevState.playedDifficulties,
                [quizConfig.difficulty]: prevState.playedDifficulties[quizConfig.difficulty] + 1
            }
        }))
    }

    //checkear si localstorage tiene datos
    useEffect(() => {
        let data = localStorage.getItem("user-dates")
        if (data) {
            setUserDates(JSON.parse(data))
        }
        let dataStats = localStorage.getItem("statistics")
        if (dataStats) {
            setStats(JSON.parse(dataStats))
        }
    }, [])

    //guardar la informacion en localStorage cada vez que cambia los datos
    useEffect(() => {
        localStorage.setItem('user-dates', JSON.stringify(userDates))

        setStats((prevState) => ({
            ...prevState,
            points: userDates.points.total,
            percentage: prevState.questionsResponded > 0
                ? Math.round((userDates.points.total / prevState.questionsResponded) * 100)
                : 0,
        }))
    }, [userDates])

    //guardar estadisticas
    useEffect(() => {
        localStorage.setItem('statistics', JSON.stringify(stats))
    }, [stats])

    useEffect(() => {
        if (numberQuiz < quiz.length) {
            setCurrentQuestion(quiz[numberQuiz])
        }
    }, [numberQuiz, quiz])


    return (
        <QuizContext.Provider value={{
            quiz, updateSelectedAnswer,
            response, quizConfig, dispatch,
            categoryList, fetchDatos,
            currentQuestion, setCurrentQuestion,
            handleNextQuestion, numberQuiz,
            answered, userDates, setUserDates,
            backToHome, step, nextStep,
            prevStep, deleteUser, avatarsURL,
            stats, quizCompleted
        }}>
            {props.children}
        </QuizContext.Provider>
    )
}