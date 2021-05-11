const Discord = require('discord.js');

module.exports = {
    name: 'adminhelp',
    administrator: true,

    async execute(client, message, args) {
        message.channel.send(`__FIGHTER COMMANDS__\nvoidfighter *fighter* - BARS A FIGHTER FROM BATTLING AND RESTRICTS ACCESS`
         + ` TO A FEW COMMANDS\ncertifyfighter *fighter* - RECERTIFIES A FIGHTER, GRANTS THEM PERMISSION TO BATTLE AGAIN\n\n`
         + `__DATABASE COMMANDS__\nclean - DELETES ALL COMPLETED AND DROPPED MATCHES FROM THE DATABASE`);
    }
}