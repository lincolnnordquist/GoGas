// Pull in mongoose
const mongoose = require("mongoose");

// Pull in bcrypy
const bcrypt = require("bcrypt");

// Price schema
const priceSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    price: { type: Number, required: true },
    station_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Station",
        required: true,
    },
}, { timestamps: true });

// Review schema
const reviewSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: { type: Number, required: true },
    comment: { type: String, required: false },
    station_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Station",
        required: true,
    },
}, { timestamps: true });

// Gas station schema
const gasStationSchema = mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String },
    lat_lng: {type: Number},
    prices: { type: [priceSchema], required: false, default: [] },
    stationType: {type: String },
    reviews: { type: [reviewSchema], required: false, default: [] },
    pumpHours: { type: String }
});

// User schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
        required: true,
        unique: true,
    },
    password: { type: String, required: true },
    name: { type: String, required: true, unique: true},
    zip: { type: Number, required: true},
    favorites: { type: Array, default: [], required: false },
    admin: { type: Boolean, default: false, required: true },
});

// Encrypt password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    }
    catch (err) {
        next(err);
    }
}
);
// Model user schema
const User = mongoose.model("User", userSchema);
const Station = mongoose.model("Station", gasStationSchema);

// Export user model
module.exports = {
    User,
    Station
}