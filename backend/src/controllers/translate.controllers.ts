import {env} from '../config/env.js';
import appData from '../data/app.data.js';
import type {Request, Response} from 'express';
import {client} from '../config/client.openai.js';

export const translateController = async (req: Request, res: Response) => {

    try {
        const {userPrompt, targetLanguage} = req.body

        // const targetLanguage = "French"
        // const userPrompt = "Hi, how's it going? Can you please grab that ball for me?"

        if (!userPrompt || !targetLanguage) return (res.status(400).json({error: "userPrompt and targetLanguage are required"}))

        // Gets translation from OpenAI | Returns it to the frontend
        client.messages.push({
            role: "user",
            content: `Please translate the following words to ${targetLanguage}. Words: ${userPrompt}`
        })

        const response = await client.openai.chat.completions.create({
            model: env.OPENAI_MODEL,
            messages: client.messages,
        })

        const translation = String(response.choices[0]?.message?.content)

        appData.push({
            input: userPrompt,
            output: translation
        })

        res.status(200).json({message: appData})

    } catch (error) {
        console.error(error)
        return res.status(500).json({error: `The cat tripped over the power cord. Our servers can no longer speak. Help!`})
    }
}