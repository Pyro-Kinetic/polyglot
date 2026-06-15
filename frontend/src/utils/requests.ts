import {env} from "../config/endpoints.js";

// Types
export type TranslateRequest = {
    userPrompt: string
    targetLanguage: string
}

type AppDataItem = {
    input: string
    output: string
}

export type TranslateResponse = {
    message: AppDataItem[]
}

// Functions
export const translateRequest = async (payload: TranslateRequest): Promise<TranslateResponse> => {
    const response = await fetch(env.TRANSLATE, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    if (!response.ok) {
        throw new Error("Failed to translate text")
    }

    return response.json()
}
