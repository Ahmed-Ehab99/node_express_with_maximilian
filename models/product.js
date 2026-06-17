import db from "../utils/database.js";

export const saveProduct = (product) => {
  return db.execute(
    "INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)",
    [product.title, product.price, product.description, product.imageUrl]
  );
};

export const deleteProductById = (id) => {};

export const fetchAllProducts = () => {
  return db.execute("SELECT * FROM products");
};

export const findProductById = (id) => {};
