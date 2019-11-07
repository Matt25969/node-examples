const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const first = require("./routes/first");
const second = require("./routes/second");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

//connect to mongodb through mongoose
mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// Use Routes
app.use("/first", first);
app.use("/second", second);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
