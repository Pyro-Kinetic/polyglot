import express from 'express';
import {translationRoute} from './routes/translation.routes.js'

const app = express();

app.use(express.json());

// Test endpoint
app.get('/', (req, res) => {
    res.json({message: "My API is working"})
})

// Translate endpoint
app.use('/api/translate', translationRoute)

// Catch all endpoint
app.use((req, res) => {
    res.status(404).json({error: 'Endpoint not found'})
})

export default app