import { useContext, useState, FormEventHandler } from "react"
import { QuizContext } from '../context/QuizContext'
import { UserDates } from '../types'
import { BiSolidPencil } from "react-icons/bi";
import Modal from "./Modal";
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Accordion = () => {
    const { deleteUser, setUserDates, userDates, avatarsURL, stats } = useContext(QuizContext)
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [userName, setUserName] = useState("")

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const saveName: FormEventHandler = (e) => {
        e.preventDefault()
        if (userName.trim() === "") return

        setUserDates((prevState: UserDates) => ({
            ...prevState,
            name: userName.trim(),
        }))
    }

    const saveAvatar = (avatar: string) => {
        setUserDates((prevState: UserDates) => ({
            ...prevState,
            avatar: avatar,
        }))
    }

    return (
        <div className="user-option">
            <button className="accordion" onClick={() => { toggleAccordion(1); }}>
                Change Name
                <span>{openIndex === 1 ? "▲" : "▼"}</span>
            </button>
            {openIndex === 1 && (
                <div className="panel">
                    <form onSubmit={saveName} className="form-accordion">
                        <label htmlFor="username">Username</label>
                        <input id="username" type="string" onChange={e => setUserName(e.target.value)} required value={userName} autoComplete="on"></input>
                        <button type="submit" className="button">Save</button>
                    </form>
                </div>
            )}
            <button className="accordion" onClick={() => { toggleAccordion(2); }}>
                Change Avatar
                <span>{openIndex === 2 ? "▲" : "▼"}</span>
            </button>
            {openIndex === 2 && (
                <div className="panel">
                    <div className="avatar-default-container" onClick={() => setIsModalOpen(true)}>
                        <img src={userDates.avatar} alt="" className="avatar-img" />
                        <div className="edit">
                            <BiSolidPencil className="edit-icon" />
                        </div>
                    </div>
                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <div className="avatar-container">
                            {avatarsURL.map((item: string, index: number) => (
                                <img key={index} src={item} alt="" className="avatar-img img-modal" onClick={() => { saveAvatar(item); setIsModalOpen(false) }} />
                            ))}
                        </div>
                    </Modal>
                </div>
            )}
            <button className="accordion" onClick={() => { toggleAccordion(3); }}>
                Stadist
                <span>{openIndex === 3 ? "▲" : "▼"}</span>
            </button>
            {openIndex === 3 && (
                <div className="panel">
                    <div className="user-info">
                        <div>
                            <p>Points:</p>
                            <p>Percentage of hits:</p>
                            <p>Quizzes completed:</p>
                            <p>Max streak:</p>
                            <p>Easy:</p>
                            <p>Medium:</p>
                            <p>Hard:</p>
                        </div>
                        <div>
                            <p>{stats.points}</p>
                            <p>{stats.percentage}%</p>
                            <p>{stats.completedQuizzes}</p>
                            <p>{stats.maxStreak}</p>
                            <p>{stats.playedDifficulties.easy}</p>
                            <p>{stats.playedDifficulties.medium}</p>
                            <p>{stats.playedDifficulties.hard}</p>
                        </div>
                    </div>
                </div>
            )}
            <button className="accordion" onClick={() => { toggleAccordion(4); }}>
                Delete Account
                <span>{openIndex === 0 ? "▲" : "▼"}</span>
            </button>
            {openIndex === 4 && (
                <div className="panel">
                    <p className="confirm-text">Confirm?</p>
                    <div className="panel-buttons">
                        <button className="confirm-true" onClick={() => { deleteUser() }}>Yes</button>
                        <button className="confirm-false" onClick={() => { toggleAccordion(0); }}>No</button>
                    </div>
                </div>
            )}
            <button className="accordion" onClick={() => { toggleAccordion(5); }}>
                Credit
                <span>{openIndex === 5 ? "▲" : "▼"}</span>
            </button>
            {openIndex === 5 && (
                <div className="panel">
                    <div className="credit-info">
                        <p>App developed by <strong>Wilker Vivas</strong></p>
                        <p>Made with React + TypeScript</p>
                        <p><FaGithub size={24} /> <a href="https://github.com/wilker31vivas" target="_blank">
                            /wilker31vivas
                        </a></p>
                        <p><FaLinkedin size={24} /> <a href="https://www.linkedin.com/in/wilker-vivas-531965234/" target="_blank">
                            wilker-vivas
                        </a></p>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Accordion;