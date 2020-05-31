import { showError } from './error';

async function getBeGeo(val) {
  const api = '2702874da5b5454c8455f832239d4b71';

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${val}&key=${api}&pretty=1&no_annotations=1&language=be&limit=1`;
  try {
    const data = await fetch(url).then(res => res.json());
    const { city, country } = data.results[0].components;

    if (!city) return `<h5>${country}</h5>`;


    return `<h5>${city}, </h5><h5>${country}</h5>`;
  } catch (err) {
    err.name = 'getGeocode API Error';
    err.message = `Something went wrong. Do you look for: ${val}?`;
    showError(err);
    throw new Error(`${err.name}(${err.code}): ${err.message}`);
  }
}

export { getBeGeo };
