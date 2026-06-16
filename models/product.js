import fs from "fs";
import path from "path";
import rootDir from "../utils/path.js";

const productsPath = path.join(rootDir, "data", "products.json");

const getProductsFromFile = (callback) => {
  fs.readFile(productsPath, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

export const saveProduct = (product) => {
  getProductsFromFile((products) => {
    if (product.id) {
      const existingProductIndex = products.findIndex(
        (p) => p.id === product.id
      );
      const updatedProduct = [...products];
      updatedProduct[existingProductIndex] = product;
      fs.writeFile(productsPath, JSON.stringify(updatedProduct), (err) => {
        console.log(err);
      });
    } else {
      product.id = Math.random().toString();
      products.push(product);
      fs.writeFile(productsPath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    }
  });
};

export const deleteProductById = (id) => {
  getProductsFromFile((products) => {
    const product = products.find((p) => p.id === id);
    const updatedProducts = products.filter((p) => p.id !== id);
    fs.writeFile(productsPath, JSON.stringify(updatedProducts), (err) => {
      if (!err) {
        Cart.deleteProduct(id, product.price);
      }
    });
  });
};

export const fetchAllProducts = (callback) => {
  getProductsFromFile(callback);
};

export const findProductById = (id, callback) => {
  getProductsFromFile((products) => {
    const product = products.find((p) => p.id === id);
    callback(product);
  });
};