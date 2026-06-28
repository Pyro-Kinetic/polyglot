import {logo} from "../assets"
import {useNavigate} from "react-router"
import LanguageMotionDiv from "../animate/LanguageMotionDiv.tsx"

function WelcomeScreen() {
    const navigate = useNavigate()

    const handleGetStarted = () => {
        navigate("/app")
    }

    return (
        <main className={"welcome-screen"}>
            <section className={"image-text-container"}>
                <LanguageMotionDiv>
                    <div className={"spanish-hello hello"}>¡Hola!</div>
                </LanguageMotionDiv>
                <LanguageMotionDiv>
                    <div className={"english-hello hello"}>Hello!</div>
                </LanguageMotionDiv>
                <img src={logo} alt="Colorful Parrot" className={"logo-image"}/>
                <LanguageMotionDiv>
                    <div className={"japanese-hello hello"}>こんにちは!</div>
                </LanguageMotionDiv>
                <LanguageMotionDiv>
                    <div className={"french-hello hello"}>Bonjour!</div>
                </LanguageMotionDiv>
            </section>

            <h1 className={"logo-text"}>Polyglot</h1>

            <p className={"body-text"}>
                Speak freely. <br/>
                Understand everywhere.
            </p>

            <button onClick={handleGetStarted}>Get Started</button>
        </main>
    )
}

export default WelcomeScreen;