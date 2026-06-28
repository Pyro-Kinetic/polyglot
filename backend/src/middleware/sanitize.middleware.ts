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

    return value
}

export const sanitizeMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.body) return (res.status(400).json({error: "userPrompt and targetLanguage are required"}))

        req.body = sanitize(req.body)

        // console.log("checked")
        next();

    } catch (error) {
        console.error(error)
        return (res.status(422).json({error: "The cat ate your data"}))
    }
}


