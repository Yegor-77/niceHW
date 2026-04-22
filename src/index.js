const API_URL = "http://localhost:3000/students";
const listEl = document.querySelector("#list");
const formEl = document.querySelector("#student-form");

// 1. GET - Отримати студентів
async function fetchStudents() {
  const res = await fetch(API_URL);
  const students = await res.json();
  render(students);
}

// 2. POST - Додати студента
formEl.onsubmit = async (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const age = document.querySelector("#age").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age }),
  });

  formEl.reset();
  fetchStudents();
};

// 3. DELETE - Видалити
window.removeStudent = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchStudents();
};

// 4. PATCH - Оновити (змінюємо ім'я)
window.editStudent = async (id) => {
  const newName = prompt("Введіть нове ім'я:");
  if (!newName) return;

  await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName }),
  });
  fetchStudents();
};

// Функція малювання таблиці
function render(students) {
  listEl.innerHTML = students
    .map(
      (s) => `
        <tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.age}</td>
            <td>
                <button class="btn-upd" onclick="editStudent('${s.id}')">Змінити</button>
                <button class="btn-del" onclick="removeStudent('${s.id}')">Видалити</button>
            </td>
        </tr>
    `,
    )
    .join("");
}

document.querySelector("#load-btn").onclick = fetchStudents;
fetchStudents(); 
