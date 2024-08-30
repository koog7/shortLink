import express from 'express';
import ShortUrl from "../models/Url";

const ShortUrlsRouter = express.Router();
ShortUrlsRouter.use(express.json());

ShortUrlsRouter.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;
    if(shortUrl){
        const result = await ShortUrl.findOne({shortUrl: shortUrl})
        if(result){
            return res.status(301).redirect(result.url)
        }
    }else {
        res.status(404).send('Short url not found')
    }

});
ShortUrlsRouter.post('/links', async (req, res) => {
    const {url} = req.body;

    if(!url){
        return res.status(400).send('Provide link')
    }

    const charactersAndDigits = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

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

export default ShortUrlsRouter;