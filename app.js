const express = require("express");
const port = process.env.PORT || 8000;
const app = express();

const db = require("./configs/mongoose");

const expressLayouts = require("express-ejs-layouts");

const path = require("path");

// Static Files
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "./assets")));
app.use(express.urlencoded());
app.use(express.json());

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// EJS Layouts
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Router
app.use("/", require("./router"));

// Starter
app.listen(port, function (err) {
  if (err) {
    console.log(`err at loading application`);
  }
  console.log(`Server is running at port ${port}`);
});
