const Discord = require('discord.js');

module.exports = {
    name: 'licenseinfo',

    async execute(client, message, args) {
        if(args[0]){
            fighter = await client.data.getFighterDB(args[0].slice(3, -1));      
        } else {
            fighter = await client.data.getFighterDB(message.author.id);
        }

        if (fighter) {
            let embed = new Discord.MessageEmbed()
            .addFields(
                { name: 'Fighter', value: fighter.fighterName, inline: false },
                { name: 'Wins', value: fighter.battleWins, inline: false },
                { name: 'Losses', value: fighter.battleLosses, inline: false },
            );
            message.channel.send(embed);
        } else if (await client.data.userDBExists()) {
            message.channel.send('THAT USER IS NOT REGISTERED AS A FIGHTER, SKREE!!!');
        } else {
            message.channel.send(`THAT'S NOT A USER, SKREE!!!`);
        }
    }
}