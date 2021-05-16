const mongoose = require('mongoose');

module.exports = mongoose.model("Draft", new mongoose.Schema({
    id: { type: String },
    status: { type: String, default: 'congregating' },
    minFighters: { type: Number, default: 8 },
    maxFighters: { type: Number, default: 12 },
    vivoNum: { type: Number, default: 2 },
    fighterList: { type: [{
        id: { type: String },
        fighterName: { type: String }
    }]},
    nextPickNum: { type: Number, default: 0 }
}));