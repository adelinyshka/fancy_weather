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

async function init() {

  const lang = (function () {
    if(localStorage['lang']){
      return localStorage.getItem('lang')
    }else {
       localStorage.setItem('lang','ru')
      return localStorage.getItem('lang')
    }
  })();

  const meas = (function () {


      if(localStorage['meas']){
        return localStorage.getItem('meas')
      }else {
         localStorage.setItem('meas','C')
        return localStorage.getItem('meas')
      }
  })();

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
