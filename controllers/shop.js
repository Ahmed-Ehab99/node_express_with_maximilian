import { addProduct, deleteProduct, getCartProducts } from "../models/cart.js";
import { fetchAllProducts, findProductById } from "../models/product.js";

export const getProducts = (req, res, next) => {
  fetchAllProducts().then(([rows]) => {
    res.render("shop/product-list", {
      products: rows,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

export const getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  findProductById(prodId)
    .then(([product]) => {
      res.render("shop/product-detail", {
        product: product[0],
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getShopIndex = (req, res, next) => {
  fetchAllProducts()
    .then(([rows]) => {
      res.render("shop/index", {
        products: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

export const getCart = (req, res, next) => {
  getCartProducts((cart) => {
    fetchAllProducts((products) => {
      const cartProducts = [];
      for (const product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

export const postCart = (req, res, next) => {
  const prodId = req.body.productId;
  findProductById(prodId, (product) => {
    addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

export const postDeleteFromCart = (req, res, next) => {
  const prodId = req.body.productId;
  findProductById(prodId, (product) => {
    deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

export const getOrders = (req, res, next) => {
  fetchAllProducts((products) => {
    res.render("shop/orders", {
      products,
      pageTitle: "Your Orders",
      path: "/orders",
    });
  });
};

export const getCheckout = (req, res, next) => {
  fetchAllProducts((products) => {
    res.render("shop/checkout", {
      products,
      pageTitle: "Checkout",
      path: "/checkout",
    });
  });
};
