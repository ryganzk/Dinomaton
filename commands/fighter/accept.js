const Discord = require('discord.js');

module.exports = {
    name: 'accept',

    async execute(client, message, args) {
        userID = message.author.id;

        //An opponent must be specified
        if(!args[0]) {
            message.channel.send(`YOU MUST SPECIFY AN OPPONENT TO FIGHT, SKREE!!!`);
            return;

        //Makes sure the user actually has a fighter license
        } else if(!(await client.data.fighterDBExists(userID))) {
            message.channel.send(`YOU'RE NOT ALLOWED TO BATTLE WITHOUT AN APPROVED LICENSE, SKREE!!!`);
            return;
        }

        opponentID = args[0].slice(3, -1);

        //Throws an error if a role/admin has been tagged
        try {

            //Makes sure the user you're accepting to battle with actually exists
            if(opponentID === await message.mentions.members.first().user.id) {
                let pending = await client.data.matchExists(opponentID, userID, ['pending']);

                //Checks if a pending match with the opponent exists
                if (pending) {

                    //The user is involved in an illegal match, cannot continue
                    if (await client.data.matchWithUserExists(userID, ['flagged'])) {
                        message.channel.send(`YOU CANNOT BATTLE AN OPPONENT UNTIL A FLAGGED MATCH HAS BEEN RESOLVED, SKREE!!!`);
                        return;

                    //Looks like nothing's stopping you from legally accepting a match, let's go!!!
                    } else {
                        client.data.acceptMatch(pending);
                        message.channel.send(`<@${userID}> HAS ACCEPTED YOUR MATCH, ${args[0]}. PROCEED, SKREE???`);
                    }
                
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
