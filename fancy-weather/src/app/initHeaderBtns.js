import {refreshHandler} from "./refreshHandler";
import {searchHandler} from "./searchHandler";
import {turnOnVoiceRec} from "./turnOnVoiceRec";

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

function initControls(tags, map, meas, timeInterval) {
  const buttonRefresh = document.querySelector('.button-refresh');
  const buttonSearch = document.querySelector('.button-search');
  const buttonMic = document.querySelector('.button-mic');
  const langSelect = document.querySelector('.lang-select');
  const measureC = document.querySelector('.measure-c');
  const measureF = document.querySelector('.measure-f');
  let newInterval = timeInterval;
  let newTags = tags;

  buttonRefresh.addEventListener('click', () => {
    refreshHandler(newTags);
  });

  buttonSearch.addEventListener('click', e => {
    searchHandler(e, map, meas, newInterval, tags).then(res => {
      newInterval = res.newInterval;
      newTags = res.newTags;
    });
  });

  langSelect.addEventListener('change', setLanguage);

  measureC.addEventListener('click', setDegreeC);

  measureF.addEventListener('click', setDegreeF);

  buttonMic.addEventListener('mousedown', turnOnVoiceRec);
}

export { setDegreeC, setDegreeF, setLanguage, initControls };
