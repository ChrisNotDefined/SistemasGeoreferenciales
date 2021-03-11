var paises = document.getElementById("paises");



fetch('https://disease.sh/v3/covid-19/countries')
.then(res => {
  res.json().then(data => {
    data.forEach((reg => {
      let renglon = document.createElement("div");
      renglon.className = "row border country-row";
      paises.appendChild(renglon);

      let columna = document.createElement("div");
      columna.className = "col-12";
      renglon.appendChild(columna);

      let nombre = document.createElement('p');
      nombre.innerHTML = `País: <strong>${reg.country}</strong>, casos: <strong>${reg.cases}</strong>`;
      columna.appendChild(nombre);
    }))
  })
  .catch(err => {
    console.log('Error fetching:', err);
  })
})
