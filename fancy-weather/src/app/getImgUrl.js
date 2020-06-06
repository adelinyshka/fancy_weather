import {getRandomNumber} from './utils';
import { errBtnHandler, showError } from "./error";

async function getImageUrl(tags) {
  const [season, daytime, forecast] = tags;

  const api = 'a895c1a6ff42551c1897473be397d91e';
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api}&tags='${season},${daytime},${forecast}'&tag_mode=all&sort=relevance&per_page=50&format=json&nojsoncallback=1`;

  try {
    const datas = await fetch(url).then(res => res.json());
    const num = getRandomNumber(datas.photos.photo.length);
    const photo = datas.photos.photo[num];

    const imageURL = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
    console.log('API Request: season: ' + season + ', daytime: ' + daytime + ', forecast:' +
      ' ' + forecast);

    return imageURL;

  } catch (err) {
    err.name = 'Image API Error';
    err.message = 'www.flickr.com unavailable now';
    showError(err);
    throw new Error(`${err.name}(${err.code}): ${err.message}`);
  }
}

export { getImageUrl };
