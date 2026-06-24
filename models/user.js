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
    // const cartItem = this.cart.item.findIndex((item) => {
    //   return item._id === product._id;
    // });

    const updatedCart = {
      item: [{ productId: new ObjectId(product._id), quantity: 1 }],
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new Object(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(userId) {
    const db = getDb();
    return db.collection("users").findOne({ _id: new ObjectId(userId) });
  }
}

module.exports = User;
