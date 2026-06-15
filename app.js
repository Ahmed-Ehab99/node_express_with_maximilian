import express from "express";
import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";

const app = express();

app.use(express.urlencoded());
app.use(adminRoutes);
app.use(shopRoutes);

app.listen(3000);
