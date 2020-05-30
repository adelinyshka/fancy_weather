import {createHeader} from "./createHeader";
import {createMapWrapper} from "./createMapWrapper";



async function createLayout(url, forecast, location, lang, degree) {
  const { body } = document;

  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  const weatherWrapper = await getWeather(forecast, location, lang, degree);
  wrapper.append(createHeader(lang, degree), weatherWrapper, createMapWrapper());

  body.innerHTML = '';
  body.appendChild(wrapper);

}

export { createLayout };
