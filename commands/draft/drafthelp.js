const Discord = require('discord.js');

module.exports = {
    name: 'drafthelp',
    administrator: false,

    async execute(client, message, args) {
        description = `__**DRAFT COMMANDS**__\n`
         + `enterdraft - ENROLLS YOU INTO THE CURRENT DRAFT\n`
         + `withdrawdraft - BOOTS YOU FROM THE CURRENT DRAFT\n`
         + `pick *name* - PICK THE SPECIFIED VIVOSAUR TO ADD TO YOUR DRAFT TEAM`

        message.channel.send(`YOU HAVE BEEN SENT A LIST OF COMPATABLE COMMANDS, SEE TO IT THAT THIS DOES NOT HAPPEN AGAIN SKREE!!!`)
        message.author.send(description);
    }
}