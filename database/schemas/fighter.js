const mongoose = require('mongoose');

module.exports = mongoose.model("Fighter", new mongoose.Schema({
    id: { type: String },
    fighterName: { type: String },
    licenseStatus: {type: String, default: 'certified'},
    battleWins: { type: Number, default: 0 },
    battleLosses: { type: Number, default: 0 },
    draftStats: {
        draftParticipations: { type: Number, default: 0 },
        draftVictories: { type: Number, default: 0 },
        draftQualifiedFinals: { type: Number, default: 0 },
        draftQualifiedSemis: { type: Number, default: 0 }        
    },
    currentDraft: {
        division: { type: String, default: 'N/A' },
        currentWins: { type: Number, default: 0  },
        currentLosses: { type: Number, default: 0  },
        takenSaurs: { type: [String] }
    },
    favoriteSaur: { type: String }
}));