const API_URL = "https://your-backend.onrender.com/api/items";

let editId = null;

window.onload = loadItems;

function loadItems() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      let table = document.getElementById("inventoryTable");
      table.innerHTML = "";

      data.forEach(item => {
        table.innerHTML += `
          <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td>${item.total}</td>
            <td>
              <button onclick="editItem('${item._id}','${item.name}',${item.quantity},${item.price})">Edit</button>
              <button onclick="deleteItem('${item._id}')">Delete</button>
            </td>
          </tr>
        `;
      });
    });
}

function addItem() {
  const name = document.getElementById("name").value;
  const quantity = document.getElementById("quantity").value;
  const price = document.getElementById("price").value;

  const method = editId ? "PUT" : "POST";
  const url = editId ? `${API_URL}/${editId}` : API_URL;

  fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, quantity, price })
  }).then(() => {
    editId = null;
    loadItems();
  });
}

function deleteItem(id) {
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(() => loadItems());
}

function editItem(id, name, quantity, price) {
  document.getElementById("name").value = name;
  document.getElementById("quantity").value = quantity;
  document.getElementById("price").value = price;
  editId = id;
}