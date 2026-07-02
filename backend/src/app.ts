import cors from "cors";
import express from 'express';
import {env} from "./config/env.js";
import {translateRoute} from './routes/translate.routes.js';

const app = express();

const allowedOrigins = env.CORS_ORIGINS?.split(",").map(origin => origin.trim()) || [];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true)
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true)
        }

        return callback(null, false)
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}))

app.use(express.json());

// Sanity check
app.get('/health', (req, res) => {
    res.status(200).json({message: "My API is working"})
})

app.use('/translate', translateRoute)

app.use((req, res) => {
    res.status(404).json({error: 'Endpoint not found'})
})

export default app