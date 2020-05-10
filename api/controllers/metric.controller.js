
const path = require("path");
const Storage = require("node-storage");
const { validationResult } = require("express-validator");
const singlyLinkedList = require(path.join(__dirname,"singlyLinkedList.js"));

const store = new Storage("./api/utils/metricVals.txt");

module.exports.addMetricCtrl = (req, res, next) => {
  let error;
  let key = req.params.key;

  //error handling
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    error = new Error("Validation Failed");
    error.code = 400;
    error.data = errors.array();
    return next(error);
  }

  const value = Math.round(req.body.value);

  const metric = {
    date: new Date(),
    value,
    key,
  };

  if (!store.get("metrics")) {
    const linkedList = new singlyLinkedList();
    linkedList.add(metric);
    store.put("metrics", JSON.stringify(linkedList));
  } else {
    const retrivedList = JSON.parse(store.get("metrics"));
    let linkedList = new singlyLinkedList();
    Object.assign(linkedList, retrivedList);
    linkedList.addFromFront(metric);
    store.put("metrics", JSON.stringify(linkedList));
  }

  res.status(201).json({ message: "Metric value sucessfully created" });
};

module.exports.fetchMetricCtrl = (req, res, next) => {
  let error;
  let key = req.params.key;

  if (!store.get("metrics")) {
    error = new Error(0);
    error.code = 204;
    return next(error);
  }

  const retrivedList = JSON.parse(store.get("metrics"));
  let linkedList = new singlyLinkedList();
  Object.assign(linkedList, retrivedList);
  const itemsToRemove = [];

  const ONE_HOUR = 60 * 60 * 1000;
  const anHourAgo = Date.now() - ONE_HOUR;
  let sum = 0;
  let counter = 0;
  let current = linkedList.head;

  while (counter < linkedList.length) {
    
    if (key === current.val.key) {
      if (new Date(current.val.date).getTime() > anHourAgo)
        sum += current.val.value;
      else itemsToRemove.push(counter);
    }

    current = current.next;
    counter++;
  }

  for (let i = 0; i < itemsToRemove.length; i++) {
    linkedList.removeFromIndex(itemsToRemove[i]);
  }

  store.put("metrics", JSON.stringify(linkedList));

  res.status(200).json({ sum: sum });
};
