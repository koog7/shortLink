import express from 'express';
import cors from 'cors';
import ShortUrlRouter from "./routers/ShortUrlRouter";

const app = express();
const port = 8000;

app.use(cors())
app.use(express.json())
app.use('/', ShortUrlRouter)

app.listen(port, () => {
    console.log('Server starter : http://127.0.0.1:' + port);
});