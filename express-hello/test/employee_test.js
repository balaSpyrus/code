var app = require('../app');
var expect = require('chai').expect;

//Supertest is a library to test apps, which have API endpoints or Request/Response based
//Supertest wraps "Superagent", HTTP request/response library for server side
var request = require("supertest");

//Initilise supertest to tes the module, which you want to test 
request = request(app);

//Make GET request to URL "/" and get a 200 res within 10ms
//describe -> testscenario
describe("Employee Resource Testing Suite", function() {

  it('Post a employee record', function(done) {
    var empObj = {
      'name': "Mukesh Ambani",
      age: '54',
      sal: 1,
      dept: 'management',
      email: 'mambanisr@rel.in'
    };

    request.post("/employee")
      .send(empObj)
      .expect(201)
      .end(function(err, res) {
        if (err) {
          done(err)
        }

        expect(res.body.empid).to.be.not.equal(undefined);
        expect(Object.keys(res.body).length).to.be.at.least(6);

        request.get("/employee/" + res.body.empid)
          .expect(200)
          .end(function(err, res) {
            expect(res.body.name).to.be.equal(empObj.name);
            expect(res.body.age).to.be.equal(empObj.age);
            expect(res.body.sal).to.be.equal(empObj.sal);
            expect(res.body.dept).to.be.equal(empObj.dept);
            expect(res.body.email).to.be.equal(empObj.email);

            done();
          });
      });
  });

}); //end of describe