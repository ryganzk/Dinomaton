const Discord = require('discord.js');

module.exports = {
    //Command Information
    name: "hello",

    async execute(client, message, args) {
        message.channel.send('SKREEE!!!');
    }
}