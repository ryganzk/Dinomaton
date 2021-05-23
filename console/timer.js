const Discord = require('discord.js');
const config = require('../config.json');

var draftPickInterval;
var stoppedTime = 0;

module.exports.getPickInterval = function() {
    return draftPickInterval;
}

module.exports.getStoppedTime = function() {
    return stoppedTime;
}

module.exports.startPickInterval = async function(client, time) {
    console.log(`${time} minute(s) remaining...`);
    stoppedTime = time;

    //Recursive function that keeps setting itself for a minute and keeping track of those minutes
    draftPickInterval = setInterval(async () => {

        //Timer has reached the end, move pick onwards
        if(time === 1) {
            draft = await client.data.findOngoing();
            tookTooLong(client, draft);

        //User still has time to make a pick
        } else {

            //User has a minute left to make a pick
            if(time === 2) {
                draft = await client.data.findOngoing();
                await client.channels.cache.find(i => i.name === config.draftChannel).send(`<@${draft.fighterList[draft.nextPickNum].id}> ONLY HAS A MINUTE TO PICK A VIVOSAUR! HURRY UP, SKREE!!!`);
    
            //User has 5 minutes left to make a pick
            } else if(time === 6) {
                draft = await client.data.findOngoing();
                await client.channels.cache.find(i => i.name === config.draftChannel).send(`<@${draft.fighterList[draft.nextPickNum].id}> HAS FIVE MINUTES TO PICK A VIVOSAUR, SKREE!!!`);
            }

            clearInterval(draftPickInterval);
            await client.timer.startPickInterval(client, time - 1);
        }
    }, 60000);
}
   
module.exports.haltPickInterval = async function() {
    clearInterval(draftPickInterval);
}
    
module.exports.resumePickInterval = async function(client) {
    client.timer.startPickInterval(client, stoppedTime);
}
    
module.exports.extendPickInterval = async function(time) {
    draftPickInterval = setInterval(() => console.log(`Pick timer extended to ${time} seconds`), time * 60000);
}
    
module.exports.stopPickInterval = async function() {
    clearInterval(draftPickInterval);
    stoppedTime = 0
}

module.exports.deletePickInterval = async function() {
    draftPickInterval = null;
}

//This function is nearly identical to the one in pick.js and executes if the fighter takes too long to pick a vivo
async function tookTooLong(client, draft) {
    
    //Give the user an empty vivosaur
    await client.data.giveDraftSaur(draft.fighterList[draft.nextPickNum].id, "-----");

    //We're gonna need the id's of the first and last fighters for the next few steps
    let firstFighter = await client.data.getFighterDB(draft.fighterList[0].id);
    let lastFighter = await client.data.getFighterDB(draft.fighterList[draft.fighterList.length - 1].id);

    //If the first fighter has more vivosaurs than the last, move the pick to the right
    if(firstFighter.currentDraft.takenSaurs.length > lastFighter.currentDraft.takenSaurs.length) {
        await client.data.incrementPick(draft);
        var index = 1;

    //Else if the last fighter has more vivosaurs than the firstst, move the pick to the left
    } else if((firstFighter.currentDraft.takenSaurs.length < lastFighter.currentDraft.takenSaurs.length)) {
        await client.data.decrementPick(draft);
        var index = -1;

    //But wait! We also need to check if we've hit the max amount of vivosaurs for the draft
    } else if(firstFighter.currentDraft.takenSaurs.length === lastFighter.currentDraft.takenSaurs.length && firstFighter.currentDraft.takenSaurs.length === draft.vivoNum) {
        await client.data.setDraftStatus(draft, 'regular season')
        await client.channels.cache.find(i => i.name === config.draftChannel).send(`@everyone DRAFT PICKS ARE COMPLETE, AND WE WILL NOW TRANSITION INTO OUR REGULAR SEASON, SKREE!!!`);
        await client.timer.stopPickInterval();
        return;

    //Else they pick again
    } else {
        await client.channels.cache.find(i => i.name === config.draftChannel).send(`<@${draft.fighterList[draft.nextPickNum].id}> MISSED A PICK, BUT THEY STILL HAVE ANOTHER CHANCE TO FILL A SPOT AT THE MOMENT, SKREE!!!`);
        await client.timer.stopPickInterval();
        await client.timer.startPickInterval(client, config.pickTime);
        return;
    }

    await client.channels.cache.find(i => i.name === config.draftChannel).send(`<@${draft.fighterList[draft.nextPickNum].id}> TOOK TOO LONG TO PICK A VIVOSAUR, SO NOW IT'S <@${draft.fighterList[draft.nextPickNum + index].id}>'S TURN TO PICK, SKREE!!!`);
    await client.timer.stopPickInterval();
    await client.timer.startPickInterval(client, config.pickTime);
}