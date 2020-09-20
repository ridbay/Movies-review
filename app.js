const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const methodOverride = require("method-override");

const app = express();
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/movie-reviews", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.engine(
  "handlebars",
  expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");

const reviews = require("./controllers/reviews")(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});


module.exports = app;