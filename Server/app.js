const compression = require("compression");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const ErrorHandler = require("./src/middlewares/error.handler.middleware");
const NotFound = require("./src/middlewares/not.found.middleware");
const path = require("path");
require("./src/config/connect.db.config");

const corsOptions = {
  origin: "http://localhost:5173", // Chỉ định frontend
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true, // Cho phép gửi cookie/token
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(compression());
app.use(helmet());
app.use(cookieParser());
// trong app.js hoặc server.js
app.use("/public/uploads", (req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});
app.use("/public/uploads", express.static("public/uploads"));

app.use("/api", require("./src/routers/index.route"));

app.use(NotFound);

app.use(ErrorHandler);

module.exports = app;
