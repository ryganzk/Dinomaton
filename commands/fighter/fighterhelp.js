const Discord = require('discord.js');

module.exports = {
    name: 'fighterhelp',
    administrator: false,

    async execute(client, message, args) {
        message.channel.send(`__FIGHTER COMMANDS__\ncreatelicense - ISSUES YOUR VERY OWN FIGHTERS LICENSE\n`
         + `licenseinfo *fighter* - CHECK THE DATA OF ANOTHER FIGHTER\nsetname *name* - SETS YOUR FIGHTER NAME `
         + `TO THE NAME SPECIFIED (MUST BE UNDER 20 CHARACTERS)\n\n__BATTLE COMMANDS__\nbattle *fighter* - CHALLENGES `
         + `THE SPECIFIED FIGHTER TO BATTLE\naccept *fighter* - ACCEPTS A CHALLENGE ISSUED BY THE SPECIFIED FIGHTER\nreject `
         + `*fighter* - REJECTS A CHALLENGE ISSUED BY THE SPECIFIED FIGHTER\nbackdown *fighter* - CANCELS YOUR ISSUED `
         + `CHALLENGE WITH THE SPECIFIED USER\nstart *fighter* - BEGINS YOUR BATTLE WITH A USER WHO'S ACCEPTED YOUR `
         + `CHALLENGE\nvictory - GIVES YOURSELF THE WIN\ndefeat - GIVES YOURSELF THE LOSS`);
    }
}