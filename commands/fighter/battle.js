const Discord = require('discord.js');
const { fighterDBExists } = require('../../database/mongodb');

module.exports = {
    name: 'battle',

    async execute(client, message, args) {
        let userID = message.author.id;

        //An opponent must be specified
        if(!args[0]) {
            message.channel.send(`YOU MUST SPECIFY AN OPPONENT TO FIGHT, SKREE!!!`);
            return;

        //Makes sure the user actually has a fighter license
        } else if(!(await client.data.fighterDBExists(userID))) {
            message.channel.send(`YOU'RE NOT ALLOWED TO BATTLE WITHOUT AN APPROVED LICENSE, SKREE!!!`);
            return;
        }

        let opponentID = args[0].slice(3, -1);       
        
        //Sees whether the opponent already scheduled a match with the user
        if((await client.data.matchExists(opponentID, userID, ['pending']))) {
            message.channel.send(`LOOKS LIKE <@${opponentID}> IS ALREADY EXPECTING A MATCH WITH YOU, SKREE!!!`);
            return;
        
        //Checks if the user already scheduled a match with the person already
        } else if(!(await client.data.matchExists(userID, opponentID, ['accepted', 'in progress']))) {

            //The user cannot challenge themselves to a match
            if(userID === opponentID) {
                message.channel.send(`YOU REALLY THINK YOU'RE CLEVER FIGHTING YOURSELF, SKREE???`);
                return;

            //Prints funny message if Dinomaton is selected as the opponent
            } else if (opponentID === '837068581958189098') {
                message.channel.send(`I ADMIRE YOUR COURAGE, SKREE, BUT YOU'D BE GRINDED TO GOREY BITS IF WE FOUGHT!!!`);
                return;

            //Checks whether the tagged user exists & has a fighter license
            } else if (await client.data.fighterDBExists(opponentID)) {

                //The user is involved in an illegal match, cannot continue
                if (await client.data.matchWithUserExists(userID, ['flagged'])) {
                    message.channel.send(`YOU CANNOT BATTLE AN OPPONENT UNTIL A FLAGGED MATCH HAS BEEN RESOLVED, SKREE!!!`);
                    return;

                //You've gotten the a-ok to challenge that user to battle!!!
                } else {
                    let challengerDB = await client.data.getFighterDB(userID);
                    let challengeeDB = await client.data.getFighterDB(opponentID);
                    client.data.setMatchDB(userID, challengerDB.fighterName, opponentID, challengeeDB.fighterName);
                    message.channel.send(`<@${opponentID}>, YOU HAVE BEEN CHALLENGED BY <@${userID}> TO BATTLE, SKREE!!!`);
                }

            //If intended opponent does not have a fighter license or exists, ERROR!!!
            } else {
                message.channel.send(`YOUR OPPONENT MUST HAVE AN APPROVED LICENSE, SKREE!!!`);
                return;
            }

        //A match has already been made, so Dinomaton will now unleash its fury
        } else {
            message.channel.send(`A MATCH WITH ${opponentID} IS ALREADY IN PROGRESS, SKREE!!!`);
            return;
        }
    }
}