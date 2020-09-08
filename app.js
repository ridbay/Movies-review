const express = require("express");

const app = express();
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// MOCK ARRAY OF PROJECTS
let reviews = [
    { title: "Great Review", movieTitle: "Batman II" },
    { title: "Awesome Movie", movieTitle: "Titanic" }
  ]

app.get("/", (req, res) => {
  res.render('reviews-index', {reviews: reviews});
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
