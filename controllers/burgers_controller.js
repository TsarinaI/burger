var express = require("express");
var router = express.Router();

var burger = require("../models/burger.js")



// Post function to make new burger
router.post("/api/burgers", function (req, res) {
    console.log("testing", req.body)
    burger.insertOne([
        "burger_name", "devoured"
    ], [
            req.body.burger_name, false/////here
        ], function (results) { ////here
            res.redirect("/")
        })
})

router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({
        devoured: true
    }, condition, function (result) {
        if (result.changedRows === 0) {
            // if no rows were changed (id doesnt exist), send 404 message
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});
// Using /"
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var burgersObj = {
            burgers: data
        };
        console.log(burgersObj);
        res.render("index", burgersObj);
    });
});
// Exporting routes for server.js
module.exports = router;