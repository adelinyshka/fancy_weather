function createMapWrapper() {

  const mapWrapper = document.createElement('div');
  mapWrapper.classList.value = 'map-w dual-ring';

  const map = document.createElement('div');
  map.classList.add('map');
  map.setAttribute('id', 'map');

  const latitude = document.createElement('span');
  latitude.classList.add('latitude');

  const longitude = document.createElement('span');
  longitude.classList.add('longitude');

  mapWrapper.append(map, latitude, longitude);

  return mapWrapper;
}

export {createMapWrapper};
