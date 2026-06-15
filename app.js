import express from "express";
import path from "path";
import { get404 } from "./controllers/error.js";
import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import rootDir from "./utils/path.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminRoutes); // each route here is /admin/...
app.use(shopRoutes);
app.use(get404);

app.listen(3000);
