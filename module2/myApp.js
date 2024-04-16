let express = require("express");
let bodyParser = require("body-parser");
require("dotenv").config();
let app = express();

app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
};

app.use(logger);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "Hello json".toUpperCase() });
  } else {
    res.json({ message: "Hello json" });
  }
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

app
  .route("/name")
  .get((req, res) => {
    const firstName = req.query.first; // Extract first name from query string
    const lastName = req.query.last; // Extract last name from query string

    // Check if both first name and last name are provided in the query string
    if (!firstName || !lastName) {
      return res.status(400).json({ error: "Both first and last name parameters are required" });
    }

    // Construct the full name
    const fullName = `${firstName} ${lastName}`;

    // Respond with a JSON document containing the full name
    res.json({ name: fullName });
  })
  .post((req, res) => {
    // Handle POST request

    console.log(`{ name: ${req.query.first} ${req.query.last} }`);
    res.json({ name: `${req.query.first} ${req.query.last}` });
  });

module.exports = app;
