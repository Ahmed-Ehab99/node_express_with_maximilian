const mongoDb = require("mongodb");
const getDb = require("../utils/database").getDb;

const ObjectId = mongoDb.ObjectId;

class User {
  constructor(id, username, email, cart) {
    this._id = id;
    this.name = username;
    this.email = email;
    this.cart = cart;
  }

  save() {
    const db = getDb();
    return db.collection("user").insertOne(this);
  }

  addToCart(product) {
    const currentItems = this.cart ? this.cart.items : [];

    const cartProductIndex = currentItems.findIndex((cartProduct) => {
      return cartProduct.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...currentItems];

    if (cartProductIndex >= 0) {
      newQuantity = currentItems[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = {
      items: updatedCartItems,
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(userId) {
    const db = getDb();
    return db.collection("users").findOne({ _id: new ObjectId(userId) });
  }
}

module.exports = User;
