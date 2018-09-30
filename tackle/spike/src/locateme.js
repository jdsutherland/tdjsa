const locate = function() {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      const location = {
        lat : position.coords.latitude,
        lon : position.coords.longitude
      };
      const url = `http://maps.google.com/?q=${location.lat},${location.lon}`;
      window.location = url;
    },
    function(){document.getElementById('error').innerHTML =
        'unable to get your location'
    });
};
