function createMap() {
  const mapWrap = document.createElement('div');
  mapWrap.classList.value = 'map-w ';
//dual-ring for preloader
  //todo
  const map = document.createElement('div');
  map.classList.add('map');
  map.setAttribute('id', 'map');

  const lat = document.createElement('span');
  lat.classList.add('latitude');

  const lon = document.createElement('span');
  lon.classList.add('longitude');

  mapWrap.append(map, lat, lon);
  document.body.append(mapWrap);



  return mapWrap;
}

export {createMap};
