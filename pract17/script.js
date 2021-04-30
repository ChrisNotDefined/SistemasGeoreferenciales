// Configure application
var firebaseConfig = {
  apiKey: "AIzaSyBiwD6I6ZZ2WBZfsoZuLREPyKWyXWAlp6w",
  authDomain: "practicasisgeo.firebaseapp.com",
  projectId: "practicasisgeo",
  storageBucket: "practicasisgeo.appspot.com",
  messagingSenderId: "254661227381",
  appId: "1:254661227381:web:ca6f74254391b2b4c9593c",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const prodList = document.querySelector("#lista");

const formulario = document.querySelector("#forma");

const renderProductos = (doc) => {
  let li = document.createElement("li");
  let nombre = document.createElement("span");
  let codigo = document.createElement("span");
  let borrar = document.createElement("button");

  borrar.className = "btn btn-danger m-3";

  nombre.textContent = doc.data().nombre + " ";
  codigo.textContent = doc.data().codigo + " ";
  borrar.textContent = "Borrar";

  li.setAttribute("id", doc.id);
  li.appendChild(borrar);
  li.appendChild(nombre);
  li.appendChild(codigo);

  prodList.appendChild(li);

  borrar.addEventListener("click", (e) => {
    let id = e.target.parentElement.getAttribute("id");
    db.collection("productos").doc(id).delete();
  });
};

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  db.collection("productos").add({
    nombre: formulario.nombre.value,
    codigo: formulario.codigo.value,
  });

  formulario.nombre.value = "";
  formulario.codigo.value = "";
});

db.collection("productos").onSnapshot((snapshot) => {
  let changes = snapshot.docChanges();

  changes.forEach((change) => {
    if (change.type == "added") {
      renderProductos(change.doc);
    }

    if (change.type == "removed") {
      let valorID = document.getElementById(change.doc.id);
      prodList.removeChild(valorID);
    }
  });
});
