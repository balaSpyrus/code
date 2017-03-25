var router = require('express').Router();
var empProcessor = require('./employeeProcessor');

console.log("Emp processor: ", empProcessor);

//effective URL will /employee/:empid
router.get("/:empid", function(req, res) {
  console.log("Request received for emp id: ", req.params.empid);

  var empObj = empProcessor.getEmployee(req.params.empid);

  res.status(200).json(empObj);
});

//effective url  /employee/
router.post("/", function(req, res) {
  try {
    var emp = empProcessor.createNewEmployee(req.body);
    res.status(201).json(emp);
  } catch (err) {
    console.log("Error occurred in creating new employee: ", err);
    res.status(500).json({
      error: "Internal error occurred, please report"
    });
  }
});

module.exports = router;