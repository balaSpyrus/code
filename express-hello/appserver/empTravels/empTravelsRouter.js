var router = require('express').Router();

//effective URL will /employee/:empid/travels/:travelid
// router.get("/:travelid?", function(req, res) {
router.get("/:empid/travels/:travelid?", function(req, res) {
  if (req.params.travelid) {
    console.log("Request received for travel: ", req.params.travelid,
      " of emp id: ", req.params.empid);

    res.status(200).json({
      empid: req.params.empid,
      travels: [{
        id: req.params.travelid
      }]
    });
  } else {
    console.log("Request received for all travel of emp id: ", req.params
      .empid);

    res.status(200).json({
      empid: req.params.empid,
      travels: [{
        id: 1
      }, {
        id: 2
      }]
    });
  }

});

module.exports = router;