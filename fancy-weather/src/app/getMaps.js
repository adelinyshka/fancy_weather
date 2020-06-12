import ymaps from 'ymaps';
import { showError } from './error';
import { toDegreesMinSec } from './utils';
import { data } from './data';

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

  const api = 'c31788f1-0210-444b-803a-302a4f4cfa21';

  const url = `https://api-maps.yandex.ru/2.1/?apikey=${api}&lang=${apiLang}`;

  try {
    return await ymaps.load(url);
  } catch (err) {
    err.name = 'Yandex Maps API Error in getMaps';
    err.message = 'Its error from yandex';
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
      controls: [],

    }, {
      autoFitToViewport: 'always',
      searchControlProvider: 'yandex#search',
    });

    const myGeoObject = new maps.GeoObject({
      geometry: {
        type: 'Point', // тип геометрии - точка
        coordinates: [latitude, longitude], // координаты точки
      },
    });

    map.geoObjects.add(myGeoObject);

    return map;
  } catch (err) {
    err.name = 'Yandex Maps API Error in getMap';
    err.message = 'Yandex error';
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
    err.name = 'Yandex Map API Error in getGeoPoints';
    err.message = `Ya trouble: ${val},lang: ${lang},message: ${err.message}`;
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
    err.name = 'Yandex Map API Error in mapPanTo';
    err.message = `Not find: "${searchValue}". Try again, please`;
    showError(err);
    inputEl.value = '';

    return '';
  }
}

export {
  getMaps, getMap, mapPanTo, getGeoPoints,
};
