const mongoose = require('mongoose');

module.exports = mongoose.model("User", new mongoose.Schema({
    id: { type: String },
    tag: { type: String },
    registeredAt: { type: Number, default: Date.now() }
}));