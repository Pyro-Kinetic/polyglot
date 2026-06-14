import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT);
const NODE_ENV = process.env.NODE_ENV;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_URL = process.env.OPENAI_URL;
const OPENAI_MODEL = String(process.env.OPENAI_MODEL);
const CORS_ORIGINS = process.env.CORS_ORIGINS;

export const env = {
    PORT,
    NODE_ENV,
    OPENAI_API_KEY,
    OPENAI_URL,
    OPENAI_MODEL,
    CORS_ORIGINS
}
