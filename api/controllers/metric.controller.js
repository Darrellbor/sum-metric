const Storage = require("node-storage");
const singlyLinkedList = require("../utils/singlyLinkedList");

const store = new Storage("../utils/metricVals.txt");

module.exports.addMetricCtrl = (req, res, next) => {
  const value = Math.round(req.params.key);
  let error;

  if (!value || isNaN(value)) {
    error = new Error("A numeric value is required!");
    error.code = 400;
    return next(error);
  }

//store.remove("metrics");

  const metric = {
    date: new Date(),
    value
  };

  if (!store.get("metrics")) {
    const linkedList = new singlyLinkedList();
    linkedList.add(metric);
    store.put("metrics", JSON.stringify(linkedList));
  } else {
    const retrivedList = JSON.parse(store.get("metrics"));
    let linkedList = new singlyLinkedList();
    Object.assign(linkedList, retrivedList);
    linkedList.add(metric);
    store.put("metrics", JSON.stringify(linkedList));
  }
  console.log(metric, store.get("metrics"));

  res.status(201).json("Metric value sucessfully created");
};

module.exports.fetchMetricCtrl = (req, res, next) => {};
