const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://user-dev-tinder:test1234@namestenode.b8jyd.mongodb.net/devTinder");
}

// connectDB().then(() => {
//     console.log('Database connection established..')
// }).catch(e => {
//     console.error ('Failed while connecting with DB: ', e);
// });

module.exports = connectDB;

