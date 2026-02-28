const express = require("express");

const router = express.Router();

router.post("/get-file-from-data64", (req, res) => {
  res.json(["😀", "😳", "🙄"]);
});

router.get("/", (req, res) => {
  res.json("server");
});

module.exports = router;
