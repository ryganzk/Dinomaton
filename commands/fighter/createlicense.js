const Discord = require('discord.js');

module.exports = {
    name: 'createlicense',
    fighter: false,
    administrator: false,

    async execute(client, message, args) {

        //Checks whether a license has already been issued
        if(await client.data.fighterDBExists(message.author.id)) {
            message.channel.send(`YOU ALREADY HAVE A LICENSE, SKREE!!!`);
        } else {

            //Checks if the user has specified a name for the license
            if(args[0]) {

                //Names over a length of 20 are not allowed to be on a license
                if(args[0].length > 20) {
                    message.channel.send(`THAT NAME WON'T FIT ON YOUR LICENSE, SKREE!!!`);
                    return;

                //The name is 20 characters or under, proceed to create license
                } else {
                    await client.data.setFighterDB(message.author.id, args[0]);
                }

            //Chooses the user's default Discord name for the license
            } else {
                fighterName = message.author.tag.slice(0, -5);
                await client.data.setFighterDB(message.author.id, fighterName);
            }
            message.channel.send(`AN OFFICIAL LICENSE HAS BEEN APPROVED, SKREE!`);
        }
    }
}