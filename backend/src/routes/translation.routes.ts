import express from 'express';
import {translate} from '../controllers/translation.controllers.js'

export const translationRoute = express.Router();

translationRoute.get('/', translate)