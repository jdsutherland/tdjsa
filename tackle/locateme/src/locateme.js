const createURL = function(latitude, longitude) {
  if (latitude && longitude) {
    return `http://maps.google.com?q=${latitude},${longitude}`;
  }
  return '';
};

const setLocation = function(window, url) {
  window.location = url;
};

const locate = function() {
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
};

const onSuccess = function() {};
const onError = function() {};
