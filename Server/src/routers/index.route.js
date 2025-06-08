const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.route"));
router.use("/content", require("./content.route"));

module.exports = router;
