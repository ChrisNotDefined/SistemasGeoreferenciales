var navegador = document.getElementById('nav-data');

var datos = navegador.getElementsByTagName("li");

const obtenerDatos = () => {
  datos[0].innerHTML = `Nombre del navegador: ${navigator.appCodeName}`;
  datos[1].innerHTML = `Versión: ${navigator.appVersion}`;
  datos[2].innerHTML = `Connected to Internet: ${navigator.onLine}`;
  datos[3].innerHTML = `Platform: ${navigator.platform}`;

}