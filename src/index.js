const API_URL = "http://localhost:3000/students";
const listEl = document.querySelector("#list");
const formEl = document.querySelector("#student-form");
const loadBtn = document.querySelector("#load-btn");


function render(students) {
  listEl.innerHTML = students
    .map(
      (s) => `
        <tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.age}</td>
            <td>
                <button class="btn-upd" onclick="handleEdit('${s.id}')">Змінити</button>
                <button class="btn-del" onclick="handleDelete('${s.id}')">Видалити</button>
            </td>
        </tr>
    `,
    )
    .join("");
}


async function getStudents() {
  const res = await fetch(API_URL);
  const data = await res.json();
  render(data);
}


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
  getStudents();
};


window.handleDelete = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  getStudents();
};


window.handleEdit = async (id) => {
  const newName = prompt("Введіть нове ім'я:");
  if (!newName) return;

  await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName }),
  });
  getStudents();
};

loadBtn.onclick = getStudents;
getStudents(); 
