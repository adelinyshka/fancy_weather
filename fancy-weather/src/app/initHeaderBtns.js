import { refreshHandler } from './refreshHandler';
import { searchHandler } from './searchHandler';
import { turnOnVoiceRec } from './turnOnVoiceRec';
import { data } from './data';

function setDegreeC() {
  const meas = 'C';
  localStorage.setItem('meas', meas);
  document.location.reload();
}

function setDegreeF() {
  const meas = 'F';
  localStorage.setItem('meas', meas);
  document.location.reload();
}

function setLanguage() {
  const lang = document.querySelector('.lang-select').value.toLowerCase();
  localStorage.setItem('lang', lang);
  document.location.reload();
}

const voiceMessage = new SpeechSynthesisUtterance();
voiceMessage.volume = 0.5;

function listenTotheWeather() {

  const descriptionCard = document.querySelector('.forecast-short').innerText;
  const feelsLikeCard = document.querySelector('.forecast-detail__feels').innerText;
  const temp = document.querySelector('.forecast-current__temp').innerText.split(' ')[0];
  const windCard = document.querySelector('.forecast-detail__wind').innerText;
  const humidityCard = document.querySelector('.forecast-detail__humidity').innerText;
  voiceMessage.rate = 1;
  voiceMessage.pitch = 1;
  voiceMessage.text = ' '
    .concat(data.sound[localStorage.getItem('lang')], ' ')
    .concat(temp, ' ')
    .concat(descriptionCard, ',\n  ')
    .concat(feelsLikeCard, ' ,\n')
    .concat(windCard, ' ,\n')
    .concat(humidityCard, ' ,\n');
  speechSynthesis.speak(voiceMessage);
}


function initControls(tags, map, meas, timeInterval) {
  const buttonRefresh = document.querySelector('.button-refresh');
  const buttonSearch = document.querySelector('.button-search');
  const buttonMic = document.querySelector('.button-mic');
  const langSelect = document.querySelector('.lang-select');
  const measureC = document.querySelector('.measure-c');
  const measureF = document.querySelector('.measure-f');
  let newInterval = timeInterval;
  let newTags = tags;
  const btnPlayForecast = document.querySelector('.play-forecast');


  buttonRefresh.addEventListener('click', () => {
    refreshHandler(newTags);
  });

  buttonSearch.addEventListener('click', (e) => {
    searchHandler(e, map, meas, newInterval, tags).then((res) => {
      newInterval = res.newInterval;
      newTags = res.newTags;
    });
  });


  btnPlayForecast.addEventListener('click', (e) => {
    e.preventDefault();
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

    const recognition = new window.SpeechRecognition();

    if (localStorage.getItem('lang') === 'en') {
      recognition.lang = 'en';
      voiceMessage.lang = 'en';
    } else if (localStorage.getItem('lang') === 'ru') {
      recognition.lang = 'ru';
      voiceMessage.lang = 'ru';
    } else if (localStorage.getItem('lang') === 'be') {
      recognition.lang = 'be';
      voiceMessage.lang = 'be';
    }

    recognition.start();
    listenTotheWeather();
    recognition.stop();
  });

  langSelect.addEventListener('change', setLanguage);

  measureC.addEventListener('click', setDegreeC);

  measureF.addEventListener('click', setDegreeF);

  buttonMic.addEventListener('mousedown', turnOnVoiceRec);
}

export {
  setDegreeC, setDegreeF, setLanguage, initControls, listenTotheWeather,
};
