const Discord = require('discord.js');

module.exports = {
    name: 'start',
    administrator: false,

    async execute(client, message, args) {

        //Makes sure an opponent has actually been specified
        if(args[0]) {
            let userID = message.author.id;
            let opponentID = args[0].slice(3, -1);
            let match = await client.data.getMatchDB(userID, opponentID, 'accepted');

            //Checks whether the user has challenged the intended opponent (and they agreed to the challenge)
            if(match) {

                //Checks if the user is currently fighting in a battle
                if(!(await client.data.matchWithUserExists(userID, ['in progress']))) {
                    client.data.startMatch(match);
                    message.channel.send(`A BATTLE BETWEEN <@${userID}> AND <@${opponentID}> HAS BEGUN, SKREE!!!`);

                //The user is already involved in a battle, so the command is unable to run
                } else {
                    message.channel.send(`YOU CANNOT START ANOTHER BATTLE IF YOU'RE CURRENTLY IN ONE, SKREE!!!`);
                }

            //Whoops something went wrong with the statement above, looks like god can't help you now...
            } else {
                message.channel.send('THERE IS NO MATCH TO BEGIN AT THIS TIME, SKREE!!!');
            }

        //An opponent wasn't specified, Dinomaton's feeling pretty snarky today...
        } else {
            message.channel.send('YOU FAILED TO SPECIFY AN OPPONENT, WOULD YOU LIKE TO FACE THE CLOUDS THEN, SKREE???');
        }
    }
}