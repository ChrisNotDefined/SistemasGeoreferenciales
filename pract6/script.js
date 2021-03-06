var map;

var coords = {
  lat: 0,
  lng: 0
};

var propiedades = {
  center: coords,
  zoom: 20
}

function iniciaMapa() {
  map = new google.maps.Map(document.getElementById("map"), propiedades);
  var icon = {
    url: 'https://media.giphy.com/media/9DgomEHr9qWhUuiGEJ/giphy.gif',
    scaledSize: new google.maps.Size(50, 50),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(4, 4)
  }

  var marker = new google.maps.Marker({
    position: coords,
    icon: icon,
    map: map
  });

  if (navigator.geolocation) {
    moverPosicion(marker)
    setInterval(() => {
      moverPosicion(marker);
      console.log('mover position');
    }, 5000);
  }
}

const moverPosicion = (marker) => {
  navigator.geolocation.getCurrentPosition((position) => {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    }

    marker.setPosition(pos);
    map.panTo(pos);
  });
}