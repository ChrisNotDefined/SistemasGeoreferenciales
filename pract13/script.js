var coords = {
  lat: -31.563910,
  lng: 147.154312
}

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

let idioma = urlParams.get('idioma');

if(!idioma) {
  idioma = 'es';
  document.getElementById('idioma').value = idioma;
  document.querySelector('#form').submit();
}

document.getElementById('idioma').value = idioma;
var script = document.createElement('script');

script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAlAfjkEyZc3T2vLRARL5f4QYJj3ZPai6Q&callback=iniciaMapa&language=' + idioma;
document.head.appendChild(script);


function iniciaMapa() {
  var map = new google.maps.Map(
    document.getElementById('map'), {
      center: coords,
      zoom: 3
    }
  );
}