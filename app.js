const mongoose = require("mongoose");
const express = require("express");

const app = express();
mongoose.connect("mongodb://localhost/movie-reviews", {
  useNewUrlParser: true,
});
const Review = mongoose.model("Review", {
  title: String,
  movieTitle: String,
});

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// MOCK ARRAY OF PROJECTS
// let reviews = [
//     { title: "Great Review", movieTitle: "Batman II" },
//     { title: "Awesome Movie", movieTitle: "Titanic" }
//   ]

app.get("/", (req, res) => {
  Review.find()
    .then((reviews) => {
      res.render("reviews-index", { reviews: reviews });
    })
    .catch((err) => {
      console.log(err);
    });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
