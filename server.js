const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth/authRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

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

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.set("view engine", "ejs"); // For view that generates Server Side rendering
app.use(morgan("dev")); // For the console logging activites
app.use(express.urlencoded({ extended: true })); // For parsing the response body
app.use(express.static("public")); // For using static files like image or css in render
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("Hello client");
});

// Auth routes
app.use(authRoutes);

app.get("/set-cookies", (req, res) => {
  res.cookie("newUser", false);
  res.cookie("isEmployee", true, { maxAge: 3600000 * 24, httpOnly: true });
  res.send("You got the cookie");
});

app.get("/get-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);
});

// For the invalid path request
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
