const express = require("express");
const router = express.Router();

// Header роутер
const {
  getHeaderData,
  postHeaderData,
} = require("../controllers/headerDataController");
router.route("/header").get(getHeaderData).post(postHeaderData);

// HeaderPerson роутер
const {
  getHeaderPersonData,
  postHeaderPersonData,
} = require("../controllers/headerPersonDataController");
router.route("/headerPerson").get(getHeaderPersonData).post(postHeaderPersonData);

module.exports = router;
