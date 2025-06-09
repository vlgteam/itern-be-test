const express = require("express");
const router = express.Router();

// Trang chủ (render home.ejs)
router.get("/", (req, res) => {
  res.render("home");
});

module.exports = router;
