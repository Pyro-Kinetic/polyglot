import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: "My API is working"})
})

app.use((req, res) => {
    res.status(404).json({error: 'Endpoint not found'})
})

export default app