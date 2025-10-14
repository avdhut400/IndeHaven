// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");
// "mongodb://127.0.0.1:27017/wanderlust"
// require("dotenv").config();
// const MONGO_URL = process.env.MONGO_URL;

// main()
//   .then(() => {
//     console.log("connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }

// const initDB = async () => {
//   await Listing.deleteMany({});
//   initData.data=initData.data.map((obj)=>({...obj ,owner : "67e4421b2306a8ff1044ca51"}));
//   await Listing.insertMany(initData.data);
//   console.log("data was initialized");
// };

// initDB();


const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
require("dotenv").config();

// .env मध्ये MONGO_URL=mongodb+srv://username:password@cluster0.mongodb.net/ZerodhaDB?retryWrites=true&w=majority
const MONGO_URL = process.env.MONGO_URI;
console.log(MONGO_URL);
async function main() {
  try {
    // MongoDB connect
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB");

    // DB initialize
    await initDB();

    // Connection close (optional)
    mongoose.connection.close();
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

const initDB = async () => {
  // Delete old listings
  await Listing.deleteMany({});

  // Add owner field to each item
  const dataWithOwner = initData.data.map((obj) => ({
    ...obj,
    owner: "67e4421b2306a8ff1044ca51",
  }));

  // Insert data
  await Listing.insertMany(dataWithOwner);
  console.log("Data was initialized");
};

// Run main
main();
