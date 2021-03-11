var paises = document.getElementById("paises");



fetch('datos.json')
.then(res => {
  res.json().then(data => {
    data.forEach((reg => {
      console.log(reg.country);
      let nombre = document.createElement('p');
      nombre.innerHTML = `País: <strong>${reg.country}</strong>, casos: <strong>${reg.cases}</strong>`;
      paises.appendChild(nombre);
    }))
  })
  .catch(err => {
    console.log('Error fetching:', err);
  })
})
