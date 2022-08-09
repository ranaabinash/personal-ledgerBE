const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

const dbURI = "mongodb://localhost:27017/ledger";

mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(3001, "localhost", () => {
      console.log(`Connected to DB`);
      console.log(`Server listening at http://localhost:3001/`);
    });
  })
  .catch((err) => console.log(err));

app.set("view engine", "ejs"); // For view that generates Server Side rendering
app.use(morgan("dev")); // For the console logging activites
app.use(express.urlencoded({ extended: true })); // For parsing the response body
app.use(express.static("public")); // For using static files like image or css in render

app.get("/", (req, res) => {
  res.send("Hello client");
});

// For the invalid path request
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
