const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'resumepick',
    administrator: true,

    async execute(client, message, args) {

        //Makes sure a timer has actually been made
        if(client.timer.getStoppedTime() === 0) {
            message.channel.send("THE PICK TIMER HASN'T BEEN SETUP YET, SKREE!!!");

        //If a timer exists and is running at the moment, we don't wanna do anything
        } else if(client.timer.getPickInterval()) {
            message.channel.send("THE PICK TIMER IS ALREADY RUNNING, SKREE!!!");

        //Nice let's play it from the stopped interval
        } else {
            client.timer.resumePickInterval(client);
            message.channel.send("CURRENT PICK HAS BEEN RESUMED, SKREE!!!");
        }  
    }
}