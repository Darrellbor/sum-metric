const express = require("express");
const router = express.Router();

//validators
const metricVal = require("./validators/metric");

//controllers
const metricCtrl = require("../controllers/metric.controller");

//routes
router.route("/metric/:key").post(metricVal.metricValidator, metricCtrl.addMetricCtrl);
router.route("/metric/:key/sum").get(metricCtrl.fetchMetricCtrl);

module.exports = router;