const Discord = require('discord.js');

module.exports = {
    name: 'drafthelp',
    administrator: false,

    async execute(client, message, args) {
        message.channel.send(`DRAFT COMMANDS ARE UNAVALIABLE AS OF THIS BUILD, SKREE!!!`);
    }
}