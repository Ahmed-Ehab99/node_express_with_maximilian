import fs from "fs";
import path from "path";
import rootDir from "../utils/path.js";

const cartPath = path.join(rootDir, "data", "cart.json");

export const addProduct = (id, productPrice) => {
  fs.readFile(cartPath, (err, fileContent) => {
    let cart = { products: [], totalPrice: 0 };
    if (!err) {
      cart = JSON.parse(fileContent);
    }

    const existingProductIndex = cart.products.findIndex(
      (prod) => prod.id === id
    );
    const existingProduct = cart.products[existingProductIndex];
    let updatedProduct;

    if (existingProduct) {
      updatedProduct = { ...existingProduct, qty: existingProduct.qty + 1 };
      cart.products = [...cart.products];
      cart.products[existingProductIndex] = updatedProduct;
    } else {
      updatedProduct = { id, qty: 1 };
      cart.products = [...cart.products, updatedProduct];
    }

    cart.totalPrice = cart.totalPrice + +productPrice;
    fs.writeFile(cartPath, JSON.stringify(cart), (err) => console.log(err));
  });
};

export const deleteProduct = (id, productPrice) => {
  fs.readFile(cartPath, (err, fileContent) => {
    if (err) return;

    const cart = JSON.parse(fileContent);
    const product = cart.products.find((prod) => prod.id === id);
    if (!product) return;

    const productQty = product.qty;
    cart.products = cart.products.filter((prod) => prod.id !== id);
    cart.totalPrice = cart.totalPrice - productPrice * productQty;

    fs.writeFile(cartPath, JSON.stringify(cart), (err) => console.log(err));
  });
};

export const getCartProducts = (cb) => {
  fs.readFile(cartPath, (err, fileContent) => {
    if (err) {
      cb(null);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};
