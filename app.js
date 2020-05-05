const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const metric_routes = require("./api/routes/metric");

app.set("port", 3400);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//middleware for routes
app.use("/metric/v1", metric_routes);

//custom error handler for all routes
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.code || 500;
  const message = error.message;
  const data = error.data || [];
  res.status(status).json({ message: message, data: data });
});

const server = app.listen(app.get("port"), () => {
  const port = server.address().port;
  console.log("App listening on port " + port);
});