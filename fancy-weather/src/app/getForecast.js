async function getForecast(location) {
  const api = 'f11901ee631628df00a73fd6b08cef3e';
  const { latitude, longitude } = location;

  const proxyUrl = 'https://evening-basin-27448.herokuapp.com/';
  const url = `https://api.darksky.net/forecast/${api}/${latitude},${longitude}?units=si&lang=en`;

  try {
    return await fetch(proxyUrl + url).then(res => res.json());

  } catch (err) {
    err.name = 'Forecast Error';
    err.message =
      'Problems with herokuapp proxy';
    showError(err);
    throw new Error(`${err.name}(${err.code}): ${err.message}`);
  }
}

export { getForecast };
