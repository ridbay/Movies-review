const express = require("express");

const app = express();
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.get("/", (req, res) => {
  res.render('home', {msg: "Handlebars are cool"});
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
