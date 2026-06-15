import express from "express";
import path from "path";
import rootDir from "../utils/path.js";

const router = express.Router();

router.use("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post("/product", (req, res, next) => {
  console.log(req.body.title);
  res.redirect(`/`);
});

export default router;
