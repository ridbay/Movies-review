const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
 
const app = express();
mongoose.connect("mongodb://localhost/movie-reviews", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Review = mongoose.model("Review", {
  title: String,
  movieTitle: String,
  description: String,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.engine('handlebars', expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');

// MOCK ARRAY OF PROJECTS
// let reviews = [
//     { title: "Great Review", movieTitle: "Batman II" },
//     { title: "Awesome Movie", movieTitle: "Titanic" }
//   ]

app.get("/", (req, res) => {
  Review.find({})
    .lean()
    .then((reviews) => {
      res.render("reviews-index", { reviews: reviews });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/reviews/new", (req, res) => {
  res.render("reviews-new", {});
});

app.post("/reviews", (req, res) => {
  Review.create(req.body)
    .then((review) => {
      res.redirect(`/reviews/${review._id}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

app.get("/reviews/:id", (req,res)=>{
    Review.findById(req.params.id)
    .then((review)=>{
        res.render('reviews-show', {review: review})
    }).catch(err=>{
        console.log(err.message)
    })
})
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
