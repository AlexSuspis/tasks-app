const mongoose = require('mongoose');
require('dotenv').config();

const dbName = process.env.NODE_ENV === "test" ? "tasks-app-test" : "tasks-app";
const dbUrl = `mongodb://localhost:27017/${dbName}`;

const options = { useNewUrlParser: true, useUnifiedTopology: true }
const db = mongoose.createConnection();

module.exports.connect = async () => {
    await mongoose.connect(dbUrl, options)
        .then(() => console.log('Connected to', dbName, 'database'));
};

module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    };
    console.log("cleared all collections from database");
}

module.exports.disconnect = async () => {
    await mongoose.connection.close()
        .then(res => console.log('Disconnected from', dbName))
        .catch(err => console.log(err));
};