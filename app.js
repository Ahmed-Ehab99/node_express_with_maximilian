require("dotenv").config();
const path = require("path");
const express = require("express");
const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const mongoConnect = require("./utils/database").mongoConnect;

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// find current user
app.use((req, res, next) => {
  next();
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
