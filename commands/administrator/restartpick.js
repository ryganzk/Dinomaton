const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'restartpick',
    administrator: true,

    async execute(client, message, args) {

        //If a timer hasn't been made we can (re)start a new one
        if(client.timer.getStoppedTime() === 0) {
            let draft = await client.data.findOngoing();

            //If we're not currently in the picking phase, we don't need to set the timer
            if(draft.status !== 'picking vivosaurs') {
                message.channel.send("THE PICK TIMER ISN'T NEEDED AT THE MOMENT, SKREE!!!");
                return;
            }

            await client.timer.startPickInterval(client, draft.pickTime);
            message.channel.send(`THE PICK TIMER HAS RESTARTED, AND IT'S <@${draft.fighterList[draft.nextPickNum].id}>'S TURN TO PICK, SKREE!!!`);

        //Welp a timer exists, no need to do anything
        } else {
            message.channel.send("THE PICK TIMER IS ALREADY RUNNING, SKREE!!!");
        } 
    }
}