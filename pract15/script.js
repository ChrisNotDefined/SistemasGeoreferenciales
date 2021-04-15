function iniciaMapa() {
  var coords = { lat: 21.152639, lng: -101.711598 };

  var props1 = {
    center: coords,
    zoom: 12,
  };

  var mapa1 = new google.maps.Map(document.getElementById("map1"), props1);

  var props2 = {
    center: coords,
    zoom: 12,
    disableDefaultUI: true,
  };

  var mapa2 = new google.maps.Map(document.getElementById("map2"), props2);
  var props3 = {
    center: coords,
    zoom: 12,
    zoomControl: false,
    scaleControl: false,
  };

  var mapa3 = new google.maps.Map(document.getElementById("map3"), props3);
  var props4 = {
    center: coords,
    zoom: 12,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      mapTypeIDs: ["roadmap", "satellite", "terrain"],
    },
  };

  var mapa4 = new google.maps.Map(document.getElementById("map4"), props4);
  var props5 = {
    center: coords,
    zoom: 12,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.RIGHT_TOP,
    },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER,
    },
    scaleControl: true,
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP,
    },
    fullScreenControl: true,
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM,
    },
  };

  var mapa5 = new google.maps.Map(document.getElementById("map5"), props5);

  var limits = {
    north: 21.164761,
    south: 21.080816,
    west: -101.729834,
    east: -101.557715,
  };

  var props6 = {
    center: coords,
    zoom: 12,
    restriction: {
      latLngBounds: limits,
      strictBounds: false,
    },
  };

  var mapa6 = new google.maps.Map(document.getElementById("map6"), props6);
}
