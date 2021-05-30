var coords = { lat: 16.769399, lng: -99.779568 };
var map;

function iniciaMapa() {
  const props = {
    center: coords,
    zoom: 12,
  };

  map = new google.maps.Map(document.getElementById("map"), props);

  showPlaces();
}

var selectedType = 'atm';
const selectTipo = document.getElementById("tipo");
var markers = [];

selectTipo.addEventListener("change", (ev) => {
  selectedType = ev.target.options[selectTipo.selectedIndex].value;
  showPlaces();
});

const showPlaces = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      coords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };

      const service = new google.maps.places.PlacesService(map);
      
      service.nearbySearch(
        {
          location: coords,
          radius: 1000,
          type: [selectedType],
        },
        (results, status, pagination) => {
          if (status === "ZERO_RESULTS") {
            const placesList = document.querySelector("#places");
            placesList.innerHTML = "No se encuentra alguno en tu área";
            cleanMarkers();
            return;
          }

          if (status !== "OK") {
            console.log(status);
            return;
          }

          generateMarkers(results);
        }
      );
    });
  }
};

const generateMarkers = (places) => {
  var bounds = new google.maps.LatLngBounds();
  const placesList = document.querySelector("#places");
  placesList.innerHTML = "";

  cleanMarkers();
  places.forEach((place, i) => {
    const marker = new google.maps.Marker({
      map,
      title: `<strong>
      ${place.name}
      </strong>  
       --- ${place.vicinity}`,
      position: place.geometry.location,
    });

    markers.push(marker);

    const li = document.createElement("li");

    li.textContent = place.name;
    placesList.appendChild(li);

    bounds.extend(place.geometry.location);

    google.maps.event.addListener(marker, "mouseover", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: marker.title,
        position: marker.position,
      });

      infoWindow.open(map);

      setTimeout(() => {
        infoWindow.close();
      }, 3000);
    });
  });

  map.fitBounds(bounds);
};

const cleanMarkers = () => {
  markers.forEach((marker) => {
    marker.setMap(null);
  });

  markers = [];
};
