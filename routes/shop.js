import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url); // return the url of current file and convert it to normal path
const __dirname = path.dirname(__filename); // extract the path of the folder

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
});

export default router;
