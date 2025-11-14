import { api, attachAuth } from "./utils.js";

export async function showFeed(container) {
  container.innerHTML = `<h2>Cargando reportes...</h2>`;

  try {
    const { data } = await api.get("/reports");

    container.innerHTML = `
      <h2>Reportes disponibles</h2>
      <div class="feed">
        ${data.map(r => `
          <div class="report-card">
            <img src="${r.image}" alt="">
            <div class="report-body">
              <h3>${r.title}</h3>
              <p>${r.description.slice(0,120)}...</p>
              <button class="btn btn-primary" onclick="window.viewReport(${r.id})">Ver</button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  } catch (err) {
    container.innerHTML = "<p>Error cargando reportes</p>";
  }
}

window.viewReport = async function(id) {
  const container = document.getElementById("app");
  container.innerHTML = "<p>Cargando...</p>";

  const { data } = await api.get(`/reports/${id}`);

  container.innerHTML = `
    <div class="form-card">
      <h2>${data.title}</h2>
      <img src="${data.image}" style="width:100%;border-radius:8px;margin:10px 0;">
      <p>${data.description}</p>
      <p><strong>Publicado por:</strong> ${data.alias}</p>
      <button class="btn btn-ghost" onclick="history.back()">Volver</button>
    </div>
  `;
};

window.deleteReport = async function(id) {
  if (!confirm("¿Eliminar reporte?")) return;
  try {
    await api.delete(`/reports/${id}`);
    alert("Reporte eliminado");
    location.reload();
  } catch (err) {
    alert("No se pudo eliminar");
  }
};