const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'pausepick',
    administrator: true,

    async execute(client, message, args) {
        await client.timer.haltPickInterval();

        //Makes sure a timer has actually been made
        if(client.timer.getStoppedTime() === 0) {
            message.channel.send("THE PICK TIMER HASN'T BEEN SETUP YET, SKREE!!!");

        //If a timer exists and is running at the moment, we're capable of pausing
        } else if(client.timer.getPickInterval()) {
            message.channel.send("CURRENT PICK HAS BEEN PAUSED, SKREE!!!");
            await client.timer.deletePickInterval();

        //Timer isn't running, not gonna do anything
        } else {
            message.channel.send("THE PICK TIMER ISN'T RUNNING AT THE MOMENT, SKREE!!!");
        }
    }
}