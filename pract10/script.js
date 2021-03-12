var coords = {
  lat: 0,
  lng: 0
}

var propiedades = {
  center: coords,
  zoom: 2
}

function iniciaMapa() {
  fetch('http://api.worldbank.org/v2/country/?format=json')

    .then(res => {
      res.json().then(country_data => {
        const map = new google.maps.Map(document.getElementById('mapa'), propiedades);

        country_data[1].forEach(marcador => {

          fetch('https://corona.lmao.ninja/v3/covid-19/countries')
            .then(res => {

              res.json().then(covid_data => {

                covid_data.forEach(cov_reg => {

                  var informacion = `País: <strong>${cov_reg.country}</strong>, Infectados: <strong>${cov_reg.cases}</strong>`

                  var infoWindow = new google.maps.InfoWindow({
                    content: informacion
                  })

                  if (marcador.name == cov_reg.country) {
                    let marker = new google.maps.Marker({
                      map,
                      position: new google.maps.LatLng(marcador.latitude, marcador.longitude),
                      title: marcador.name + ' ' + cov_reg.cases,
                    });

                    marker.addListener('click', () => {
                      infoWindow.open(map, marker);
                    })
                  }

                })

              })

            })
        })

      })
    })
    .catch((err) => {
      console.log(err);
    })
}