import express from 'express';

const ShortUrlRouter = express.Router();
ShortUrlRouter.use(express.json());

ShortUrlRouter.get('/', async (req, res) => {

});

export default ShortUrlRouter;