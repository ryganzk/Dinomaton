const Discord = require('discord.js');

module.exports = {
    name: 'adminhelp',
    administrator: true,

    async execute(client, message, args) {
        description = `__**FIGHTER COMMANDS**__\n`
         + `voidfighter *fighter* - BARS A FIGHTER FROM BATTLING AND RESTRICTS ACCESS TO A FEW COMMANDS\n`
         + `certifyfighter *fighter* - RECERTIFIES A FIGHTER, GRANTS THEM PERMISSION TO BATTLE AGAIN\n`
         + `\n`
         + `__**DRAFT COMMANDS**__\n`
         + `draft - STARTS A NEW DRAFT`
         + `allowpick - INITIATES THE PICKING PHASE ONCE ENOUGH FIGHTERS ARE PARTICIPATING\n`
         + `maxdraftfighters *number* - CHANGES THE MAXIMUM NUMBER OF FIGHTERS IN THE CURRENT DRAFT\n`
         + `mindraftfighters *number* - CHANGES THE MINIMUM NUMBER OF FIGHTERS IN THE CURRENT DRAFT\n`
         + `picktime *number* - CHANGES THE TIME ALOTTED TO FIGHTERS WHEN IT'S THEIR TURN TO PICK A VIVOSAUR\n`
         + `restartpick - STARTS THE PICK TIMER OVER FROM ITS CURRENT POSITION\n`
         + `pausepick - PAUSES THE PICK TIMER\n`
         + `resumepick - RESUMES THE PICK TIMER\n`
         + `\n`
         + `__**DATABASE COMMANDS**__\n`
         + `clean - DELETES ALL COMPLETED AND DROPPED MATCHES FROM THE DATABASE\n`;

        message.channel.send(`YOU HAVE BEEN SENT A LIST OF COMPATABLE COMMANDS, SEE TO IT THAT THIS DOES NOT HAPPEN AGAIN SKREE!!!`)
        message.author.send(description);
    }
}