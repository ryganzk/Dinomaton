const mongoose = require('mongoose');

module.exports = mongoose.model("Match", new mongoose.Schema({
    idChallenger: { type: String },
    idChallengee: { type: String },
    challenger: { type: String },
    challengee: { type: String },
    status: { type: String, default: 'pending'},
    winner: { type: String, default: 'N/A' },
    loser: { type: String, default: 'N/A' }
}));