import { attachAuth, getToken, clearToken } from "./utils.js";
import { showFeed, showMyReports } from "./reports.js";
import { showLogin, showRegister } from "./auth.js";
import { showCreate } from "./create.js";

// Referencias a botones
const app = document.getElementById("app");
const btnFeed = document.getElementById("nav-feed");
const btnCreate = document.getElementById("nav-create");
const btnLogin = document.getElementById("nav-login");
const btnRegister = document.getElementById("nav-register");
const btnLogout = document.getElementById("nav-logout");
const btnMyReports = document.getElementById("nav-myreports");

document.getElementById("year").textContent = new Date().getFullYear();

function isLoggedIn() {
  return !!getToken();
}

function refreshUI() {
  const logged = isLoggedIn();

  if (logged) {
    btnLogin.classList.add("hidden");
    btnRegister.classList.add("hidden");
    btnLogout.classList.remove("hidden");
    btnCreate.classList.remove("hidden");
    btnMyReports.classList.remove("hidden");
  } else {
    btnLogin.classList.remove("hidden");
    btnRegister.classList.remove("hidden");
    btnLogout.classList.add("hidden");
    btnCreate.classList.add("hidden");
    btnMyReports.classList.add("hidden");
  }
}

function navigateTo(page) {
  refreshUI();
  attachAuth(); // Token a Axios

  switch (page) {
    case "login":
      showLogin(app, navigateTo);
      break;

    case "register":
      showRegister(app, navigateTo);
      break;

    case "create":
      if (!isLoggedIn()) {
        alert("Debes iniciar sesión para crear reportes.");
        return navigateTo("login");
      }
      showCreate(app, navigateTo);
      break;

    case "myreports":
      if (!isLoggedIn()) {
        alert("Inicia sesión para ver tus reportes.");
        return navigateTo("login");
      }
      showMyReports(app);
      break;

    case "feed":
    default:
      showFeed(app);
      break;
  }
}

btnFeed.addEventListener("click", () => navigateTo("feed"));
btnLogin.addEventListener("click", () => navigateTo("login"));
btnRegister.addEventListener("click", () => navigateTo("register"));
btnCreate.addEventListener("click", () => navigateTo("create"));
btnMyReports.addEventListener("click", () => navigateTo("myreports"));

btnLogout.addEventListener("click", () => {
  if (!confirm("¿Cerrar sesión?")) return;

  clearToken();
  refreshUI();
  navigateTo("feed");
});


// Iniciar en el feed

refreshUI();
navigateTo("feed");