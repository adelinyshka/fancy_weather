import {showError} from "./error";
import {getMap} from "./getMaps";
import {createBackground, getDateTime, toDegreesMinSec,makeAnimatedIcons } from './utils';
import {getTags} from "./getTags";
import {getImageUrl} from "./getImgUrl";
import {getForecast} from "./getForecast";
import {getWeather} from "./getWeather";
// import {makeAnimatedIcons} from "./makeAnimatedIcons";
import {getTimezone} from "./getTimezone";
import {data} from "./data";
import {mapPanTo} from "./getMaps";



async function searchHandler(e, map, meas, timeInterval, tags) {

  e.preventDefault();

  const inputSearch = document.querySelector('.input-search');
  const searchValue = inputSearch.value.toString();

  if (!searchValue) {
    showError({ name: 'Empty value', message: 'Please type needed place' });
    return { timeInterval, tags };
  }

  const lang = document.querySelector('.lang-select').value.toLowerCase();
  const coords = await mapPanTo(map, lang);

  if (!coords) {
    return { timeInterval, tags };
  }

  clearInterval(timeInterval);

  const location = { latitude: coords[0], longitude: coords[1] };

  document.querySelector('.latitude').textContent = `${
    data[lang].other[2]
  }: ${toDegreesMinSec(coords[0])}`;

  document.querySelector('.longitude').textContent = `${
    data[lang].other[3]
  }: ${toDegreesMinSec(coords[1])}`;

  const forecastWrapper = document.querySelector('.forecast-wrapper');
  forecastWrapper.innerHTML = '';
  forecastWrapper.classList.add('dual-ring');

  const forecast = await getForecast(location);
  const { currently } = forecast;

  const newTags = getTags(currently);
  const newImageURL = await getImageUrl(newTags);
  createBackground(newImageURL);

  const weatherWrap = await getWeather(forecast, location, lang, meas);

  forecastWrapper.replaceWith(weatherWrap);

  makeAnimatedIcons(forecast);

  const timeZone = await getTimezone(location);

  const dateTime = document.querySelector('.date-time');

  const newInterval = setInterval(() => {
    dateTime.textContent = getDateTime(lang, timeZone.gmtOffset);
  }, 1000);
  dateTime.classList.remove('dots');

  inputSearch.value = '';
  return { newInterval, newTags };
}

export { searchHandler };
