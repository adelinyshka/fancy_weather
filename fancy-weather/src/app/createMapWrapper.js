function createMapWrapper() {

  const mapWrapper = document.createElement('div');
  mapWrapper.classList.value = 'map-w dual-ring';

  const map = document.createElement('div');
  map.classList.add('map');
  map.setAttribute('id', 'map');

  mapWrapper.append(map);

  return mapWrapper;
}

export {createMapWrapper};
