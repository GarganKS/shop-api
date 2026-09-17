import express from "express";

// import http from "node:http";

// const server = http.createServer((req, res) => {
//   // res.writeHead(200, { "content-type": "application/json" });
//   // res.end(JSON.stringify({ status: "Ok" }));

//   if (req.url === "/users") {
//     res.writeHead(200, { "content-type": "application/json" });
//     res.end(JSON.stringify({ page: "users" }));
//   } else if (req.url === "/products") {
//     res.writeHead(200, { "content-type": "application/json" });
//     res.end(JSON.stringify({ page: "products" }));
//   } else {
//     res.writeHead(404, { "content-type": "application/json" });
//     res.end(JSON.stringify({ error: "Not found" }));
//   }
// });

// server.listen(3000, () => {
//   console.log("Server works on port http://localhost:3000");
// });

const app = express();
app.use(express.json());
app.use(express.static("public"));

const PORT = 3000;

const products = [
  { id: 1, title: "Notebook", price: 4000 },
  { id: 2, title: "Headphones", price: 5000 },
  { id: 3, title: "Speakers", price: 8000 },
];

let nextId = 4;

app.get("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "Product is not exists" });
  }

  res.json(product);
});

app.post("/api/products", (req, res) => {
  const { title, price } = req.body;

  if (!title || !price) {
    return res.status(400).json({ error: "Data is not complete" });
  }

  const product = { id: nextId, title, price };
  nextId++;
  products.push(product);

  res.status(201).json(product);
});

app.delete("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const exists = products.some((p) => p.id === id);

  if (!exists) {
    return res.status(404).json({ error: "Product is not exists" });
  }

  const products = products.filter((p) => p.id !== id);
  res.status(204).end();
});

app.get("/api/health", (req, res) => {
  res.json({ status: "Ok" });
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`server works on port: ${PORT}`);
});
