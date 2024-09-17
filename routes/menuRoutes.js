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
});

  // Get route to add a person
  router.get("/", async(req, res) => {
    try {
      const data = await Menu.find();
      console.log("Data Fetched");
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({error: "Internal server Error" });
    }
});

// Get route to add a person worktype
router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste; //extract the work type from the URL parameter
    if (taste == "sweet" || taste == "spicy" || taste == "salty") {
      const response = await Menu.find({ taste: taste });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid menu item " });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.put("/:id", async (req, res) => {
  // id ko kuch bhi name de sakte hai
  try {
    const menuID = req.params.id; // Extract the id from the URL parameter
    const updatedMenuData = req.body; // updated data for the person

    const response = await Person.findByIdAndUpdate(menuID, updatedMenuData, 
    {
      new: true, // R eturn the updated document
      runValidators: true, // Run Mongoose validaton
    }
  );

    if (!response) {
      return res.status(404).json({ error: "MenuItem not found" });
    }

    console.log("Data Updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

// Delete route to delete a person
router.delete('/:id', async(req, res) => {
  try{
    const menuID = req.params.id; // Extract the id from the URL parameter

    // Assuming you have a person model
    const response = await Menu.findByIdAndDelete(menuID);
    if(!response){
      return res.status(404).json({error: 'Menu item not found '});
    }
    console.log('Data deleted');
    res.status(200).json({message: 'Item Deleted Successfully'});
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
  
})

module.exports = router;