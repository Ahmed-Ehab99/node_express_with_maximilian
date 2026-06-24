const mongodb = require("mongodb");

// Pulls out the MongoClient class from the driver. This is the main class responsible for creating a connection to your MongoDB server.
const MongoClient = mongodb.MongoClient;
// Declares a module-level variable to hold the database connection once it's established. It starts as undefined. The underscore _ is a naming convention that signals "this is private, don't use it directly from outside."
let _db;

/**
 * connect to your MongoDB Atlas cluster using the connection string. The string contains your username, password, and cluster URL. Returns a Promise.
 * When the connection succeeds, the Promise resolves with a client object that represents the active connection to the MongoDB server.
 * Calls .db() on the client to get a reference to the actual database. Since no name is passed, it uses the default database defined in the connection string. This reference is stored in _db so the rest of the app can use it later.
 * Calls the function that was passed in — this is your signal that the DB is ready. In app.js you pass app.listen(3000) here so the server only starts after the database is connected.
 */
const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://a7medeha6:ngBs09LUq45Zn1F3@cluster0.a9fuyst.mongodb.net/?appName=Cluster0"
  )
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      callback();
    })
    .catch((err) => console.log(err));
};

/**
 * call whenever they need to run a database operation (find, insert, delete, etc.).
 * If the connection was already established and _db is set, return it immediately. This is called the singleton pattern — you only connect once, then reuse the same connection everywhere.
 * If getDb() is called before mongoConnect() has finished, _db is still undefined, so this throws an error to make the problem obvious instead of silently failing.
 */
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
