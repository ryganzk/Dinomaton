const Discord = require('discord.js');

module.exports = {
    name: 'fighterhelp',
    fighter: false,
    administrator: false,

    async execute(client, message, args) {
        description = `__**FIGHTER COMMANDS**__\n`
         + `createlicense - ISSUES YOUR VERY OWN FIGHTERS LICENSE\n`
         + `licenseinfo *fighter* - CHECK THE DATA OF ANOTHER FIGHTER\n`
         + `setname *name* - SETS YOUR FIGHTER NAME TO THE NAME SPECIFIED (MUST BE UNDER 20 CHARACTERS)\n`
         + `\n`
         + `__**VIVOSAUR COMMANDS**__\n`
         + `vivosaur *name* - DISPLAYS THE STATS, SKILLS, AND VARIOUS OTHER INFORMATION FOR THE VIVOSAUR SPECIFIED\n`
         + `vivosaurlist *empty/query* - LOOKS UP A LIST OF VIVOSAURS THAT MEET THE REQUIREMENTS FOR THE SPECIFIED QUERY (TYPES OF QUERIES: ELEMENT, DIET, DINOSAUR GROUP)\n`
         + `\n`
         + `__**BATTLE COMMANDS**__\n`
         + `battle *fighter* - CHALLENGES THE SPECIFIED FIGHTER TO BATTLE\n`
         + `accept *fighter* - ACCEPTS A CHALLENGE ISSUED BY THE SPECIFIED FIGHTER\n`
         + `reject *fighter* - REJECTS A CHALLENGE ISSUED BY THE SPECIFIED FIGHTER\n`
         + `backdown *fighter* - CANCELS YOUR ISSUED CHALLENGE WITH THE SPECIFIED USER\n`
         + `start *fighter* - BEGINS YOUR BATTLE WITH A USER WHO'S ACCEPTED YOUR CHALLENGE\n`
         + `victory - GIVES YOURSELF THE WIN\n`
         + `defeat - GIVES YOURSELF THE LOSS`;

        message.channel.send(`YOU HAVE BEEN SENT A LIST OF COMPATABLE COMMANDS, SEE TO IT THAT THIS DOES NOT HAPPEN AGAIN SKREE!!!`)
        message.author.send(description);
    }
}