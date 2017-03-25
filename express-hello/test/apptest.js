var app = require('../app');
var expect = require('chai').expect;

//Supertest is a library to test apps, which have API endpoints or Request/Response based
//Supertest wraps "Superagent", HTTP request/response library for server side
var request = require("supertest");

//Initilise supertest to tes the module, which you want to test 
request = request(app);

//Make GET request to URL "/" and get a 200 res within 10ms
//describe -> testscenario
describe("Make GET request to URL '/' and get a 200 res within 10ms", function() {

  //it -> testcase
  it('Simple GET Request to root url', function(done) {
    request.get('/').expect(200, done);
  });

  it('GET Request with returning some data', function(done) {
    request.get('/')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err)
        }

        // expect(res.body).to.be.not.equal(undefined);
        expect(Object.keys(res.body).length).to.be.at.least(1);
        done();
      });
  });

  it('Testing for not defined route', function(done) {
    request.get('/_undefined_route').expect(404, done);
  });

}); //end of describe