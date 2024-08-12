import dotenv from "dotenv"

import connectDB from "./db/index.js";
import createDefaultData from './utils/setUpDatabase.js'

import {app} from './app.js'
dotenv.config({
    path: './.env'
})


connectDB()
.then(() => {
    return createDefaultData();
})
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT? process.env.PORT: 8000}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})