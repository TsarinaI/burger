var express = require("express");
var router = express.Router();

var burger = require("../models/burger.js")

// Using "*", I learned in tutoring, is a better catch-all than "/"
router.get("*", function (req, res) {
    burger.selectAll(function(data) {
        var burgersObj = {
            burgers: data
        };
        console.log(burgersObj);
        res.render("index", burgersObj);
    });
});

// Post function to make new burger
router.post("/api/burgers", function(req, res) {
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function(req, res) {
        res.redirect("*")
    })
})

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows === 0) {
            // if no rows were changed (id doesnt exist), send 404 message
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Exporting routes for server.js
module.exports = router;