
import {getUserLocation} from "./getUserLocation";
import {createLayout} from "./createLayout";


const lang = localStorage.getItem('lang') || 'ru';
const meas = localStorage.getItem('meas') || 'C';

async function init() {
  const location = await getUserLocation();
  const forecast = await getForecast(location);
  const { currently } = forecast;
  const tags = getTags(currently);
  const imageUrl = await getImageUrl(tags);

  const timeInterval = await createLayout(
    imageUrl,
    forecast,
    location,
    lang,
    meas
  );

  const map = await getMap(location, lang);
}

init();

