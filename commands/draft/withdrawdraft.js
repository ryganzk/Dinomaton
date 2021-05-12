const Discord = require('discord.js');

module.exports = {
    name: 'withdrawdraft',
    fighter: true,
    administrator: false,

    async execute(client, message, args) {

        //Sends the following message if a draft isn't taking participants
        if(!(await client.data.findOngoing())) {
            message.channel.send(`SADLY THERE IS NO DRAFT ACCEPTING APPLICANTS AT THIS TIME, SKREE!!!`);
            return;
        } 

        userID = message.author.id;
        
        if (!(await client.data.findParticipant(userID, ['congregating']))) {
            message.channel.send(`WELL LOOKS LIKE YOU'RE NOT REGISTERED FOR PARTICIPATION ANYWAYS, SKREE!!!`);
            return;
        }

        //Looks like the user is allowed to drop out ;((((
        let draft = await client.data.findOngoing();
        await client.data.removeParticipant(userID, draft);
        message.channel.send(`<@${userID}> HAS WITHDRAWN FROM THE DRAFT, SKREE...`);
    }
}