import express from 'express';
import {sanitizeMiddleware} from "../middleware/sanitize.middleware.js";
import {translateController} from '../controllers/translate.controllers.js'
import {limiterMiddleware} from "../middleware/rateLimiter.middleware.js";

export const translateRoute = express.Router();

translateRoute.post('/', sanitizeMiddleware, limiterMiddleware, translateController)