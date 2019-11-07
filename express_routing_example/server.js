const express = require("express");
const bodyParser = require("body-parser");

const first = require("./routes/first.js");
const second = require("./routes/second");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use Routes
app.use("/first", first);
app.use("/second", second);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
