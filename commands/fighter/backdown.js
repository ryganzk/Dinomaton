const Discord = require('discord.js');

module.exports = {
    name: 'backdown',

    async execute(client, message, args) {

        //Makes sure the user actually specified an opponent
        if(!args[0]) {
            message.channel.send(`YOU MUST SPECIFY AN OPPONENT TO STOP CHALLENGING, SKREE!!!`);
            return;
        }

        opponentID = args[0].slice(3, -1);

        //Throws an error if a role/admin has been tagged
        try {

            //Makes sure the user you want to drop the match with actually exists
            if(opponentID === await message.mentions.members.first().user.id) {
                let pending = await client.data.matchExists(message.author.id, opponentID, ['pending', 'accepted']);

                //Checks if a pending match with the opponent exists
                if (pending) {
                    client.data.dropMatch(pending);
                    message.channel.send(`YOU HAVE BACKED DOWN FROM YOUR FIGHT WITH ${args[0]}, SKREE!!!`);
                
                //If a match hasn't been schedules, Dinomaton will let you know over a warm cup of feline blood
                } else {
                    message.channel.send(`YOU HAVEN'T SET A MATCH WITH THAT PERSON, SKREE!!!`);
                }
            }

        //If the user doesn't exist, Dinomaton's not letting you slide
        } catch(err) {
            message.channel.send(`YOUR OPPONENT MUST BE A VALID FIGHTER, SKREE!!!`);
        }
    }
}