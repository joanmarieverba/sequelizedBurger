let express = require("express");
let bodyParser = require("body-parser");

let PORT = process.env.PORT || 8080;

let app = express();

// Requiring our models for syncing
var db = require("./models");


// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Set Handlebars.
let exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
// let routes = require("./controllers/burgers_controller.js");

// Routes
// =============================================================
require("./routes/api-routes.js")(app);



// app.use(routes);


db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});

