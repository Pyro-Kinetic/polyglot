import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router'
import WelcomeScreen from "./pages/WelcomeScreen.tsx"
import App from './pages/App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<WelcomeScreen/>}/>
                <Route path={"/app"} element={<App/>}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
