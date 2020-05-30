import {showError} from "./error";

async function getTimezone({ latitude, longitude }) {
  const api = 'NTS4MMSFL3DO';
  const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${api}&format=json&by=position&lat=${latitude}&lng=${longitude}`;

  try {
    return await fetch(url).then(res => res.json());

  } catch (err) {
    err.name = 'Timezone API Error';
    err.message = 'api.timezonedb.com request finished with error';
    showError(err);
    throw new Error(`${err.name}(${err.code}): ${err.message}`);
  }

}

export { getTimezone };
