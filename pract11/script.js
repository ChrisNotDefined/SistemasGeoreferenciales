var coords = {
  lat: 0,
  lng: 0
}

var propiedades = {
  center: coords,
  zoom: 2
}

function iniciaMapa() {
  fetch('https://corona.lmao.ninja/v3/covid-19/countries')
    .then(res => {
      const map = new google.maps.Map(document.getElementById('map'), propiedades);
      res.json().then(covid_data => {

        covid_data.forEach(cov_reg => {

          
          var informacion = `
          <div style="display: flex; flex-direction: column">
            <img src=${cov_reg.countryInfo.flag}>
            <div style="margin-top: 1em">
              País: <strong>${cov_reg.country}</strong>, Infectados: <strong>${cov_reg.cases}</strong>
            </div>
          </div>
          `

          var infoWindow = new google.maps.InfoWindow({
            content: informacion
          })

          let marker = new google.maps.Marker({
            map,
            position: new google.maps.LatLng(cov_reg.countryInfo.lat, cov_reg.countryInfo.long),
            title: cov_reg.country + ' ' + cov_reg.cases,
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          })


        })

      })

    })
}