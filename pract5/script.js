// ------------- Template components ------------------------------------------------

const CaptionHTML = (title, content, imageUrl) => {
  return `
  ${imageUrl ? `<img class="infoImage" src="${imageUrl}" height="200px">` : '' }
  <h2>${title}</h2>
  <p>${content}</p>
`
}// For each info window

const listItemHTML = (title, coords, index) => {
  return `
  <li class="list-group-item list-group-item-action" onclick="setCoords(${coords.lat}, ${coords.lng}, this, ${index})">
    <h4>${title}</h4>
  </li>
  `
} // Every item of the marker list

// ---- End of Template components ------------------------------------------------

// Logic for each item in the list
const setCoords = (lat, lng, el, indx) => {
  pointList.querySelectorAll("li").forEach(e => {
    e.classList.remove('active');
  })
  el.classList.add('active');
  map.panTo({
    lat,
    lng
  });

  markers.forEach((m, ind) => {
    if (ind - 1 === indx) {
      m.show();
    } else {
      m.close();
    }
  })

  // markers[indx + 1].show();
}

// --------------- Global Variables ----------------------------
var pointList = document.getElementById('pointList');
var mapa = document.getElementById("mapa");

var map = null;
var markers = [];
// --------------- End of global variables ---------------------

// --------------- Run when fully loaded -------------------------------
window.onload = () => {
  // --------- Create a marker and list item for each point in the datasource ---------------
  Points.forEach((p, index) => {
    markers.push(new MyMarker(map, p.lat, p.lng, p.titulo, p.description, p.imageUrl))
    let coords = {};
    coords.lat = p.lat;
    coords.lng = p.lng;
    // ------------------------------ Add its button to the list
    pointList.innerHTML += listItemHTML(p.titulo, coords, index);
  })

  // ------------------- Show the markers one by one 
  markers.forEach(m => {
    setTimeout(() => {
      m.loadMarker()
    }, 500);
  })
};


// ------- Called when map is loaded, before all document is ready --------------
function iniciaMapa() {

  var propiedades = {
    center: {
      lat: 16.836784958620864,
      lng: -99.91
    },
    zoom: 13
  }
  map = new google.maps.Map(mapa, propiedades);



  // ------ Verify location compatibility -----------
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {

      let found_position = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }

      // ------- Load Marker with device position to the map ------------------------------
      let geoloc_marker = new MyMarker(map,
        found_position.lat,
        found_position.lng,
        "Tu Ubicación",
        "Ubicación aproximada", null, true
      );

      geoloc_marker.loadMarker();
      map.setCenter(found_position);
      geoloc_marker.show(); // Default to be showing at start

      // ------ Add button to control the marker -------------------------------------------
      pointList.innerHTML = listItemHTML("Tu Ubicación", found_position, -1) + pointList.innerHTML;
      pointList.querySelectorAll('li')[0].classList.add('active');
      markers.push(geoloc_marker);
    });
  }
}