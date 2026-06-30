import {env} from "../config/endpoints.config.ts";

// Types
export type TranslateRequest = {
    userPrompt: string
    targetLanguage: string
}

type AppDataItem = {
    input: string
    output: string
}

type TranslateResponse = {
    message: AppDataItem[]
}

type ErrorMessage = {
    message?: string
    error?: string
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
        const errorData = await response.json().catch(() => null) as ErrorMessage | null
        const errorMessage = errorData?.message || errorData?.error || "Failed to translate text"

        throw new Error(errorMessage)
    }

    return response.json()
}
