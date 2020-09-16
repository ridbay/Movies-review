const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const should = chai.should();
const Review = require("../models/review");

const sampleReview = {
  title: "This is a good review",
  movieTitle: "Iron Man",
  description: "A great review of Iron man",
};

chai.use(chaiHttp);

// tell mocha you want to test Reviews
describe("Reviews", () => {
  // make a name for the test
  it("should index ALL reviews on / GET", (done) => {
    // use chai-http to make a request to the server
    chai
      .request(server)
      // send a GET request to root route
      .get("/")
      // wait for response
      .end((err, res) => {
        // check that the response status is = 200 (success)
        res.should.have.status(200);
        // check that the response is a type html
        res.should.be.html;
        // end this test and move onto the next.
        done();
      });
  });

  // TEST NEW
  it("should display new form on /reviews/new GET", (done) => {
    chai
      .request(server)
      .get(`/reviews/new`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });


  //Dump truck to delete all sample reviews created after each test above

  // describe("Reviews", () => {
  //   after(() => {
  //     Review.deleteMany({ title: "This is a good review"}).exec(
  //       (err, reviews) => {
  //         console.log(reviews);
  //         reviews.remove();
  //       }
  //     );
  //   });
  // });
 
  //SHOW A SINGLE REVIEW
  it("should show a single review on /reviews/<id> GET", (done) => {
    let review = new Review(sampleReview);
    review.save((err, data) => {
      chai
        .request(server)
        .get(`/reviews/${data._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
    });
  });

  //TEST EDIT
  it("should edit a SINGLE review on /reviews/<id>/edit GET", (done) => {
    let review = new Review(sampleReview);
    review.save((err, data) => {
      chai
        .request(server)
        .get(`/reviews/${data._id}/edit`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
    });
  });
 
 
  //TEST CREATE
  it("should create a SINGLE review on /reviews POST", (done) => {
    chai
      .request(server)
      .post("/reviews")
      .send(sampleReview)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });

  //TEST UPDATE

  it("should update a SINGLE review on /reviews/<id> PUT", (done)=>{
    let review = new Review(sampleReview);
    review.save((err,data) => {
      chai.request(server)
      .put(`/reviews/${data._id}?_method=PUT`)
      .send({'title': 'Updating the title'})
      .end((err,res)=>{
        res.should.have.status(200);
        res.should.be.html;
        done();
      })
    })
  })

  // TEST DELETE
  it("should delete a SINGLE review on /reviews/<id> DELETE", (done)=>{
    let review = new Review(sampleReview);
    review.save((err,data)=>{
      chai.request(server)
      .delete(`/reviews/${data._id}?method=DELETE`)
      .end((err,res)=> {
        res.should.have.status(200);
        res.should.be.html
        done()
      })
    })
  })
});



  //Dump truck to delete all sample reviews created after each test above
after(() => {
  Review.deleteMany({ title: "This is a good review"}, (err,result)=>{
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  })
});
