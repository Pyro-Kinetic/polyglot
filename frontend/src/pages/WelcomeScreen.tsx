import {useNavigate} from "react-router"
import {logo} from "../assets"

function WelcomeScreen() {
    const navigate = useNavigate()

    const handleGetStarted = () => {
        navigate("/app")
    }

    return (
        <main>
            <section className={"image-text-container"}>
                <div className={"spanish-hello"}>¡Hola!</div>
                <div className={"english-hello"}>Hello!</div>
                <img src={logo} alt="Colorful Parrot" className={"logo-image"}/>
                <div className={"chinese-hello"}>你好!</div>
                <div className={"french-hello"}>Bonjour!</div>
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