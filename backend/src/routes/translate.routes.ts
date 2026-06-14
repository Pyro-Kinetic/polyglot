import express from 'express';
import {translateController} from '../controllers/translate.controllers.js'

export const translateRoute = express.Router();

translateRoute.post('/', translateController)