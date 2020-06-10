import { createHeader } from './createHeader';
import { getWeather } from './getWeather';
import { createMapWrapper } from './createMapWrapper';
import { getDateTime, createBackground, makeAnimatedIcons } from './utils';


async function createLayout(url, forecast, location, lang, degree) {
  const { body } = document;

  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  const weatherWrapper = await getWeather(forecast, location, lang, degree);
  wrapper.append(createHeader(lang, degree), weatherWrapper, createMapWrapper());


  body.innerHTML = '';
  body.appendChild(wrapper);

  makeAnimatedIcons(forecast);
  createBackground(url);

  const dateTime = document.querySelector('.date-time');
  const timeInterval = setInterval(() => {
    dateTime.textContent = getDateTime(lang);
  }, 1000);
  dateTime.classList.remove('dots');

  return timeInterval;
}


export { createLayout };
