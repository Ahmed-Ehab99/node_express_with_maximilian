import { Router } from "express";
import {
  getCart,
  getCheckout,
  getOrders,
  getProduct,
  getProducts,
  getShopIndex,
  postCart,
  postDeleteFromCart,
} from "../controllers/shop.js";

const router = Router();

router.get("/", getShopIndex);
router.get("/products", getProducts);
router.get("/products/:productId", getProduct);

router.get("/cart", getCart);
router.post("/cart", postCart);
router.post("/cart-delete-item", postDeleteFromCart);

router.get("/orders", getOrders);

router.get("/checkout", getCheckout);

export default router;
