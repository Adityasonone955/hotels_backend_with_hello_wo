const express = require("express");
const app = express();
const db = require ('./db') // import from db.js file


const bodyParser = require("body-parser");
app.use(bodyParser.json()); // body-parser store a json formate in req.body

app.get("/", function(req, res) {
  res.send("Wellcome to Hotel");
});     

// Import the router files from personRoutes file
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require("./routes/menuRoutes");

// use the routers
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
})