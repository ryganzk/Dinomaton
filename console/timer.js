const Discord = require('discord.js');

var draftPickInterval;
var stoppedTime = 0;

module.exports.getPickInterval = async function() {
    console.log(draftPickInterval);
}

module.exports.startPickInterval = async function(client, time) {
    draftPickInterval = setInterval(() => tookTooLong(client), time * 60000);
    stoppedTime = time;
}
   
module.exports.haltPickInterval = async function() {
    draftPickInterval.pause();
}
    
module.exports.resumePickInterval = async function() {
    draftPickInterval.play();
}
    
module.exports.extendPickInterval = async function(time) {
    draftPickInterval = setInterval(() => console.log(`Pick timer extended to ${time} seconds`), time * 60000);
}
    
module.exports.stopPickInterval = async function() {
    clearInterval(draftPickInterval);
}

//This function is nearly identical to the one in pick.js and executes if the fighter takes too long to pick a vivo
async function tookTooLong(client) {
    let draft = await client.data.findOngoing();

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
        await client.channels.cache.find(i => i.name === 'general').send(`@everyone DRAFT PICKS ARE COMPLETE, AND WE WILL NOW TRANSITION INTO OUR REGULAR SEASON, SKREE!!!`);
        await client.timer.stopPickInterval();
        return;

    //Else they pick again
    } else {
        await client.channels.cache.find(i => i.name === 'general').send(`<@${draft.fighterList[draft.nextPickNum].id}> MISSED A PICK, BUT THEY STILL HAVE ANOTHER CHANCE TO FILL A SPOT AT THE MOMENT, SKREE!!!`);
        return;
    }

    await client.channels.cache.find(i => i.name === 'general').send(`<@${draft.fighterList[draft.nextPickNum].id}> TOOK TOO LONG TO PICK A VIVOSAUR, SO NOW IT'S <@${draft.fighterList[draft.nextPickNum + index].id}>'S TURN TO PICK, SKREE!!!`);
}