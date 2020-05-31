import {data} from "./data";

function turnOnVoiceRec() {

  // eslint-disable-next-line
  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  const recognition = new window.SpeechRecognition();
  const lang = document.querySelector('.lang-select').value.toLowerCase();
  let langFormatted;

  switch (lang) {
    case 'en':
      langFormatted = 'en-US';
      break;
    case 'ru':
      langFormatted = 'ru-RU';
      break;
    case 'be':
      langFormatted = 'ru-RU';
      break;
    default:
      break;
  }

  recognition.lang = langFormatted;

  function onRecognizeHandler(e) {
    const result = e.results[e.resultIndex];
    document.querySelector('.input-search').value = result[0].transcript;
    document.querySelector('.button-search').click();
  }
  recognition.onresult = onRecognizeHandler;

  recognition.start();

}



export { turnOnVoiceRec };
