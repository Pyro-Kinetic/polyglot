import {type ChangeEvent, useState} from "react";
import {type TranslateRequest, translateRequest} from "./utils/requests.js";

type TranslationMessage = {
    id: string
    userPrompt: string
    translation: string
    isLoading: boolean
    error?: string
}

function App() {
    // States
    const [formData, setFormData] = useState<TranslateRequest>({
        userPrompt: "",
        targetLanguage: "French"
    })

    const [messages, setMessages] = useState<TranslationMessage[]>([])
    const [error, setError] = useState("")

    // Functions
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

    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError("")

        const promptToTranslate = formData.userPrompt.trim()

        if (!promptToTranslate) {
            setError("Please enter text to translate.")
            return
        }

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
            console.log(data.message, "\n")

            const latestTranslation = data.message[data.message.length - 1].output
            console.log(latestTranslation)

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

    // console.log(messages)

    return (
        <main className={"container"}>
            <h1>Polyglot Translator</h1>

            {messages.map((message) => (
                <div key={message.id} className={"message-group"}>
                    <p className={"user-message"}>{message.userPrompt}</p>
                    <p className={"translation-message"}>{message.translation}</p>
                </div>
            ))}

            <form onSubmit={handleSubmit}>
                <div className={"input-text"}>
                    <label htmlFor="userPrompt">Text to translate</label>
                    <br/>
                    <textarea
                        id="userPrompt"
                        name="userPrompt"
                        value={formData.userPrompt}
                        onChange={handleTextChange}
                        rows={6}
                        placeholder="Enter text here..."
                    />
                </div>

                <div className={"input-language"}>
                    <label htmlFor="targetLanguage">Target language</label>
                    <br/>
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
        </main>
    )
}

export default App;