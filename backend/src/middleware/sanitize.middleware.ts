import {NextFunction, Request, Response} from "express";

// types
type SanitizedObj = {
    [key: string]: unknown
}

// Function converts HTML into text
const HtmlToText = (value: string) => {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
}

// Function sanitize strings, arrays, and objects
const sanitize = (value: unknown): unknown => {
    if (typeof value === "string") return HtmlToText(value)

    if (Array.isArray(value)) return value.map(sanitize)

    if (value !== null && typeof value === "object") {
        const sanitizedObj: SanitizedObj = {}

        for (const [key, val] of Object.entries(value)) {
            sanitizedObj[key] = sanitize(val)
        }

        return sanitizedObj
    }

    return false
}

export const sanitizeMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.body) return (res.status(400).json({error: "userPrompt and targetLanguage are required"}))

        const {userPrompt, targetLanguage} = req.body

        if ((userPrompt.length > 150) || (targetLanguage.length > 35))
            return (res.status(400).json({error: "Psst... Your message is too long"}))

        if (!sanitize(userPrompt) || !sanitize(targetLanguage))
            return (res.status(400).json({
                error: "You have violated our code of conduct. Hacking your system..."
            }))

        req.body = {
            userPrompt: sanitize(userPrompt),
            targetLanguage: sanitize(targetLanguage)
        }

        next();

    } catch (error) {
        console.error(error)
        return (res.status(422).json({error: "Validation failed. The cat ate your data."}))
    }
}