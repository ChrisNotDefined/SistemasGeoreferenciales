auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("platillos").onSnapshot((snapshot) => {
      getDishes(snapshot.docs);
    });
    configMenu(user);
  } else {
    getDishes({});
    configMenu(user);
  }
});

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
    case "auth/email-already-in-use":
      message = "Este correo ya esta siendo usado";
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

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = registerForm["txtRCorreo"].value;
  const password = registerForm["txtRPassword"].value;
  const repeatedPass = registerForm["txtRRepeatPassword"].value;

  if (password === repeatedPass) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        console.log("User created");
        db.collection("usuarios").doc(cred.user.uid).set({
          nombre: registerForm["txtRName"].value,
          telefono: registerForm["txtRTel"].value,
          direccion: registerForm["txtRDir"].value,
        });
      })
      .then(() => {
        let modal = bootstrap.Modal.getInstance(
          document.getElementById("registerModal")
        );
        modal.hide();

        registerForm.reset();
        registerForm.querySelector(".error").innerHTML = "";
      })
      .catch((err) => {
        registerForm.querySelector(".error").innerHTML = errorMessage(err.code);
        console.error(err);
      });
  } else {
    registerForm.querySelector(".error").innerHTML =
      "Loas passwords no coinciden";
  }
});

const loginGoogle = () => {
  const accountData = document.querySelector(".account-data");
  console.log(accountData);
  var provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .then((res) => {
      var token = res.credential.accessToken;
      console.log(token);

      var user = res.user;

      let html = `
      <p>Nombre: ${user.displayName}</p>
      <p>Correo: ${user.email}</p>
      <img src="${user.photoUrl}">
    `;

      accountData.innerHTML = html;

      let modal = bootstrap.Modal.getInstance(
        document.getElementById("loginModal")
      );
      modal.hide();

      loginForm.reset();
      loginForm.querySelector(".error").innerHTML = "";
    })
    .catch((err) => {
      console.log(err);
    });
};
