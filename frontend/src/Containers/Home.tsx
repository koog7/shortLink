import axios from 'axios';
import {ChangeEvent, useState} from "react";

const Home = () => {

    const [urlText , setUrlText] = useState('');
    const [shortUrl , setShortUrl] = useState(null)

    const PostData = async () => {
        if(urlText.trim() !== ''){
            const postResponse = await axios.post('http://localhost:8000/links', {url: urlText})
            setShortUrl(postResponse.data.shortUrl)
            setUrlText('')
        }
    }

    const setUrl = (event: ChangeEvent<HTMLInputElement>) => {
        setUrlText(event.target.value);
    };

    return (
        <div>
            <h1 className={'title'}>Shorten your link!</h1>

            <div className="custom_input">
                <svg xmlns="http://www.w3.org/2000/svg" className="svg_icon bi-search" viewBox="0 0 16 16">
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                </svg>
                <input className="input" type="text" value={urlText} placeholder="Enter a link" onChange={setUrl}/>

                <a href="#" className="submit" onClick={PostData}>Submit</a>
            </div>

            {shortUrl ? (
                <div>
                    <p>Your short link :</p>
                    <a target={'_blank'} href={`http://localhost:8000/${shortUrl}`}>http://localhost:8000/{shortUrl}</a>
                </div>

            ) : (<></>)}
        </div>
    );
};

export default Home;