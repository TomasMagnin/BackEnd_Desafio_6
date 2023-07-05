import { response } from "express";

let carritoId = localStorage.getItem("carrito-id");
const API_URL = "http://localhost:8080/api";          // Metemos una fraccion del entpoint en una variable, para trabajar con ella mas adelante.

function putIntoCart(_id) {
  
  carritoId = localStorage.getItem("carrito-id");
  
  const url = API_URL + "/carts/" + carritoId + "/product/" + _id;

  data = {};

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }; 

  fetch(url, options)
      .then((response) => response.json())
      .then((res)=>{
        console.log(res);
        alert("agregado");
      })
      .catch((error) => {
        console.log("Error", error);
        alert(JSON.stringify(error));
      });
}

if (!carritoId) {
  alert("no id");
  const url = API_URL + "/carts";

  const data = {};

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log("Response:", data);
      const carritoId = localStorage.setItem("carrito-id", data._id);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(JSON.stringify(error));
    });
}

const addProductForm = document.getElementById("addProductForm");
const addProductFormReal = document.getElementById("addProductFormReal");
const productsList = document.getElementById("productsList");

async function deleteProduct(id) {
  const response = await fetch(`/api/products/${id}`, {
    method: "delete",
  });
  if (response.ok) {
    const li = document.getElementById(id);
    li.remove();
  } else {
    console.error();
    alert("Product couldn't be deleted");
  }
}

function deleteProductSocket(id) {
  socket.emit("deleteProduct", id);
}

try {
  addProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(addProductForm);
    const entries = Array.from(formData.entries());
    const formDataObject = entries.reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
    const response = await fetch("/api/products", {
      method: "post",
      body: JSON.stringify(formDataObject),
      headers: {
        "content-type": "application/json",
      },
    });
    const product = await response.json();
    if (response.ok) {
      const li = `
            <li id="${product.id}">
                <div>
                    <p>${product.title} - ${product.description} - ${product.price} - ${product.thumbnail} - ${product.code} - ${product.stock} - ${product.category}</p>
                    <button onclick="deleteProduct('${product.id}')">Delete</button>
                </div>
            </li>
            `;
      productsList.innerHTML += li;
      addProductForm.reset();
    } else {
      alert("Error, product not loaded");
    }
  });
} catch (error) {}

try {
  socket.on("connect", () => {
    console.log("Successful connection");
  });
  socket.on("addedProduct", (product) => {
    const li = `
        <li id="${product.id}">
            <div>
                <p>${product.title} - ${product.description} - ${product.price} - ${product.thumbnail} - ${product.code} - ${product.stock} - ${product.category}</p>
                <button onclick="deleteProductSocket('${product.id}')">Delete</button>
            </div>
        </li>
        `;
    productsList.innerHTML += li;
  });

  socket.on("deletedProduct", (id) => {
    const li = document.getElementById(id);
    li.remove();
  });

  addProductFormReal.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(addProductFormReal);
    const entries = Array.from(formData.entries());
    const formDataObject = entries.reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
    socket.emit("addProduct", formDataObject);
  });
  addProductFormReal.reset();
} catch (error) {}