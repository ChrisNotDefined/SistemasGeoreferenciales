const renderProductos = (doc) => {
  let registro = new Register(doc.id, doc.data().nombre, doc.data().codigo);

  let li = document.createElement("li");
  li.style.flexGrow = "1";
  li.style.listStyle = "none";
  //li.style.backgroundColor = "white";

  let container = document.createElement("div");
  container.style.display = "flex";
  container.style.alignItems = "center";

  let dataGroup = document.createElement("div");
  dataGroup.style.flexGrow = "1";
  dataGroup.style.height = "fit-content";
  dataGroup.className = "m-3";

  let nombre = document.createElement("div");
  nombre.textContent = "Nombre: " + registro.nombre + " ";
  nombre.className = "prodName";

  let codigo = document.createElement("div");
  codigo.textContent = "Código: " + registro.codigo + " ";
  codigo.className = "prodCode";

  let borrar = document.createElement("button");
  borrar.innerHTML = `<i class="fas fa-trash"></i> <span>Borrar</span>`;
  borrar.className = "btn btn-danger m-3";

  let editar = document.createElement("button");
  editar.innerHTML = `<i class="fas fa-pen"></i> <span>Editar</span>`;
  editar.className = "btn btn-warning m-3";

  li.setAttribute("id", doc.id);
  li.appendChild(container);
  container.appendChild(dataGroup);
  container.appendChild(editar);
  container.appendChild(borrar);

  dataGroup.appendChild(nombre);
  dataGroup.appendChild(codigo);

  prodList.appendChild(li);

  borrar.addEventListener("click", (e) => {
    registro.borrar();
  });

  editar.addEventListener("click", (e) => {
    showEditModal(registro);
  });
};
