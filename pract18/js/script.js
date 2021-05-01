const prodList = document.querySelector("#lista");

const formulario = document.querySelector("#forma");

document.querySelector("#btnNew").addEventListener("click", () => {
  showAddModal();
});

db.collection("productos").onSnapshot((snapshot) => {
  let changes = snapshot.docChanges();

  changes.forEach((change) => {
    if (change.type == "added") {
      renderProductos(change.doc);
    }

    if (change.type == "modified") {
      let valorID = document.getElementById(change.doc.id);
      valorID.querySelector(".prodName").innerHTML = `Nombre: ${change.doc.data().nombre}`;
      valorID.querySelector(".prodCode").innerHTML = `Código: ${change.doc.data().codigo}`;
    }

    if (change.type == "removed") {
      let valorID = document.getElementById(change.doc.id);
      prodList.removeChild(valorID);
    }
  });
});
