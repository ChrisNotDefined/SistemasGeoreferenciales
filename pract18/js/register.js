class Register {
  constructor(id, nombre, codigo) {
    this.id = id;
    this.nombre = nombre;
    this.codigo = codigo;
  }

  borrar(id) {
    if (!id) db.collection("productos").doc(this.id).delete();
    db.collection("productos").doc(id).delete();
  }

  agregar() {
    db.collection("productos").add({
      nombre: this.nombre,
      codigo: this.codigo,
    });
  }

  actualizar() {
    db.collection("productos").doc(this.id).update({
      nombre: this.nombre,
      codigo: this.codigo,
    });
  }
}
