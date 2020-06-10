function getCurrPos() {
  const options = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 };

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

export { getCurrPos };
