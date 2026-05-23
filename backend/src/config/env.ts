import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT);
const NODE_ENV = process.env.NODE_ENV;

export const env = {
    PORT,
    NODE_ENV
}
