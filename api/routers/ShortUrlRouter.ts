import express from 'express';
import ShortUrl from "../models/Url";

const ShortUrlRouter = express.Router();
ShortUrlRouter.use(express.json());
ShortUrlRouter.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;
    if(shortUrl){
        const result = await ShortUrl.findOne({shortUrl: shortUrl})
        if(result){
            return res.status(301).send(result.url)
        }
    }else {
        res.status(400).send('Short url not found')
    }

});
ShortUrlRouter.post('/links', async (req, res) => {
    const {url} = req.body;

    if(!url){
        return res.status(400).send('Provide link')
    }

    const charactersAndDigits = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    try{
        const split = charactersAndDigits.split('')
        let shortId = '';

        for(let i = 0; i < 7; i++){
            shortId += split[Math.floor(Math.random() * split.length)]
        }

        const UrlObject = new ShortUrl({
            shortUrl: shortId,
            url: req.body.url
        })
        await UrlObject.save();
        res.send(UrlObject)
    }catch (e){
        console.log(e)
    }
});

export default ShortUrlRouter;