const createURL = function(latitude, longitude) {
  if (latitude && longitude) {
    return `http://maps.google.com?q=${latitude},${longitude}`;
  }
  return '';
};
