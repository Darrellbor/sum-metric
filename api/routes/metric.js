const express = require("express");
const router = express.Router();

//controllers
const metricCtrl = require("../controllers/metric.controller");

//routes
router.route("/metric/:key").post(metricCtrl.addMetricCtrl);
router.route("/metric/:key/sum").get(metricCtrl.fetchMetricCtrl);

module.exports = router;