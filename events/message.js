const Discord = require('discord.js');
const config = require('../config.json');
const cmdCooldown = {};

module.exports = async(client, message) => {
    try {
        
        //Halts if the message author is a bot
        if(message.author.bot) return;

        //Gets the bot prefix from ../config.json
        let prefix = config.prefix;

        //Returns if the message does not start with the prefix
        if(!message.content.toLowerCase().startsWith(prefix)) return;

        //Checks if the sent message is a command
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
        const cmd = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        //Returns if the message is not a command
        if(!cmd) return

        //Checks if the command requires administrator permissions, and makes sure the user has them if it does
        if(cmd.administrator) {
            if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) {
                message.channel.send(`I DO NOT GIVE YOU PERMISSION TO USE THAT COMMAND, SKREE!!!`);
                client.logger.cmd(`${message.author.tag} used ${cmd.name}... But nothing happened!`);
                return;
            }
        }

        //Gets the user database
        let userDB = await client.data.getUserDB(message.author.id, message.author.tag);
        let data = {};
        data.config = config;
        data.user = userDB;
        data.cmd;

        //Executes and logs the command
        cmd.execute(client, message, args);
        client.logger.cmd(`${message.author.tag} used ${cmd.name}`);

    } catch(err) {
        console.error(err);
    }
} 