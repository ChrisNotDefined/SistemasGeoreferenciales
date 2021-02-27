const obtenerUbicacion = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      var coords = `${pos.coords.latitude},${pos.coords.longitude}`;
      console.log(coords);
      var imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${coords}&zoom=16&size=600x300&&key=AIzaSyAlAfjkEyZc3T2vLRARL5f4QYJj3ZPai6Q`
      console.log(imageUrl);
      var mapa = document.getElementById('mapa');
      mapa.innerHTML = "<img src=" + imageUrl + ">";
    });
  } else {
    mapa.innerHTML = 'No es posible obtener tu ubucación';
  }
}