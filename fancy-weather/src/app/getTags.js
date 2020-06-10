import { data } from './data';

function getTags(curr) {
  if (
    !(curr instanceof Object)
    || !curr.time
    || !curr.icon
    || typeof curr.time !== 'number'
    || typeof curr.icon !== 'string'
  ) {
    throw new Error('wrong arguments');
  }

  const { time, icon } = curr;

  const date = new Date(time * 1000);
  const month = date.getMonth();
  const hours = date.getHours();

  const weather = data.icon[icon];

  let dayTime;
  if (hours >= 6 && hours <= 9) {
    dayTime = 'morning';
  } else if (hours >= 10 && hours <= 17) {
    dayTime = 'day';
  } else if (hours >= 18 && hours <= 20) {
    dayTime = 'evening';
  } else if (hours >= 21 || hours <= 5) {
    dayTime = 'night';
  }

  let yearTime;
  if (month >= 2 && month <= 4) {
    yearTime = 'spring';
  } else if (month >= 5 && month <= 7) {
    yearTime = 'summer';
  } else if (month >= 8 && month <= 10) {
    yearTime = 'autumn';
  } else if (month >= 11 || month <= 1) {
    yearTime = 'winter';
  }

  return [yearTime, dayTime, weather];
}

export { getTags };
