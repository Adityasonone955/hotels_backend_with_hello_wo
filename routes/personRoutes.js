const express = require('express');
const router = express.Router();
const Person = require("./../model/person");
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

//post route sign up 
router.post('/signup', async (req, res) => {
    try {
      const data = req.body  // it contains a person data
      
      // create a new person document using the mongoose model
      const newPerson = new Person(data);

      // Save the new person to the database
      const response = await newPerson.save();
      console.log('Data Saved');
      
      const payload = {
        id: response.id,
        username: response.username
      }
      console.log(JSON.stringify(payload));
      const token = generateToken(payload);
      console.log("Token is :", token);

      res.status(200).json({response: response, token: token});
    } catch (err) {
      console.log(err);
      res.status(500).json({errro: 'Internal serve Error'  });
    }
})

// Login Route
router.post('/login',async(req, res) => {
  try {
    // Extract username and password from request body
    const {username, password} = req.body;

    // Find the user by username
    const user = await Person.findOne({username: username});

    // if user does not exist ro password does not match, return error
    if( !user || !(await user.comparePassword(password))){
      return res.status(401).json({error: 'Invalid username or password'});
    }

    
    // generate Token
    const payload = {
      id : user.id,
      username: user.username
    }
    const token = generateToken(payload);

    // return token as response
    res.json({token})
  }catch(err){
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

// Profile routes
router.get('/profile', jwtAuthMiddleware , async (req, res) => {
  try {
    const userData = req.user;
    console.log( "User Data: ", userData);
    
    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json({user});
  }catch(err){
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
})


// Get route to add a person
router.get("/", jwtAuthMiddleware ,async (req, res) => {  // jwtAut... ko token chahiye uske bina vo acess nahi dega
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