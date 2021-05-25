const mongoose = require('mongoose');

module.exports = mongoose.model("Super_Evolvers", new mongoose.Schema({
    num: { type: Number },
    element: { type: String },
    name: { type: String },
    class: { type: String },
    description: { type: String },
    sprite: { type: String },
    stats: { type: {
        LP: { type: Number },
        ATT: { type: Number },
        DEF: { type: Number },
        ACC: { type: Number },
        SPE: { type: Number }
    }},
    skills: { type: [{
        name: { type: String },
        type: { type: String, default: null },
        baseDamage: { type: Number, default: 0 },
        fpCost: { type: Number },
        effect: { type: {
            description: { type: String },
            rate: { type: Number, default: 100 }
        }}
    }]},
    support: { type: {
        supportPosition: { type: String },
        ATT: { type: Number },
        DEF: { type: Number },
        ACC: { type: Number },
        SPE: { type: Number }
    }, default: [] },
    misc: { type: {
        properName: { type: String, default: null },
        length: { type: {
            feet: { type: Number },
            meters: { type: Number },
            overall: { type: String }
        }}
    }}
}));
