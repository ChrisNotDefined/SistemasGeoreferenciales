let modalHTML = document.querySelector("#editModal");
let modal = new bootstrap.Modal(modalHTML);
let handleProceed = () => {
  console.log("A");
};

modalHTML
  .querySelector("#formProceed")
  .addEventListener("click", handleProceed);

const showEditModal = (product) => {
  modalHTML.querySelector("#indication").innerHTML = "Editar Producto";
  modalHTML.querySelector("#formNombre").value = product.nombre;
  modalHTML.querySelector("#formCodigo").value = product.codigo;

  modalHTML.querySelector("#formProceed").innerHTML = "Actualizar";

  modalHTML
    .querySelector("#formProceed")
    .removeEventListener("click", handleProceed);

  handleProceed = (e) => {
    product.nombre = modalHTML.querySelector("#formNombre").value;
    product.codigo = modalHTML.querySelector("#formCodigo").value;
    product.actualizar();
    modal.hide();
  };

  modalHTML
    .querySelector("#formProceed")
    .addEventListener("click", handleProceed);

  modal.show();
};

const showAddModal = () => {
  modalHTML.querySelector("#indication").innerHTML = "Nuevo Producto";
  modalHTML.querySelector("#formNombre").value = "";
  modalHTML.querySelector("#formCodigo").value = "";

  modalHTML.querySelector("#formProceed").innerHTML = "Crear";

  modalHTML
    .querySelector("#formProceed")
    .removeEventListener("click", handleProceed);

  handleProceed = (e) => {
    let product = new Register();
    product.nombre = modalHTML.querySelector("#formNombre").value;
    product.codigo = modalHTML.querySelector("#formCodigo").value;
    product.agregar();
    modal.hide();
  };

  modalHTML
    .querySelector("#formProceed")
    .addEventListener("click", handleProceed);

  modal.show();
};
