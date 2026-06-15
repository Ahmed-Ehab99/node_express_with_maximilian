import express from "express";
import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";

const app = express();

app.use(express.urlencoded());
app.use("/admin", adminRoutes); // each route here is /admin/...
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).send("<h1>Page Not Found!</h1>");
});

app.listen(3000);
