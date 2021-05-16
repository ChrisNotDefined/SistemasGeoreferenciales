const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let correo = loginForm["email"].value;
  let contraseña = loginForm["password"].value;

  auth
    .signInWithEmailAndPassword(correo, contraseña)
    .then((cred) => {
      console.log(cred);

      let modal = bootstrap.Modal.getInstance(
        document.getElementById("loginModal")
      );
      modal.hide();

      loginForm.reset();
      loginForm.querySelector(".error").innerHTML = "";
    })
    .catch((err) => {
      console.log(err);
      loginForm.querySelector(".error").innerHTML = errorMessage(err.code);
    });
});

const errorMessage = (errorCode) => {
  let message = "";
  switch (errorCode) {
    case "auth/wrong-password":
      message = "La contraseña ingresada no es correcta";
      break;
    case "auth/user-not-found":
      message = "No hay usuario con estas características";
      break;
    case "auth/weak-password":
      message = "Ingrese una contraseña con símbolos y mínimo 6 caracteres";
      break;
    default:
      message = `Ocurrió el siguiente error: ${errorCode}`;
  }

  return message;
};

const logout = document.getElementById("btnLogout");

logout.addEventListener("click", (e) => {
  e.preventDefault();

  auth.signOut().then(() => {
    alert("Cerrada Sesión");
  });
});
