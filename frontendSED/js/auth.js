import { api, saveToken, attachAuth } from "./utils.js";

export function showLogin(container, onNavigate) {
  container.innerHTML = `
    <div class="form-card">
      <h2>Iniciar sesión</h2>
      <form id="loginForm">
        <div class="form-row">
          <label>Correo</label>
          <input type="email" id="email" required>
        </div>
        <div class="form-row">
          <label>Contraseña</label>
          <input type="password" id="password" required>
        </div>
        <button class="btn btn-primary" type="submit">Ingresar</button>
      </form>
    </div>
  `;

  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      });

      saveToken(data.access_token);
      attachAuth();
      alert("Inicio de sesión exitoso");
      onNavigate("feed");
    } catch (err) {
      alert("Credenciales inválidas");
    }
  });
}

export function showRegister(container, onNavigate) {
  container.innerHTML = `
    <div class="form-card">
      <h2>Crear cuenta</h2>
      <form id="registerForm">
        <div class="form-row">
          <label>Nombre completo</label>
          <input type="text" id="name" required>
        </div>
        <div class="form-row">
          <label>Correo</label>
          <input type="email" id="email" required>
        </div>
        <div class="form-row">
          <label>Contraseña</label>
          <input type="password" id="password" required>
        </div>
        <button class="btn btn-primary" type="submit">Registrar</button>
      </form>
    </div>
  `;

  document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      });

      alert("Usuario registrado. Ahora inicia sesión.");
      onNavigate("login");
    } catch (err) {
      alert("Error al registrarse");
    }
  });
}