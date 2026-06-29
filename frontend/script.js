const API_URL = "http://localhost:5000/api/items";

window.onload = loadItems;

// ADD OR UPDATE MODE
let editId = null;

// SHOW MESSAGE
function showMessage(msg, type) {
    alert(`${type.toUpperCase()}: ${msg}`);
}

// LOAD ITEMS
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
                            <button class="btn btn-warning btn-sm" onclick="editItem('${item._id}', '${item.name}', ${item.quantity}, ${item.price})">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteItem('${item._id}')">Delete</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(err => {
            console.error(err);
            showMessage("Failed to load data", "error");
        });
}

// ADD OR UPDATE ITEM
function addItem() {
    let name = document.getElementById("name").value;
    let quantity = document.getElementById("quantity").value;
    let price = document.getElementById("price").value;

    if (!name || !quantity || !price) {
        showMessage("All fields required", "error");
        return;
    }

    let method = editId ? "PUT" : "POST";
    let url = editId ? `${API_URL}/${editId}` : API_URL;

    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            quantity: Number(quantity),
            price: Number(price)
        })
    })
    .then(res => res.json())
    .then(data => {
        showMessage(data.message, "success");

        editId = null;
        clearForm();
        loadItems();
    })
    .catch(err => {
        console.error(err);
        showMessage("Server error", "error");
    });
}

// DELETE ITEM
function deleteItem(id) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        showMessage(data.message, "success");
        loadItems();
    })
    .catch(err => {
        showMessage("Delete failed", "error");
    });
}

// EDIT ITEM
function editItem(id, name, quantity, price) {
    document.getElementById("name").value = name;
    document.getElementById("quantity").value = quantity;
    document.getElementById("price").value = price;

    editId = id;
}

// CLEAR FORM
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";
}