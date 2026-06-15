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

export const saveProduct = (title) => {
  getProductsFromFile((products) => {
    products.push({ title });
    fs.writeFile(productsPath, JSON.stringify(products), (err) => {
      console.log(err);
    });
  });
};

export const fetchAllProducts = (callback) => {
  getProductsFromFile(callback);
};
