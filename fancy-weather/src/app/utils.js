import {data} from "./data";

function celsiumToFarenheit(val) {
  if (!val || typeof val !== 'number') {
    throw new Error('invalid arguments');
  }
  return Math.round((val * 9) / 5 + 32);
}

function createBackground(url) {
  const iconRefresh = document.querySelector('.icon-refresh');

  document.body.style.background = `url("${url}") center / cover no-repeat`;
  iconRefresh.classList.remove('icon-refresh--spin');
}

function getDateTime(lang, gmtOffset = 10800) {
  if (typeof gmtOffset !== 'number' || typeof lang !== 'string') {
    throw new Error('invalid arguments');
  }
  const offset = (gmtOffset - 10800) * 1000;
  const langArr = data[lang];

  const fakeDate = new Date();
  const ms = fakeDate.valueOf() + offset;
  const date = new Date(ms);

  const weekDay = langArr.short[date.getDay()];
  const day = date.getDate();
  const month = langArr.month[date.getMonth()];

  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  h = h < 10 ? `0${h}` : h;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;

  const dateTime = `${weekDay} ${day} ${month}        ${h}:${m}:${s}`;

  return dateTime;
}

function toDegreesMinSec(input_degrees) {
  if (typeof input_degrees !== 'number') {
    throw new Error('wrong arguments');
  }

  let direction = '';
  if (input_degrees < 0) {
    direction = '-';
  }

  let degrees = parseInt(input_degrees, 10);
  const minFloat = Math.abs((input_degrees - degrees) * 60);
  let minutes = Math.floor(minFloat);
  const secFloat = (minFloat - minutes) * 60;
  let seconds = Math.round(secFloat);
  degrees = Math.abs(degrees);

  if (seconds === 60) {
    minutes += 1;
    seconds = 0;
  }
  if (minutes === 60) {
    degrees += 1;
    minutes = 0;
  }

  return `${direction}${degrees}° ${minutes}' ${seconds}"`;
}



const Skycons = require('../../node_modules/skycons')(window);
let skycons = new Skycons({"color": "#28a745"});
function makeAnimatedIcons(forecast) {

  skycons.add('icon-main', forecast.currently.icon);
  skycons.add(
    document.querySelector('.icon-daily-0'),
    forecast.daily.data[0].icon
  );
  skycons.add(
    document.querySelector('.icon-daily-1'),
    forecast.daily.data[1].icon
  );
  skycons.add(
    document.querySelector('.icon-daily-2'),
    forecast.daily.data[2].icon
  );
  skycons.play();

}

function getRandomNumber(num) {
  if (!num || typeof num !== 'number' || num < 0) {
    throw new Error('invalid arguments');
  }

  return Math.floor(Math.random() * num);
}


export {getRandomNumber,celsiumToFarenheit,createBackground,getDateTime,toDegreesMinSec,makeAnimatedIcons};
