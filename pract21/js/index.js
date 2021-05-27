const listLoggedIn = document.querySelectorAll(".logged-in");
const listLoggedOut = document.querySelectorAll(".logged-out");

const accountData = document.querySelector(".account-data");

var databaseSubstription;

function iniciaMapa(coords = { lat: 16.769399, lng: -99.779568 }, user) {
  if (databaseSubstription) {
    console.log("kill subscription");
    databaseSubstription();
  }

  const props = {
    center: coords,
    zoom: 12,
  };

  infoWindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById("map"), props);

  if (!user) return;

  const my_position = new google.maps.Marker({
    position: coords,
    map,
    title: "Mi poscición",
  });

  databaseSubstription = db.collection("usuarios").onSnapshot((snapshot) => {
    snapshot.forEach((doc) => {
      if (doc.id !== user.uid) setUser(map, doc.data());
    });
  });
}

const configMenu = (user) => {
  if (user) {
    db.collection("usuarios")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (!doc.data()) return;
        const html = `
        <p>Nombre:  ${doc.data().nombre}</p>
        <p>Correo:  ${user.email}</p>
        <p>Teléfono:  ${doc.data().telefono}</p>
        <p>Nombre:  ${doc.data().direccion}</p>
        <p>Coordenadas: ${doc.data().coords.lat} | ${doc.data().coords.lng}</p>
      `;
        accountData.innerHTML = html;
      });
    listLoggedIn.forEach((item) => (item.style.display = "block"));
    listLoggedOut.forEach((item) => (item.style.display = "none"));
  } else {
    listLoggedIn.forEach((item) => (item.style.display = "none"));
    listLoggedOut.forEach((item) => (item.style.display = "block"));
  }
};

const setUser = (map, user) => {
  const img =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFrOdYhkHSnlNDrVVxEFwiPGc_tnD7Jjdumw&usqp=CAU";

  const friend = new google.maps.Marker({
    position: user.coords,
    title: user.nombre,
    map,
    icon: {
      url: img,
      scaledSize: new google.maps.Size(50, 50),
    },
  });
};
