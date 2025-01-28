function cargarEstudiantes() {
  let estudiantes = JSON.parse(localStorage.getItem("students")) || [];
  const tableBody = document.querySelector("#attendance-list tbody");
  tableBody.innerHTML = "";

  estudiantes.forEach((estudiante, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${estudiante.name}</td>
      <td>
        ${
          estudiante.asistencia === ""
            ? `<button class="presente" onclick="marcarAsistencia(${index}, 'Presente')" aria-label="Marcar como presente">Presente</button>
               <button class="ausente" onclick="marcarAsistencia(${index}, 'Ausente')" aria-label="Marcar como ausente">Ausente</button>`
            : `<span>${estudiante.asistencia}</span>`
        }
      </td>
      <td>${estudiante.fecha || ""}</td>
      <td>
        <button class="eliminar" onclick="removerEstudiante(${index})" aria-label="Eliminar estudiante">Eliminar</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function agregarEstudiante() {
  const nameInput = document.getElementById("student-name");
  if (nameInput.value.trim() === "") return;

  const estudiantes = JSON.parse(localStorage.getItem("students")) || [];
  estudiantes.push({
    name: nameInput.value,
    asistencia: "",
    fecha: "",
  });

  localStorage.setItem("students", JSON.stringify(estudiantes));
  nameInput.value = "";
  cargarEstudiantes();
}

function removerEstudiante(index) {
  const estudiantes = JSON.parse(localStorage.getItem("students")) || [];
  estudiantes.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(estudiantes));
  cargarEstudiantes();
}

function marcarAsistencia(index, estado) {
  const estudiantes = JSON.parse(localStorage.getItem("students")) || [];
  const estudiante = estudiantes[index];
  const fechaActual = new Date().toLocaleDateString();

  estudiante.asistencia = estado;
  estudiante.fecha = fechaActual;

  localStorage.setItem("students", JSON.stringify(estudiantes));
  cargarEstudiantes();
}

function verResumen() {
  const estudiantes = JSON.parse(localStorage.getItem("students")) || [];
  alert(
    estudiantes
      .map(
        (estudiante) =>
          `${estudiante.name} - ${estudiante.asistencia} (${estudiante.fecha})`
      )
      .join("\n")
  );
}

window.onload = cargarEstudiantes;
