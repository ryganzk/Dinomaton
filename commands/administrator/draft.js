const Discord = require('discord.js');

module.exports = {
    name: 'draft',
    administrator: true,

    async execute(client, message, args) {

        //Looks like a draft is already starting, another one cannot be made
        if(await client.data.findOngoing()) {
            message.channel.send(`A DRAFT IS ALREADY IN PROGRESS, SKREE!!!`);
            return;
        }

        //No draft, so let's create one for people to enjoy!
        await client.data.newDraft();
        message.channel.send(`@everyone A NEW DRAFT IS STARTING! FIGHTERS CAN ENTER USING D!ENTER, SKREE!!!`);
    }
}