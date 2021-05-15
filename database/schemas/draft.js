const mongoose = require('mongoose');

module.exports = mongoose.model("Draft", new mongoose.Schema({
    id: { type: String },
    status: { type: String, default: 'congregating' },
    minFighters: { type: Number, default: 8 },
    maxFighters: { type: Number, default: 12 },
    fighterList: { type: [{
        id: { type: String },
        fighterName: { type: String }
    }]}
}));