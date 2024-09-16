const express = require('express');
const router = express.Router();
const Person = require("./../model/person");

// Post route to add a person
router.post('/', async (req, res) => {
    try {
      const data = req.body  // it contains a person data
      
      // create a new person document using the mongoose model
      const newPerson = new Person(data);

      // Save the new person to the database
      const response = await newPerson.save();
      console.log('Data Saved');
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({errro: 'Internal serve Error'  });
    }
})

// Get route to add a person
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({errro: "Internal server Error" });
  }
});

// Get route to add a person worktype
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //extract the work type from the URL parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
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

router.put('/:id',async (req, res) => { // id ko kuch bhi name de sakte hai
  try
   {
    const personID = req.params.id; // Extract the id from the URL parameter
    const updatedPersonData = req.body; // updated data for the person

    const response = await Person.findByIdAndUpdate(
      personID,
      updatedPersonData,
      {
        new: true,// R eturn the updated document
        runValidators: true, // Run Mongoose validaton
      }
    );
    
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log('Data Updated');
    res.status(200).json(response);

  } catch(err){ 
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

// Delete route to delete a person
router.delete('/:id', async(req, res) => {
  try{
    const personID = req.params.id; // Extract the id from the URL parameter

    // Assuming you have a person model
    const response = await Person.findByIdAndDelete(personID);
    if(!response){
      return res.status(404).json({error: 'Person not found '});
    }
    console.log('Data deleted');
    res.status(200).json({message: 'person Deleted Successfully'});
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
  
})

module.exports = router;