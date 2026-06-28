import rateLimit from "express-rate-limit"

export const limiterMiddleware = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: "Slow down cowboy! You are sending messages too quickly. Please wait and try again."
    },
})