import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from 'body-parser';

import userRouter from './routes/user.routes.js'
import parkingLevelRouter from './routes/parkingLevel.routes.js'
import parkingSpaceRouter from './routes/parkingSpace.routes.js'
import parkingTransactionRouter from './routes/parkingTransaction.routes.js'
import { errorHandler } from "./utils/errorHandler.js";


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))
app.use(cookieParser())


app.use("/api/v1/users", userRouter)
app.use("/api/v1/parking-levels", parkingLevelRouter);
app.use("/api/v1/parking-spaces", parkingSpaceRouter);
app.use("/api/v1/parking-transactions", parkingTransactionRouter);

app.use(errorHandler);

// http://localhost:8000/api/v1/users/register

export { app }