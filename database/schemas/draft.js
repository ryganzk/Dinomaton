const mongoose = require('mongoose');

module.exports = mongoose.model("Draft", new mongoose.Schema({
    id: { type: String },
    status: { type: String, default: 'congregating' },
    fighterList: { type: [{
        id: { type: String },
        fighterName: { type: String }
    }]}
}));