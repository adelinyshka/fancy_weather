import {showError} from "./error";
import ymaps from 'ymaps';
import { toDegreesMinSec } from "./utils";
import {data} from "./data";

async function getMaps(lang) {
  let apiLang;

  switch (lang) {
    case 'en':
      apiLang = 'en_US';
      break;
    case 'ru':
      apiLang = 'ru_RU';
      break;
    case 'be':
      apiLang = 'en_US';
      break;
    default:
      apiLang = 'en_US';
      break;
  }

  const api= 'c31788f1-0210-444b-803a-302a4f4cfa21';

  const url = `https://api-maps.yandex.ru/2.1/?apikey=${api}&lang=${apiLang}`;

  try {
    return await ymaps.load(url);

  } catch (err) {
    err.name = 'getMaps API Error';
    err.message = 'its error from yandex';
    showError(err);
    throw new Error(`${err.name}(${err.code}): ${err.message}`);
  }
}

async function getMap(loc, lang) {
  const { latitude, longitude } = loc;
  try {
    const maps = await getMaps(lang);

    document.querySelector('.map-w').classList.value = 'map-wrapper';

    document.querySelector('.latitude').textContent = `${
      data[lang].other[2]
    }: ${toDegreesMinSec(latitude)}`;

    document.querySelector('.longitude').textContent = `${
      data[lang].other[3]
    }: ${toDegreesMinSec(longitude)}`;

    const map = new maps.Map('map', {
      center: [latitude, longitude],
      zoom: 8,
    }, {
      autoFitToViewport: 'always',
      searchControlProvider: 'yandex#search'
    });
    $('#toggler').click(toggle);
    var myMap,
      bigMap = false;
    function toggle () {
      bigMap = !bigMap;
      if (bigMap) {
        $('#map').removeClass('smallMap');
      } else {
        $('#map').addClass('smallMap');
      }
      if ($('#checkbox').prop('checked')) {
        myMap.container.fitToViewport();
      }
    }

    return map;
  } catch (err) {
    err.name = 'getMap API Error';
    err.message = 'yandex error';
    showError(err);
    throw new Error(`${err.name}(${err.code}): ${err.message}`);
  }
}

async function getGeoPoints(val, lang) {
  try {
    const maps = await getMaps(lang);
    const myGeocode = await maps.geocode(val);

    return myGeocode;
  } catch (err) {
    err.name = 'getGeocode API Error';
    err.message = `just yandex.value: ${val},lang: ${lang},message: ${err.message}`;
    showError(err);
    throw new Error(`${err.name}(${err.code}): ${err.message}`);
  }
}


async function mapPanTo(map, lang) {

  const inputEl = document.querySelector('.input-search');
  const searchValue = inputEl.value.toString();

  try {
    const geocode = await getGeoPoints(searchValue, lang);

    const coords = geocode.geoObjects.get(0).geometry.getCoordinates();

    map.panTo(coords, { duration: 2000 });

    return coords;
  } catch (err) {
    err.name = 'getGeocode API Error';
    err.message = `interesting place: "${searchValue}". try again`;
    showError(err);
    inputEl.value = '';

    return '';
  }
}

export {getMaps,getMap,mapPanTo,getGeoPoints};
