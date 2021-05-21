const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'pick',
    fighter: true,
    administrator: false,

    async execute(client, message, args) {
        var skippedPick = false;

        //First off a draft needs to actually exist
        if (!(await client.data.findOngoing())) {
            message.channel.send(`NO CURRENT DRAFT EXISTS AT THIS POINT IN TIME, SKREE!!!`);
            return;
        }

        let draft = await client.data.findOngoing();

        //If we're still in picking phase...
        if(draft.status === 'picking vivosaurs') {

            //You need to wait your turn
            if(draft.fighterList[draft.nextPickNum].id !== message.author.id) {
                message.channel.send("PLEASE WAIT YOUR TURN TO PICK A VIVOSAUR, SKREE!!!");
                return;
            }

        //If the draft hasn't started the picking process yet, you're not allowed to pick
        } else if (draft.status === 'congregating') {
            message.channel.send(`THE DRAFT ISN'T ACCEPTING VIVOSAUR SELECTIONS AT THIS TIME, SKREE!!!`);
            return;

        //Oooo you must've skipped your original pick, this will be important later...
        } else {
            fighter = await client.data.getFighterDB(message.author.id);

            //Will not let the user pick another vivosaur if they already hit the max amount
            if(!fighter.currentDraft.takenSaurs.includes("-----") && fighter.currentDraft.takenSaurs.length >= draft.vivoNum) {
                message.channel.send(`YOU'VE HIT THE MAXIMUM ALLOWED VIVOSAURS FOR THIS DRAFT, SKREE!!!`);
                return;
            }
            skippedPick = true;
        }

        //User needs to actually specify a vivosaur to pick
        if(!args[0]) {
            message.channel.send("YOU FAILED TO SPECIFY A VIVOSAUR TO PICK, SKREE!!!");
            return;
        }

        //Converts the input message into the correct vivosaur name (some can be multiple words, have hyphens, etc.)
        //For some JavaScript reason vivoName likes to being with 'undefined', but we can just ignore that
        //I have no idea what the regex expressions mean, I just found em through various online queries
        try {
            for(let i in args) {
                var vivoName = vivoName + args[i] + " ";
            }
            vivoName = vivoName.charAt(9).toUpperCase() + vivoName.substring(10, vivoName.length - 1).toLowerCase();
            vivoName = vivoName.replace(/\b(\w)/g, s => s.toUpperCase()); //regex for catching characters after spaces
            vivoName = vivoName.replace(/(^|\/|-)(\S)/g, s => s.toUpperCase()); //regex for catching characters after hyphens
        } catch(err) {
            message.channel.send("YOU'RE REALLY TRYING TO GET ON MY SHITLIST', SKREE...");
        }
        
        //Now that we know what the user typed, we need to see if that vivosaur exists in the collection
        if(!(await client.data.vivosaurExists(vivoName))) {
            message.channel.send("THAT VIVOSAUR DOES NOT EXIST, SKREE!!!");
            return;
        }

        let fighterWithVivo = await client.data.checkDraftSaur(vivoName);

        //Now let's see if another user has already picked that vivosaur, and if that's false we're allowed to use it
        if(!fighterWithVivo) {
            message.channel.send(`<@${message.author.id}> HAS CHOSEN ${vivoName.toUpperCase()} FOR THE DRAFT, SKREE!!!`);

            //Aha, you skipped your original chance to pick! All good, you got your saur, now get outta here >;(((
            if(skippedPick) {
                await client.data.replaceSkippedSaur(message.author.id, vivoName);
                return;
            }

            await client.data.giveDraftSaur(message.author.id, vivoName);

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
                message.channel.send(`@everyone DRAFT PICKS ARE COMPLETE, AND WE WILL NOW TRANSITION INTO OUR REGULAR SEASON, SKREE!!!`);
                await client.timer.stopPickInterval();
                return;

            //Else they pick again
            } else {
                message.channel.send(`<@${draft.fighterList[draft.nextPickNum].id}> GETS TO PICK AGAIN, SKREE!!!`);
                return;
            }

            message.channel.send(`IT IS NOW <@${draft.fighterList[draft.nextPickNum + index].id}>'S TURN TO PICK, SKREE!!!`);
            await client.timer.stopPickInterval();
            await client.timer.startPickInterval(client, config.pickTime);

        //The fact that you've come here means that you or someone else already has that vivosaur
        } else if (fighterWithVivo.id === message.author.id) {
            message.channel.send(`TROGLODITE, YOU ALREADY **HAVE** THAT VIVOSAUR, SKREE!!!`);

        //The fact that you've come here means that someone else already has that vivosaur
        } else {
            message.channel.send(`<@${fighterWithVivo.id}> ALREADY CHOSE THAT VIVOSAUR, PICK ANOTHER, SKREE!!!`);
        }
    }
}
