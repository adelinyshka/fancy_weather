import {getCurrPos} from "./getCurrPos";

async function getUserLocation() {
  try {
    const { coords } = await getCurrPos();
    return coords;
  } catch (err) {
    err.name = 'Geolocation Error';
    renderError(err);
    throw new Error(`${err.name}(${err.code}): ${err.message}`);
  }
}

export {getUserLocation};
