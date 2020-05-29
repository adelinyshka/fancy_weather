import {createForm} from "./createForm";
import {createMap} from "./createMap";
import {getUserLocation} from "./getUserLocation";
import {getMapOnload} from "./ymap";

const lang = localStorage.getItem('lang') || 'ru';
const meas = localStorage.getItem('meas') || 'C';

async function init() {
  await createForm();
  await createMap();
  const location = await getUserLocation();
  getMapOnload(location.latitude,location.longitude);
}

window.onload =()=> {
  console.log('load')
  init();
};

