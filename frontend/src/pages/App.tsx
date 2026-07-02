import {useNavigate} from "react-router";
import {type ChangeEvent, type KeyboardEvent, useEffect, useRef, useState} from "react";
import LanguageMotionDiv from "../animate/LanguageMotionDiv.tsx"
import {type TranslateRequest, translateRequest} from "../utils/requests.js";


type TranslationMessage = {
    id: string
    userPrompt: string
    translation: string
    isLoading: boolean
    error?: string
}

function App() {
    const navigate = useNavigate()

    // States
    const [formData, setFormData] = useState<TranslateRequest>({
        userPrompt: "",
        targetLanguage: "French"
    })

    const [messages, setMessages] = useState<TranslationMessage[]>([])
    const [error, setError] = useState<string>("")

    const scrollBoxRef = useRef<HTMLDivElement | null>(null)

    // useEffects
    useEffect(() => {
        scrollBoxRef.current?.scrollTo({
            top: scrollBoxRef.current.scrollHeight,
            behavior: "smooth"
        })
    }, [messages])

    // Functions
    const handleBackToWelcome = () => {
        navigate("/")
    }

    const updateFormData = (event: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = event.target

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        updateFormData(event)
    }

    const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
        updateFormData(event)
    }

    const formatMessages = (message: TranslationMessage) => {
        return (
            message.error ?
                <div key={message.id} className={"message-group"}>
                    <p className={`user-message`}
                       style={{border: "1px solid rgba(255, 111, 125, 0.35)", background: "rgba(255, 111, 125, 0.12)"}}>
                        <span style={{color: "#9b2130"}}>Failed to translate</span>
                    </p>
                    {/*<p className={`translation-message`}>{message.translation}</p>*/}
                </div> :
                <div key={message.id} className={"message-group"}>
                    <p className={"user-message"}>{message.userPrompt}</p>
                    <p className={`translation-message`}>{message.translation}</p>
                </div>
        )
    }

    const handleSubmitOnKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            event.currentTarget.form?.requestSubmit()
        }
    }

    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError("")

        const promptToTranslate = formData.userPrompt.trim()

        if (!promptToTranslate) {
            setError("Please enter text to translate.")
            return
        }

        setFormData(prevFormData => ({
            ...prevFormData,
            userPrompt: ""
        }))

        const messageId = crypto.randomUUID()

        setMessages(prevMessages => ([
            ...prevMessages,
            {
                id: messageId,
                userPrompt: promptToTranslate,
                translation: "",
                isLoading: true
            }
        ]))

        try {
            const data = await translateRequest(formData)
            // console.log(data.message, "\n")

            const latestTranslation = data.message[data.message.length - 1].output
            // console.log(latestTranslation)

            setMessages(prevMessages => (
                prevMessages.map(message => (
                    message.id === messageId ? {
                        ...message,
                        translation: latestTranslation,
                        isLoading: false
                    } : message
                ))
            ))

        } catch (error) {
            const errorMessage = (error instanceof Error) ? error.message : "An unknown error occurred."
            setError(errorMessage)

            setMessages(prevMessages => (
                prevMessages.map(message => (
                    message.id === messageId ? {
                        ...message,
                        translation: "",
                        isLoading: false,
                        error: errorMessage
                    } : message
                ))
            ))
        }

    }

    return (
        <>
            <LanguageMotionDiv>
                <div className={"spanish-hello hello"}>¡Hola!</div>
            </LanguageMotionDiv>
            <LanguageMotionDiv>
                <div className={"english-hello hello"}>Hello!</div>
            </LanguageMotionDiv>

            <main className={"container"}>
                <h1 className={"heading"}>
                    Hello, <br/>
                    let's break language<br/>
                    barriers!🌍
                </h1>

                <div ref={scrollBoxRef} className={"scroll-box"}>
                    {messages.map((message) => (formatMessages(message)))}
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={"input-text"}>
                        <label htmlFor="userPrompt">Text to translate</label>
                        <br/>
                        <textarea
                            id="userPrompt"
                            name="userPrompt"
                            value={formData.userPrompt}
                            onChange={handleTextChange}
                            onKeyDown={handleSubmitOnKeyDown}
                            rows={6}
                            placeholder="Enter text here..."
                        />
                    </div>

                    <div className={"input-language"}>
                        <label htmlFor="targetLanguage">Target language</label>

                        <select
                            id="targetLanguage"
                            name="targetLanguage"
                            value={formData.targetLanguage}
                            onChange={handleLanguageChange}
                        >
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                            <option value="Japanese">Japanese</option>
                        </select>
                    </div>

                    <button type="submit" className={"main-button"}>
                        Translate
                    </button>
                </form>

                {error && (
                    <div className={"error-message"}>
                        <p>{error}</p>
                    </div>
                )}

                <button className={"home"} onClick={handleBackToWelcome}>Home</button>
            </main>

            <LanguageMotionDiv>
                <div className={"japanese-hello hello"}>こんにちは!</div>
            </LanguageMotionDiv>
            <LanguageMotionDiv>
                <div className={"french-hello hello"}>Bonjour!</div>
            </LanguageMotionDiv>
        </>
    )
}

export default App;