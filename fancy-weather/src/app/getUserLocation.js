import { getCurrPos } from './getCurrPos';
import { showError } from './error';

async function getUserLocation() {
  try {
    const { coords } = await getCurrPos();
    return coords;
  } catch (err) {
    err.name = 'Geolocation Error';
    showError(err);
    throw new Error(`${err.name}(${err.code}): ${err.message}`);
  }
}

export { getUserLocation };
