import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UrlSchema = new Schema({
    id: String,
    shortUrl: String,
    url: {
        type: String,
        required: true
    },
});

const ShortUrl = mongoose.model('ShortLink', UrlSchema);
export default ShortUrl;