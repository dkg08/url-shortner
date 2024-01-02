const express = require("express");
const router = express.Router();
const {
  handleGenerateShortUrlId,
  handleRequestAnalytics,
} = require("../controllers/urlController");

router.post("/", handleGenerateShortUrlId);

router.get("/analytics/:id", handleRequestAnalytics);

module.exports = router;
