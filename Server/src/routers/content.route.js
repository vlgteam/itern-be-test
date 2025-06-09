const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const controller = require("../controllers/homeContent.controller");

router.post("/", upload.single("image"), controller.createHomeContent);
router.get("/", controller.getAllHomeContents);
router.get("/:id", controller.getHomeContentById);
router.put("/:id", upload.single("image"), controller.updateHomeContent);
router.delete("/:id", controller.deleteHomeContent);

module.exports = router;
