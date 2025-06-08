/**
 * Làm theo signleton design pattern
 * Dựa vào type để kết nối với server
 * Set up debug trong mongoose
 */

const {
  db: { password, name },
} = require("./server.config");
const mongoose = require("mongoose");

const connectionString = `mongodb+srv://dattien52003:${password}@cluster.dwvej4s.mongodb.net/${name}?retryWrites=true&w=majority&appName=Cluster`;

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    if (type === "mongodb") {
      if (1 === 1) {
        mongoose.set("debug", true);
        mongoose.set("debug", { color: true });
      }

      mongoose
        .connect(connectionString)
        .then((_) => {
          console.log(`Connect to mongodb successfully`);
        })
        .catch((err) => {
          console.log(`Error:::${err.message}`);
        });
    }
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const dbInstance = Database.getInstance();

module.exports = dbInstance;
