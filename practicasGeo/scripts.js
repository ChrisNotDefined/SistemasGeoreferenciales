function iniciaMapa() {
  var coordenadas = {
    lat: 16.836784958620864,
    lng: -99.91
  }

  var map = new google.maps.Map(document.getElementById("map"), {
    center: coordenadas,
    zoom: 15
  })

}

var buttonToTop = document.getElementById("goToTop");

window.onscroll = function () {
  scrollListener()
};

function scrollListener() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    //buttonToTop.style.display = "block";
    buttonToTop.classList.remove("zoom-hidden");
  } else {
    buttonToTop.classList.add("zoom-hidden");
    //buttonToTop.style.display = "none";
  }
}

scrollListener();

function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}