import { getUserLocation } from './getUserLocation';
import { getForecast } from './getForecast';
import { getTags } from './getTags';
import { getImageUrl } from './getImgUrl';
import { createLayout } from './createLayout';
import { getMap } from './getMaps';
import {
  initControls,
} from './initHeaderBtns';
import { startPreloader } from './preloader';

const lang = localStorage.getItem('lang') || 'ru';
const meas = localStorage.getItem('meas') || 'C';

async function init() {
  const location = await getUserLocation();
  const forecast = await getForecast(location);
  const { currently } = forecast;
  const tags = getTags(currently);
  const imageUrl = await getImageUrl(tags);

  const timeInterval = await createLayout(
    imageUrl,
    forecast,
    location,
    lang,
    meas,
  );

  const map = await getMap(location, lang);
  initControls(tags, map, meas, timeInterval);
  const preloader = document.querySelector('.cssload-wrap');
  preloader.classList.add('d-none');
}

startPreloader();


init();
