// Pull in mongoose
const mongoose = require("mongoose");
const db = mongoose.connection;

// Connect to mongodb
async function connect (user, pass) {
    let connectionString = `mongodb+srv://${user}:${pass}@gogas.i8neu4c.mongodb.net/?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (err) {
        console.log("Error connecting to MongoDB", err);
    }
}

// On connection to mongodb
function onConnect(callback) {
    db.once("open", () => {
        console.log("Successfully connected to mongoDB");
        callback();
    });
}

// Export functions
module.exports = {
    connect,
    onConnect,
}