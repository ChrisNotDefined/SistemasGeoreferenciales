const listLoggedIn = document.querySelectorAll(".logged-in");
const listLoggedOut = document.querySelectorAll(".logged-out");

const accountData = document.querySelector(".account-data");

const configMenu = (user) => {
  if (user) {
    db.collection("usuarios")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const html = `
        <p>Nombre:  ${doc.data().nombre}</p>
        <p>Correo:  ${user.email}</p>
        <p>Teléfono:  ${doc.data().telefono}</p>
        <p>Nombre:  ${doc.data().direccion}</p>
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

const listaPlatillos = document.getElementById("dishesList");

const getDishes = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const plat = doc.data();

      const element = `
      <div class="col-12 col-md-4 mb-2">
        <div class="card">
          <img src="${plat.img}" />
          <h4>${plat.nombre}</h4>
          <p class="text-center mb-3">$${plat.price} pesos</p>
          <a href="https://www.paypal.me/devchrisap/${plat.price}" target="_blank">
            <button class='btn w-100'>Pagar Ahora</button>
          </a>
        </div>
      </div>
      `;

      html += element;
    });

    listaPlatillos.innerHTML = html;
  } else{
    listaPlatillos.innerHTML = '<p>Ingrese a su cuenta para ver los platittlos disponibles</p>';
  }
};
