function getCurrPos() {
  const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

export {getCurrPos};
