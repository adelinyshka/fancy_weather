function turnOnVoiceRec() {
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

export { turnOnVoiceRec };
