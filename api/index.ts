import express from 'express';
import cors from 'cors';
import ShortUrlRouter from "./routers/ShortUrlRouter";
import * as mongoose from "mongoose";


const app = express();
const port = 8000;

app.use(cors())
app.use(express.json())
app.use('/', ShortUrlRouter)

const run = async () => {
    
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/shortlink');
        console.log('Connected to MongoDB');
    }catch (e) {
        console.error('Error connecting to MongoDB:', e);
    }

    app.listen(port, () => {
        console.log('We are live on ' + port);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run()