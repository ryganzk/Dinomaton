const Discord = require('discord.js');

module.exports = {
    //Command Information
    name: "hello",
    fighter: false,
    administrator: false,

    async execute(client, message, args) {
        message.channel.send('SKREEE!!!');
    }
}