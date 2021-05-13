const mongoose = require('mongoose');

module.exports = mongoose.model("Vivosaur", new mongoose.Schema({
    num: { type: Number },
    element: { type: String },
    name: { type: String },
    class: { type: String },
    description: { type: String },
    stats: { type: {
        LP: { type: Number },
        ATT: { type: Number },
        DEF: { type: Number },
        ACC: { type: Number },
        SPE: { type: Number }
    }},
    skills: { type: [{
        name: { type: String },
        baseDamage: { type: Number, default: 0 },
        fpCost: { type: Number },
        effect: { type: {
            description: { type: String },
            rate: { type: Number, default: 100 }
        }}
    }]},
    support: { type: {
        supportPosition: { type: String },
        ATT: { type: String },
        DEF: { type: String },
        ACC: { type: String },
        SPE: { type: String }
    }},
    misc: { type: {
        genus: { type: String },
        group: { type: String },
        era: { type: String },
        diet: { type: String },
        discovered: { type: String }
    }}
}));
