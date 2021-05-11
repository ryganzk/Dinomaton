const Discord = require('discord.js');

module.exports = {
    name: "setname",
    administrator: false,

    async execute(client, message, args) {

        //Makes sure the user actually specified a name to change to
        if(!args[0]) {
            message.channel.send(`YOU DIDN'T ENTER A NEW NAME, RETRY OR YIELD, SKREE!!!`);
        }

        //Names over a length of 20 are not allowed to be on a license
        else if(args[0].length <= 20) {
            client.data.setFighterName(message.author.id, args[0]);
            dinomatonShoutNewName = args[0].toUpperCase();
            message.channel.send(`${dinomatonShoutNewName} HAS BEEN SET AS YOUR NEW FIGHTER NAME, SKREE!!!`);
        
            //The name is 20 characters or under, proceed to adjust fighter name
        } else
            message.channel.send(`THAT NAME WON'T FIT ON YOUR LICENSE, SKREE!!!`);
    }
}