import {data} from "./data";
const input = document.querySelector('input-search')

function turnOnVoiceRec() {

  // eslint-disable-next-line
  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  const recognition = new window.SpeechRecognition();
  const lang = document.querySelector('.lang-select').value.toLowerCase();
  let langNavigator;

  switch (lang) {
    case 'en':
      langNavigator = 'en-US';
      break;
    case 'ru':
      langNavigator = 'ru-RU';
      break;
    case 'be':
      langNavigator = 'ru-RU';
      break;
    default:
      break;
  }

  recognition.lang = langNavigator;

  function onRecognizeHandler(e) {


    const result = e.results[e.resultIndex];
    document.querySelector('.input-search').value = result[0].transcript;
    document.querySelector('.button-search').click();

  }

    recognition.onresult = onRecognizeHandler;

    recognition.start();

}


function voiceCommand() {
  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  const recognition = new window.SpeechRecognition();
  recognition.interimResults = false;
  recognition.maxAlternatives = 2;
  recognition.continuous = false;

  recognition.onresult = function (event) {
    for (let i = event.resultIndex, len = event.results.length; i < len; i += 1) {
      let transcript = event.results[i][0].transcript;

      if (event.results[i].isFinal) {
        input.value = transcript;
      } else {
        input.value = transcript;
      }
    }

    if (localStorage.getItem('lang') === 'en') {
      switch (input.value) {
        case 'weather':
          listenTotheWeather();
          break;

        case 'quieter':
          voiceMessage.volume -= 0.2;
          break;

        case 'louder':
          voiceMessage.volume += 0.2;
          break;

        default:
          btnSearch.click();
      }
    }

    if (localStorage.getItem('lang') === 'ru') {
      switch (input.value) {
        case 'погода':
          listenTotheWeather();
          break;

        case 'тише':
          voiceMessage.volume -= 0.2;
          break;

        case 'громче':
          voiceMessage.volume += 0.2;
          break;

        default:
          btnSearch.click();
      }
    }

    if (localStorage.getItem('lang') === 'be') {
      switch (input.value) {
        case 'надвор\'е':
          listenTotheWeather();
          break;

        case 'цішэй':
          voiceMessage.volume -= 0.2;
          break;

        case 'гучней':
          voiceMessage.volume += 0.2;
          break;

        default:
          btnSearch.click();
      }
    }
  };

  btnPlayForecast.addEventListener('click', function () {
    const recognition = new window.SpeechRecognition();

    if (localStorage.getItem('language') === 'en') {
      recognition.lang = 'en';
      voiceMessage.lang = 'en';
    } else if (localStorage.getItem('language') === 'ru') {
      recognition.lang = 'ru';
      voiceMessage.lang = 'ru';
    } else if (localStorage.getItem('language') === 'be') {
      recognition.lang = 'be';
      voiceMessage.lang = 'be';
    }

    recognition.start();
    listenTotheWeather();
    recognition.stop();
  });

  recognition.onaudioend = function () {
    buttonMic.classList.remove('microphone-active');
  };

  const microphoneactivated = function microphoneactivated() {
    buttonMic.addEventListener('click', function () {
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

      if (buttonMic.classList.contains('microphone-active')) {
        buttonMic.classList.remove('microphone-active');
        recognition.stop();
      } else {
        buttonMic.classList.add('microphone-active');
        recognition.start();
      }
    });
  };

  microphoneactivated();
}



export { turnOnVoiceRec };
