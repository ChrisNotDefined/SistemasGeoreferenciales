var mapa = document.getElementById('mapa');

const getLocation = () => {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    mapa.innerHTML = "Obteniendo ubicación";
  } else {
    mapa.innerHTML = 'No es posible obtener tu ubucación';
  }
}

const showPosition = (position) => {
  console.log(position);

  mapa.innerHTML = "Latitud: " + position.coords.latitude + '<br/>' + 'Longitud: ' + position.coords.longitude;
}