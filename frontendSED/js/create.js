import { api, attachAuth } from "./utils.js";

export function showCreate(container, onNavigate) {
  attachAuth();

  container.innerHTML = `
    <div class="form-card">
      <h2>Crear reporte</h2>
      <form id="createForm">
        <input type="text" id="title" placeholder="Título" required>
        <textarea id="description" placeholder="Descripción" required></textarea>
        <input type="text" id="alias" placeholder="Alias">
        <input type="text" id="place" placeholder="Lugar">
        <input type="date" id="date" required>
        <input type="file" id="image" accept="image/*" required>
        <button class="btn btn-primary">Publicar</button>
      </form>
    </div>
  `;

  document.getElementById("createForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", document.getElementById("title").value);
    formData.append("description", document.getElementById("description").value);
    formData.append("alias", document.getElementById("alias").value);
    formData.append("place", document.getElementById("place").value);
    formData.append("date", document.getElementById("date").value);
    formData.append("image", document.getElementById("image").files[0]);

    try {
      await api.post("/reports", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Reporte creado");
      onNavigate("feed");
    } catch (err) {
      alert("Error al crear reporte");
    }
  });
}