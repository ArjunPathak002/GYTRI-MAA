const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB is Connected Successfully");

        const fetched_data =  mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();
        const food_category = mongoose.connection.db.collection("food_category");
        const catData = await food_category.find({}).toArray();

        global.food_items = data;
        global.food_category = catData;
       
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectDB;
