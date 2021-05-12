const Discord = require('discord.js');

module.exports = {
    name: 'enterdraft',
    fighter: true,
    administrator: false,

    async execute(client, message, args) {

        //Sends the following message if a draft isn't taking participants
        if(!(await client.data.findOngoing())) {
            message.channel.send(`SADLY THERE IS NO DRAFT ACCEPTING APPLICANTS AT THIS TIME, SKREE!!!`);
            return;
        } 

        userID = message.author.id;
        
        if (await client.data.findParticipant(userID, ['congregating'])) {
            message.channel.send(`YOU'RE ALREADY REGISTERED FOR THIS DRAFT, SKREE!!!`);
            return;
        }

        //If user is a fighter and draft is avaliable to sign up for, let them compete!!!
        let draft = await client.data.findOngoing();
        await client.data.addParticipant(userID, draft);
        message.channel.send(`<@${userID}> HAS ENTERED THE DRAFT, SKREE!!!`);
    }
}