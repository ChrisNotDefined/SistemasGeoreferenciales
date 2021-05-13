var iniciaMapa = () => {
  var coordenadas = { lat: 21.152639, lng: -101.711598 };

  var propiedades = {
    center: coordenadas,
    zoom: 6,
    mapTypeId: "terrain",
  };

  var map = new google.maps.Map(document.getElementById("map"), propiedades);

  cargaDatos().then((mun) => localizarCiudades(mun, map));
};

const cargaDatos = async () => {
  let municipios = await (await fetch("./municipios.json")).json();

  let tableContent = "";

  municipios.forEach((ciudad) => {
    tableContent += buildCityRow(ciudad);
  });

  document.querySelector(".table-container table tbody").innerHTML =
    tableContent;

  return municipios;
};

const buildCityRow = (city) => {
  return `
    <tr>
      <td>${city.nombre}</td>
      <td>${city.estado}</td>
      <td class="number">${formatNumber(city.habitantes)}</td>
    </tr>
  `;
};

const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const localizarCiudades = (municipios, mapa) => {
  let vuelos = [];

  let circleColor = getComputedStyle(
    document.querySelector(".table-container")
  ).color;

  let backColor = getComputedStyle(
    document.querySelector(".table-container")
  ).backgroundColor;

  municipios.forEach((municipio) => {
    vuelos.push(municipio.coordenadas);

    let cicrulo = new google.maps.Circle({
      strokeColor: circleColor,
      strokeWeight: 2,
      fillColor: circleColor,
      fillOpacity: 0.35,
      map: mapa,
      center: municipio.coordenadas,
      radius: Math.sqrt(municipio.habitantes) * 10,
    });
  });

  var trazo = new google.maps.Polyline({
    path: [...vuelos, vuelos[0]],
    geodesic: true,
    strokeColor: backColor,
    strokeOpacity: 1,
    strokeWeight: 1,
  });

  trazo.setMap(mapa);
};

