import { data } from './data';
import { getBeGeo } from './getBeGeo';
import { getGeoPoints } from './getMaps';
import { celsiumToFarenheit } from './utils';

async function getWeather(
  forecastData,
  location,
  lang,
  degree,
) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const arrayOfLanguages = data[lang];
  const { currently, daily } = forecastData;

  let currentTemp;
  let apparentTemp;

  switch (degree) {
    case 'C':
      currentTemp = Math.round(currently.temperature);
      apparentTemp = Math.round(Math.round(currently.apparentTemperature));
      break;
    case 'F':
      currentTemp = celsiumToFarenheit(currently.temperature);
      apparentTemp = celsiumToFarenheit(currently.apparentTemperature);
      break;
    default:
      break;
  }

  const { latitude, longitude } = location;
  let locality;
  if (lang !== 'be') {
    const geo = await getGeoPoints([latitude, longitude], lang);
    locality = geo.geoObjects.get(0).properties.getAll().balloonContentBody;
  } else {
    locality = await getBeGeo(`${latitude},${longitude}`);
  }

  const forecastWrapper = document.createElement('div');
  forecastWrapper.classList.add('forecast-wrapper');

  const locationEl = document.createElement('div');
  locationEl.classList.add('location');
  locationEl.innerHTML = locality;

  const dateTime = document.createElement('div');
  dateTime.classList.value = 'date-time';

  const forecastShort = document.createElement('div');
  forecastShort.classList.add('forecast-short');
  forecastShort.textContent = arrayOfLanguages.weather[currently.icon];

  const mainIcon = document.createElement('canvas');
  mainIcon.classList.add('icon-main');
  mainIcon.setAttribute('id', 'icon-main');
  mainIcon.setAttribute('width', '70');
  mainIcon.setAttribute('height', '70');

  const forecastCurrent = document.createElement('div');
  forecastCurrent.classList.add('forecast-current');

  const tempSpan = document.createElement('span');
  tempSpan.classList.add('forecast-current__temp');
  tempSpan.textContent = `${currentTemp}°`;

  forecastCurrent.append(tempSpan, mainIcon);

  const feelsSpan = document.createElement('span');
  feelsSpan.classList.add('forecast-detail__feels');
  feelsSpan.textContent = `${arrayOfLanguages.other[4]} ${apparentTemp}°`;

  const windSpan = document.createElement('span');
  windSpan.classList.add('forecast-detail__wind');
  windSpan.textContent = `${arrayOfLanguages.other[5]} ${Math.round(
    currently.windSpeed,
  )}${arrayOfLanguages.other[6]}`;

  const humiditySpan = document.createElement('span');
  humiditySpan.classList.add('forecast-detail__humidity');
  humiditySpan.textContent = `${arrayOfLanguages.other[7]} ${Math.round(
    currently.humidity * 100,
  )}%`;

  const forecastDetail = document.createElement('div');
  forecastDetail.classList.add('forecast-detail');
  forecastDetail.append(feelsSpan, windSpan, humiditySpan);

  const { week } = data[lang];

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 3; i += 1) {
    const el = document.createElement('div');
    el.classList.add('forecast-daily__day');

    let day = dayOfWeek + i + 1;
    let temperatureHigh;
    let temperatureLow;

    if (day > 6) {
      day -= 7;
    }

    switch (degree) {
      case 'C':
        temperatureHigh = Math.round(daily.data[i].temperatureHigh);
        temperatureLow = Math.round(daily.data[i].temperatureLow);
        break;
      case 'F':
        temperatureHigh = celsiumToFarenheit(daily.data[i].temperatureHigh);
        temperatureLow = celsiumToFarenheit(daily.data[i].temperatureLow);
        break;
      default:
        break;
    }

    const spanDay = document.createElement('p');
    spanDay.classList.add('forecast-daily__week-day');
    spanDay.textContent = week[day];

    const spanTempHight = document.createElement('span');
    spanTempHight.classList.add('forecast-daily__temp-hight');
    spanTempHight.textContent = `max ${temperatureHigh}°`;

    const spanTempLow = document.createElement('span');
    spanTempLow.classList.add('forecast-daily__temp-low');
    spanTempLow.textContent = `min ${temperatureLow}°`;

    const icon = document.createElement('canvas');
    icon.classList.add(`icon-daily-${i}`);
    icon.setAttribute('width', '54');
    icon.setAttribute('height', '54');

    el.append(spanDay, icon, spanTempHight, spanTempLow);
    fragment.appendChild(el);
  }

  const forecastDaily = document.createElement('div');
  forecastDaily.classList.add('forecast-daily');

  forecastDaily.appendChild(fragment);

  forecastWrapper.append(
    locationEl,
    dateTime,

    forecastCurrent,
    forecastShort,
    forecastDetail,
    forecastDaily,
  );

  return forecastWrapper;
}

export { getWeather };
