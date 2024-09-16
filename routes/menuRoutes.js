const express = require("express");
const router = express.Router();

const Menu = require("./../model/menu");


// Post route to add a Menu
router.post("/", async (req, res) => {
  try {
    const data = req.body // it contains a person data

    // create a new person document using the mongoose model
    const newMenu = new Menu(data);

    // Save the new person to the database
    const response = await newMenu.save();
    console.log("Data Saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errro: "Internal serve Error" });
  }

  // Get route to add a person
  router.get("/", async(req, res) => {
    try {
      const respon = await Menu.find();
      console.log("Data Fetched");
      res.status(200).json(respon);
    } catch (err) {
      console.log(err);
      res.status(500).json({error: "Internal server Error" });
    }
  });
});

// Get route to add a person worktype
router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType; //extract the work type from the URL parameter
    if (tasteType == "sweet" || tasteType == "sour" || tasteType == "salty") {
      const response = await Menu.find({ taste: tasteType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;