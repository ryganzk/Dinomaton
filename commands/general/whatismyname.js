const Discord = require('discord.js');

module.exports = {
    name: "whatismyname",
    fighter: false,
    administrator: false,

    async execute(client, message, args) {
        userName = message.author.tag.toUpperCase().slice(0, -5);
        message.channel.send(`YOUR NAME IS ${userName}, SKREE!!!`);
    }
}