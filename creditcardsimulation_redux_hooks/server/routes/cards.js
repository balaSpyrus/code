var express = require('express');
var cardUtil = require('./cardUtil')
var CardModel = require('../schema/cardSchema')

var router = express.Router();
router.get('/getCards', function (req, res) {

    CardModel.find((err, data) => {
        if (err)
            res.json({ err: err.toString() })
        res.json(data)
    })
});

router.get('/delete/:id', function (req, res) {
    let cardNum = cardUtil.decryptCard(req.params.id)

    CardModel.deleteOne({ number: cardNum }, (err) => {
        if (err)
            res.json({ err: err.toString() })
        res.json({ msg: 'Deleted Successfully' });
    });
});

router.post('/addCard', function (req, res) {
    //Check if all fields are provided and are valid:

    let cc = new CardModel({
        name: req.body.name,
        number: req.body.number,
        cvv: req.body.cvv,
        year: req.body.year,
        month: req.body.month,
        type: req.body.type,
    })
    cc.save(function (error) {
        if (error) {
            res.json({ msg: error });
        }
        res.json({ msg: "card added successfully" });
    });
});

//export this router to use in our index.js
module.exports = router;