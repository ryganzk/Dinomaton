const Discord = require('discord.js');

module.exports = {
    name: 'clean',
    administrator: true,

    async execute(client, message, args) {
        let count = await client.data.amount(['completed', 'dropped']);
        await client.data.deleteMatches(['completed', 'dropped']);
        
        //Pardon my anxiety over grammatically incorrect response messages
        if(count === 1) {
            message.channel.send(count + ` RESOLVED MATCH HAVE BEEN DELETED, SKREE!!!`);
        } else {
            message.channel.send(count + ` RESOLVED MATCHES HAVE BEEN DELETED, SKREE!!!`);
        }
    }
}