import './index.css';
import type {ReactNode} from "react";
import {StrictMode} from "react";
import App from './pages/App.tsx';
import {createRoot} from "react-dom/client";
import {AnimatePresence, motion} from "motion/react";
import WelcomeScreen from "./pages/WelcomeScreen.tsx";
import {BrowserRouter, Route, Routes, useLocation} from 'react-router';

type PageTransitionProps = {
    children: ReactNode
}

function PageTransition({children}: PageTransitionProps) {
    return (
        <motion.main
            initial={{opacity: 0, x: 50}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: -50}}
            transition={{duration: 0.35, ease: "easeOut"}}
        >
            {children}
        </motion.main>
    )
}

function AnimatedRoutes() {
    const location = useLocation()

    return (
        <AnimatePresence mode={"wait"}>
            <Routes location={location} key={location.pathname}>
                <Route path={"/"} element={<PageTransition><WelcomeScreen/></PageTransition>}/>
                <Route path={"/app"} element={<PageTransition><App/></PageTransition>}/>
            </Routes>
        </AnimatePresence>
    )
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <AnimatedRoutes/>
        </BrowserRouter>
    </StrictMode>,
)
