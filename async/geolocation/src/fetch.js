const fetchLocation = function(onSuccess, onError) {
  const returnLocation = function(position) {
    const location = {
      lat : position.coords.latitude,
      lon : position.coords.longitude
    };

    onSuccess(location);
  };

  navigator.geolocation.getCurrentPosition(returnLocation, onError);
};
