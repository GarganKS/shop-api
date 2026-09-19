"use strict";

// function loadProducts() {
//     fetch('/products').then(response => response.json())

//         .then(data => {
//             const productsList = document.querySelector('#products-list');
//             productsList.innerHTML = '';
//             products = data.products;
//             data.products.forEach(product => {
//                 const productItem = document.createElement('li');
//                 productItem.textContent = `${product.title} - $${product.price}`;
//                 productsList.appendChild(productItem);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching products:', error);
//         });
//     }

async function loadProducts() {
  const response = await fetch("/api/products");

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return await response.json();
}

const list = document.querySelector("#list");

function render(products) {
  list.innerHTML = "";

  for (const product of products) {
    const li = document.createElement("li");
    li.textContent = `${product.title} — ${product.price} грн `;
    list.append(li);
  }
}

const errorBox = document.querySelector("#error");

async function refresh() {
  try {
    errorBox.textContent = "";
    const products = await loadProducts();

    render(products);
  } catch (err) {
    errorBox.textContent = `Не вдалось завантажити: ${err.message}`;
  }
}

refresh();
