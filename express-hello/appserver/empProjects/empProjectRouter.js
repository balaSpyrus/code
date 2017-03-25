var router = require('express').Router();

//effective URL will /employee/:empid/projects/:projectId
// router.get("/", function(req, res) {
router.get("/:empid/projects", function(req, res) {
  console.log("Request received for all projects of emp id: ", req.params
    .empid);

  res.status(200).json({
    empid: req.params.empid,
    projects: [{
      id: 1
      }, {
      id: 2
      }]
  });
});

//effective URL will /employee/:empid/projects/:projectId
// router.get("/:projectid", function(req, res) {
router.get("/:empid/projects/:projectid", function(req, res) {
  console.log("Request received for project: ", req.params.projectid,
    " of emp id: ", req.params.empid);

  res.status(200).json({
    empid: req.params.empid,
    projects: [{
      id: req.params.projectid
      }]
  });

});



module.exports = router;