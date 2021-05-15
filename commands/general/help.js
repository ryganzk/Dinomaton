const Discord = require('discord.js');

module.exports = {
    name: 'help',
    fighter: false,
    administrator: false,

    async execute(client, message, args) {
        message.channel.send(`USE !FIGHTERHELP FOR A RUNDOWN OF FIGHTER-RELATED COMMANDS\nUSE !DRAFTHELP FOR A RUNDOWN OF DRAFT-RELATED COMMANDS`);
    }
}