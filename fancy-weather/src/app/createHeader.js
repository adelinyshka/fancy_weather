import {data} from './data';

function createHeader(lang = 'en', degree = 'C') {
  const [search, placeholder] = data[lang].other;

  const formWrapper = document.createElement('form');
  formWrapper.classList.add('form-wrapper');

  const changeBgBtn = document.createElement('button');
  changeBgBtn.setAttribute('type', 'button');
  changeBgBtn.setAttribute('title', 'refresh background');
  changeBgBtn.classList.value = 'btn btn-success button-refresh';

  const refreshIcon = document.createElement('i');
  refreshIcon.classList.value = 'fas fa-sync-alt icon-refresh';
  changeBgBtn.appendChild(refreshIcon);

  const selectLang = document.createElement('select');
  selectLang.classList.value = 'form-control lang-select';

  const en = document.createElement('option');
  en.classList.add('lang-en');
  en.textContent = 'En';

  const ru = document.createElement('option');
  ru.classList.add('lang-ru');
  ru.textContent = 'Ru';

  const be = document.createElement('option');
  be.classList.add('lang-be');
  be.textContent = 'Be';

  selectLang.append(en, ru, be);

  const measureC = document.createElement('button');
  measureC.setAttribute('type', 'button');
  measureC.classList.value = 'btn btn-success measure-c';
  measureC.textContent = '°C';

  const measureF = document.createElement('button');
  measureF.setAttribute('type', 'button');
  measureF.classList.value = 'btn btn-success measure-f';
  measureF.textContent = '°F';

  const btnPlayForecast = document.createElement('button');
  btnPlayForecast.setAttribute('type', 'button');
  btnPlayForecast.classList.value = 'btn btn-success play-forecast';
  btnPlayForecast.innerHTML = '<i class="fas fa-play-circle fa-w-16"></i>';

  const elMic = document.createElement('i');
  elMic.classList.value = 'fas fa-microphone';

  const micBtn = document.createElement('button');
  micBtn.classList.value = 'button-mic';
  micBtn.setAttribute('type', 'button');
  micBtn.appendChild(elMic);

  const searchBtn = document.createElement('button');
  searchBtn.classList.value = 'btn btn-success button-search';
  searchBtn.textContent = search;

  const inputGroupAppend = document.createElement('div');
  inputGroupAppend.classList.add('input-group-append');
  inputGroupAppend.append(micBtn, searchBtn);

  const inputText = document.createElement('input');
  inputText.classList.value = 'form-control input-search';
  inputText.setAttribute('type', 'text');
  inputText.setAttribute('placeholder', placeholder);

  const inputGroup = document.createElement('div');
  inputGroup.classList.value = 'input-group input-wrapper';

  const controlWrapper = document.createElement('div');
  controlWrapper.classList.add('control-wrapper');

  switch (lang) {
    case 'en':
      en.setAttribute('selected', true);
      break;
    case 'ru':
      ru.setAttribute('selected', true);
      break;
    case 'be':
      be.setAttribute('selected', true);
      break;
    default:
      break;
  }

  switch (degree) {
    case 'C':
      measureC.classList.add('selected');
      break;
    case 'F':
      measureF.classList.add('selected');
      break;
    default:
      break;
  }



  const latitude = document.createElement('span');
  latitude.classList.add('latitude');

  const longitude = document.createElement('span');
  longitude.classList.add('longitude');

  const blockLL = document.querySelector('div');
  blockLL.classList.add('blockLL');
  blockLL.append(latitude,longitude);

  controlWrapper.append(changeBgBtn, selectLang, measureC, measureF,btnPlayForecast);
  inputGroup.append(inputText, inputGroupAppend);
  formWrapper.append(controlWrapper, inputGroup);
  formWrapper.append(blockLL);

  return formWrapper;
}

export { createHeader };
