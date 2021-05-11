const Discord = require('discord.js');

module.exports = {
    name: 'certifyfighter',
    administrator: true,

    async execute(client, message, args) {

        //An opponent must be specified
        if(!args[0]) {
            message.channel.send(`YOU HAVEN'T SPECIFIED A LICENSE TO CERTIFY, SKREE!!!`);
            return;
        }

        let userID = message.author.id;
        let fighterID = args[0].slice(3, -1);

        //Makes sure the user actually has a fighter license
        if(!(await client.data.fighterDBExists(fighterID))) {
            message.channel.send(`THAT USER DOESN'T HAVE A LICENSE, SKREE!!!`);
            return;

        //If the specifed fighter already has a voided license, throw error
        } else if(await client.data.getLicenseStatus(fighterID) === 'certified') {
            message.channel.send(`THAT FIGHTER IS ALREADY CERTIFIED, SKREE!!!`);
            return;

        //Looks like the fighter needs to bid adieu to their fighting priviledges
        } else {
            await client.data.recertifyLicense(fighterID);
            message.channel.send(`<@${fighterID}>'S LICENSE HAS BEEN REINSTATED, AND IS ONCE AGAIN ELIGIBLE FOR BATTLING, SKREE!!!`);
            return;
        }
    }
}