import { useState, FormEventHandler, useContext } from "react"
import { UserDates } from '../types'
import { QuizContext } from "../context/QuizContext"
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import { BiSolidPencil } from "react-icons/bi";

const QuizLogin = () => {
    const { setUserDates, step, avatarsURL } = useContext(QuizContext)
    const [userName, setUserName] = useState("")
    const [userAvatar, setUserAvatar] = useState("https://api.dicebear.com/9.x/dylan/svg?seed=Andrea&backgroundColor=29e051&hair=plain&mood=superHappy&skinColor=c26450")
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    //actualizar username
    const saveUser: FormEventHandler = (e) => {
        e.preventDefault()
        if (userName.trim() === "") return

        setUserDates((prevState: UserDates) => ({
            ...prevState,
            name: userName.trim(),
            avatar: userAvatar
        }))
    }


    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={step}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="login-container"
            >
                <div className="avatar-default-container" onClick={() => setIsModalOpen(true)}>
                    <img src={userAvatar} alt="" className="avatar-img" />
                    <div className="edit">
                        <BiSolidPencil className="edit-icon" />
                    </div>
                </div>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <div className="avatar-container">
                        {avatarsURL.map((item: string, index: number) => (
                            <img key={index} src={item} alt="" className="avatar-img img-modal" onClick={() => { setUserAvatar(item); setIsModalOpen(false) }} />
                        ))}
                    </div>
                </Modal>
                <form onSubmit={saveUser} className="form-login">
                    <label>Username</label>
                    <input type="string" onChange={e => setUserName(e.target.value)} required value={userName}></input>
                    <button type="submit" className="button">Login</button>
                </form>
            </motion.div>
        </AnimatePresence>

    )
}
export default QuizLogin