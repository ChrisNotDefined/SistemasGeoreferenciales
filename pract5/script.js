const CaptionHTML = (title, content) => {
  return `
  <h2>${title}</h2>
  <p>${content}</p>
`
}

const listItem = (title, coords) => {
  return `
  <li class="list-group-item list-group-item-action">
    <a onclick="setCoords(${coords.lat}, ${coords.lng}, this)">
      <h4>${title}</h4>
    </a>
  </li>
  `
}

const setCoords = (lat, lng, el) => {
  pointList.querySelectorAll("li").forEach(e => {
    e.classList.remove('active');
  })
  el.parentNode.classList.add('active');
  map.panTo({
    lat,
    lng
  });
}

let pointList = document.getElementById('pointList');

let mapa = document.getElementById("mapa");
var map = null;

function iniciaMapa() {
  var propiedades = {
    center: {
      lat: 16.836784958620864,
      lng: -99.91
    },
    zoom: 14
  }


  map = new google.maps.Map(mapa, propiedades);
  console.log(map);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      let found_position = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }

      const marker = new google.maps.Marker({
        position: found_position,
        map,
        title: "Marcador",
      });

      const infoWindow = new google.maps.InfoWindow({
        content: CaptionHTML("Tu ubicación", "Tu ubicación puede no ser exacta")
      })


      pointList.innerHTML = listItem('Tu Ubicación', found_position) + pointList.innerHTML;
      pointList.querySelectorAll('li')[0].classList.add('active');

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      })

      infoWindow.open(map, marker);

      window.onload = () => {
        setTimeout(() => {
          map.setCenter(found_position)
        }, 50)
      };
    });

    let markers = [];

    Points.forEach(p => {
      markers.push(new MyMarker(map, p.lat, p.lng, p.titulo, p.description))
      let coords = {};
      coords.lat = p.lat;
      coords.lng = p.lng;
      pointList.innerHTML += listItem(p.titulo, coords);
    })

    markers.forEach(m => {
      m.loadMarker();
    })
  }
}