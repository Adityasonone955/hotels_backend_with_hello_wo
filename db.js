const mongoose = require ("mongoose")
require('dotenv').config();

//define the MongoDB connection URL

 const mongoURL = process.env.MONGODB_URL_LOCAL;  // local mongodb compass connection
//  const mongoURL = process.env.MONGODB_URL; // online mongodb atlas connection
  
// Set up MongoDB connection
 mongoose.connect(mongoURL ,{
 // useNewUrlParser: true,
    //  useUnifiedTopology: true
     });

// Get the default connetion
// Mongoose maintains a defaul connection object representing the MongoDB connection .
const db = mongoose.connection;


// Define event listener for database connection
db.on("connected", () => {
  console.log("Connected to MongoDB Server");
});

db.on('error', (err) => {
    console.log(' MongoDB Connected Error', err);
})

db.on("disconnected", () => {
  console.log("MongoDB Server disonnected");
});


// export database connection 
module.exports = db;