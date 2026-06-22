const path = require("path");
const express = require("express");
const errorController = require("./controllers/error");
const sequelize = require("./utils/database");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// find current user
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// associations
// User <=> Product
User.hasMany(Product);
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// User <=> Cart
User.hasOne(Cart);
Cart.belongsTo(User);
// Cart <=> Product
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
// User <=> Order
User.hasMany(Order);
Order.belongsTo(User);
// Order <=> Product
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  // .sync({ force: true }) // to sync with tables and override any data we stored
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Max", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
