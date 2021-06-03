var map, map2;

const swType = document.getElementById("swType");

swType.addEventListener("change", (e) => {
  const [direct, inverse] = Array.from(document.querySelectorAll(".slide"));

  if (!e.target.checked) {
    inverse.classList.add("hiding");
    setTimeout(() => {
      inverse.classList.remove("hiding");
      inverse.classList.remove("active");
      direct.classList.add("active");
    }, 400);
  } else {
    direct.classList.add("hiding");
    setTimeout(() => {
      direct.classList.remove("hiding");
      direct.classList.remove("active");
      inverse.classList.add("active");
    }, 400);
  }
});

function iniciaMapa() {
  const coords = { lat: 16.83624, lng: -99.915694 };

  const props = {
    center: coords,
    zoom: 14,
    gestureHandling: "greedy",
  };

  map = new google.maps.Map(document.getElementById("map"), props);

  const btnBuscar = document.getElementById("btnBuscar");

  btnBuscar.addEventListener("click", () => {
    const domicilio = document.getElementById("domicilio").value;
    console.log(domicilio);

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode(
      { address: domicilio, region: "Guanajuato" },
      (results, status) => {
        if (status === "OK") {
          console.log(results);
          const resElement = document.getElementById("resultados");
          resElement.innerHTML = `
          <p>Coords: ${results[0].geometry.location}</p>
          <p>Detalles: ${results[0].formatted_address}</p>
        `;

          map.setCenter(results[0].geometry.location);
          const marker = new google.maps.Marker({
            map,
            position: results[0].geometry.location,
          });
        } else {
          console.error(status);
        }
      }
    );
  });

  map2 = new google.maps.Map(document.getElementById("map2"), props);

  const btnReverse = document.getElementById("btnReverse");

  btnReverse.addEventListener("click", () => {
    const coords = document.getElementById("coords").value;

    let { 0: lat, 1: lng } = coords.split(",");

    lat = parseFloat(lat);
    lng = parseFloat(lng);

    console.log(lat, lng);

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK") {
        const resElement = document.getElementById("resultados2");
        resElement.innerHTML = `
          <p>Coords: ${results[0].geometry.location}</p>
          <p>Detalles: ${results[0].formatted_address}</p>
        `;
        map2.setCenter(results[0].geometry.location);
        const marker = new google.maps.Marker({
          map: map2,
          position: results[0].geometry.location,
        });
      } else {
        console.error(status);
      }
    });
  });
}
