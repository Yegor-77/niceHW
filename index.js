import Handlebars from "handlebars";
import templateSource from "./template.hbs";
import { products as initialProducts } from "./data.js";

let products = [...initialProducts];
const list = document.getElementById("list");
const form = document.getElementById("form");
const template = Handlebars.compile(templateSource);

function render() {
  list.innerHTML = template(products);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const product = {
    id: Date.now(),
    name: formData.get("name"),
    price: Number(formData.get("price")),
    description: formData.get("description"),
  };
  products.push(product);
  form.reset();
  render();
});

list.addEventListener("click", (e) => {
  if (!e.target.classList.contains("remove")) return;
  const id = Number(e.target.closest("li").dataset.id);
  products = products.filter((p) => p.id !== id);
  render();
});

render();
