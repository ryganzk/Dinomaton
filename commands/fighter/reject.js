const Discord = require('discord.js');

module.exports = {
    name: 'reject',
    fighter: true,
    administrator: false,

    async execute(client, message, args) {

        //Makes sure the user actually specified an opponent
        if(!args[0]) {
            message.channel.send(`YOU MUST SPECIFY AN OPPONENT TO REJECT THEIR MATCH, SKREE!!!`);
            return;
        }

        opponentID = args[0].slice(3, -1);

        //Throws an error if a role/admin has been tagged
        try {

            //Makes sure the user you want to drop the match with actually exists
            if(opponentID === await message.mentions.members.first().user.id) {
                let pending = await client.data.matchExists(opponentID, message.author.id, ['pending']);

                //Checks if a pending match with the opponent exists
                if (pending) {
                    client.data.dropMatch(pending);
                    message.channel.send(`<@${message.author.id}> HAS REJECTED YOUR MATCH, ${args[0]}. WHAT A SHAME, SKREE...`);
                
                //If a match hasn't been schedules, Dinomaton will let you know over a warm cup of feline blood
                } else {
                    message.channel.send(`THAT PERSON HASN'T CHALLENGED YOU TO BATTLE, SKREE!!!`);
                }
            }

        //If the user doesn't exist, Dinomaton's not letting you slide
        } catch(err) {
            message.channel.send(`YOUR OPPONENT MUST BE A VALID FIGHTER, SKREE!!!`);
        }
    }
}