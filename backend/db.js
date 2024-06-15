const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://janeeshthelegend:abcdefgh@jmart.9apypun.mongodb.net/Jmart?retryWrites=true&w=majority&appName=Jmart";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Added for better connection handling
    });
    console.log("Jmart MongoDB connected");

    const db = mongoose.connection.db;
    const item = db.collection("items");
    const category = db.collection("itemsCat");

    const data = await item.find({}).toArray();
    const catdata = await category.find({}).toArray();
    
    global.items = data;
    global.itemsCat= catdata;

    console.log(global.itemsCat);

  } catch (err) {
    console.error("--- Error connecting to MongoDB:", err);
  }
};

module.exports = mongoDB;
