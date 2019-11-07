const _ = require("lodash");

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World from Express");
});

app.post("/test", (req, res) => {
  res.send(req.body);
});

app.post("/addition", (req, res) => {
  let result = req.body.number1 + req.body.number2;

  res.send(200, result);
});

app.post("/post", (req, res) => {
  let array = [1, 2, 3, 4, 5];

  array.push(req.body.item);

  res.send(array);
});

app.delete("/delete", (req, res) => {
  let array = [1, 2, 3, 4, 5];

  _.remove(array, e => {
    return e === req.body.item;
  });

  res.send(array);
});

app.put("/put", (req, res) => {
  let array = [1, 2, 3, 4, 5];
  let result = array.map(item =>
    item === req.body.item ? req.body.change : item
  );
  res.send(result);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
