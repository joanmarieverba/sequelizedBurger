let express = require("express");

let router = express.Router();

// Requiring our models
let db = require("../models");


// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    db.burger.findAll({}).then(function (data) {
        let allBurgers = {
            burgers: data
        };
        console.log("index", allBurgers);
        res.render("index", allBurgers);
    });
});

router.post("/api/burgers", function (req, res) {
    console.log("req.body ", req.body.burger_name, req.body.devoured);
    db.burger.create({
        burger_name: req.body.burger_name, 
        devoured: 0
        }).then (function (result) {
            // Send back the ID of the new burger
            res.json({ id: result.insertId });
        })
        .catch (function (err) {
        // Whenever a validation or flag fails, an error is thrown
        res.json(err);
        });
});

router.put("/api/burgers/:id", function (req, res) {
    let burger_id = req.params.id;
    console.log("burger_id", burger_id);
    db.burger.update({ 
        devoured: true 
        }, {
        where: {
            id: burger_id 
        } 
        }).then(function (result) {
            res.send("updated");
        })
        .catch(function (err) {
            // Whenever a validation or flag fails, an error is thrown
            res.json(err);
        });
});

// Export routes for server.js to use.
module.exports = router;
