import app from './app.js';
import type {Express} from "express";
import {env} from './config/env.js';

const runServer = (server: Express) => {
    server.listen(env.PORT, () => {
        console.log(`Server is running on port ${env.PORT}`)
        console.log(`Environment: ${env.NODE_ENV}`)
    })
}

runServer(app)