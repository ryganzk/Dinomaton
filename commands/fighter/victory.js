const Discord = require('discord.js');

module.exports = {
    name: "victory",
    administrator: false,

    async execute(client, message, args) {
        let userID = message.author.id;
        let match = await client.data.matchWithUserExists(userID, ['in progress']);

        //Makes sure the user is involved in a current in-progress battle
        if(match) {
            let opponentID = (userID === match.idChallengee) ? match.idChallenger : match.idChallengee;

            if(userID === match.idChallenger) {
                userFighterName = match.challenger;
                opponentFighterName = match.challengee;
            } else {
                userFighterName = match.challengee;
                opponentFighterName = match.challenger;
            }
        
            //If opponent already gave themselves the loss, increase user and decrease opponent's w/l ratio
            if (match.loser === opponentFighterName) {
                opponentTag = await client.data.getUserDB(opponentID);
                client.data.setWinner(match, userFighterName);
                client.data.increaseWins(userID);
                client.data.increaseLosses(opponentID);
                client.data.completeMatch(match);

                //Prints out winner/loser text
                message.channel.send(`THE BATTLE BETWEEN <@${match.idChallenger}> AND <@${match.idChallengee}> IS COMPLETE, SKREE!!!`);
                let embed = new Discord.MessageEmbed()
                .addFields(
                    { name: 'Winner', value: `${message.author.username} [${userFighterName}]`, inline: false },
                    { name: 'Loser', value: `${opponentUser.tag.slice(0, -5)} [${opponentFighterName}]`, inline: false },
                );
                message.channel.send(embed);

            //Uh-oh, the opponent thinks THEY won the match (or maybe they did and you're just an asshole)
            //Either way, we need to flag this battle for an admin to review
            } else if (match.winner === opponentFighterName) {
                client.data.flagMatch(match);
                message.channel.send(`THE BATTLE BETWEEN <@${match.idChallenger}> AND <@${match.idChallengee}> HAS BEEN FLAGGED FOR MODERATION, SKREE!!!`);

            //The opponent hasn't responded yet, we can't complete the match until they do
            } else {
                client.data.setWinner(match, userFighterName);
                message.channel.send(`AWAITING RESPONSE FROM <@${opponentID}>...`);
            }
        
        //User aint fightin, RIP
        } else {
            message.channel.send(`YOU AREN'T CURRENTLY IN A BATTLE, SKREE!!!`);
        }
    }
}
