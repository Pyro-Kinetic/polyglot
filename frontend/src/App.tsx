import {type ChangeEvent, useState} from "react";
import {type TranslateRequest, translateRequest, type TranslateResponse} from "./utils/requests.js";

function App() {
    // States
    const [formData, setFormData] = useState<TranslateRequest>({
        userPrompt: "",
        targetLanguage: "French"
    })

    const [translationResponse, setTranslationResponse] = useState<TranslateResponse | null>(null)
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
        setTranslationResponse(null)

        try {
            const data = await translateRequest(formData)
            setTranslationResponse(data)

        } catch (error) {
            if (error instanceof Error) setError(error.message)
            else setError("An unknown error occurred.")
        }

    }

    return (
        <main className={"container"}>
            <h1>Polyglot Translator</h1>

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


            <div className={"translation-response"}>
                <h2>Backend Response:</h2>
                <p>{translationResponse?.message[0].output}</p>
            </div>


            {error && (
                <div className={"error-message"}>
                    <p>{error}</p>
                </div>
            )}
        </main>
    )
}

export default App;