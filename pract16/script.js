var service;
var infoWindow;
var btnBuscar = document.getElementById("btnBuscar");
var map;
var coords = { lat: 21.152639, lng: -101.711598 };

btnBuscar.addEventListener("click", search = () => {
  let searchInput = document.getElementById("txtBuscar");

  let request = {
    query: searchInput.value,
    fields: ["place_id", "name", "formatted_address", "icon", "geometry"],
    locationBias: coords,
  };

  service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, (res, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      console.log(res);
      for (let i = 0; i < res.length; i++) {
        createMarker(res[i]);
      }

      map.setCenter(res[0].geometry.location);
    }
  });

  const createMarker = (place) => {
    var icon = {
      url: place.icon,
      scaledSize: new google.maps.Size(25, 25),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 0),
    };

    var marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
      icon,
    });

    google.maps.event.addListener(marker, "click", function () {
      infoWindow.setContent(`
        <b style="font-size: 1.5em;">
          ${place.name}
        </b>
        <br/>
        ${place.formatted_address}
      `);
      infoWindow.open(map, this);
    });
  };
});

document.querySelector('#txtBuscar').addEventListener('keydown', (e) => console.log(e))

function iniciaMapa() {
  var props1 = {
    center: coords,
    zoom: 12,
  };

  infoWindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById("map"), props1);
}

const animKeyframes = [
  { width: 0, opacity: 0 },
  { opacity: 0, offset: 0.1 },
  { width: "5em", opacity: 1 },
];

btnBuscar.addEventListener("mouseenter", () => {
  btnBuscar.querySelector("div").classList.remove("hidden");
  btnBuscar.querySelector("div").animate(animKeyframes, {
    fill: 'forwards',
    duration: 500,
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  })
});

btnBuscar.addEventListener("mouseleave", () => {
  btnBuscar.querySelector("div").animate(animKeyframes, {
    fill: 'forwards',
    direction: 'reverse',
    duration: 500,
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  })
});
