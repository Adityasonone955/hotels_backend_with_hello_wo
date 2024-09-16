const mongoose = require ("mongoose")

// define the MongoDB connection URL
const mongoURL = "mongodb://localhost:27017/hotels";

// Set up MongoDB connection
mongoose.connect(mongoURL, { useNewUrlParser: true,
     useUnifiedTopology: true
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