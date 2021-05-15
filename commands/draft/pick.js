const Discord = require('discord.js');

module.exports = {
    name: 'pick',
    fighter: true,
    administrator: false,

    async execute(client, message, args) {

        //First off a draft needs to actually exist
        if (!(await client.data.findOngoing())) {
            message.channel.send(`NO CURRENT DRAFT EXISTS AT THIS POINT IN TIME, SKREE!!!`);
            return;
        }

        //The current draft needs to be ready for users to pick vivosaurs
        if(!(await client.data.draftStatus(['picking vivosaurs']))) {
            message.channel.send(`THE DRAFT ISN'T ACCEPTING VIVOSAUR SELECTIONS AT THIS TIME, SKREE!!!`);
            return;
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
        } catch (err) {
            message.channel.send("YOU'RE REALLY TRYING TO GET ON MY SHITLIST', SKREE...");
        }
        
        //Now that we know what the user typed, we need to see if that vivosaur exists in the collection
        if (!(await client.data.vivosaurExists(vivoName))) {
            message.channel.send("THAT VIVOSAUR DOES NOT EXIST, SKREE!!!");
            return;
        }

        let fighterWithVivo = await client.data.checkDraftSaur(vivoName)

        //Now let's see if another user has already picked that vivosaur, and if that's false we're allowed to use it
        if (!fighterWithVivo) {
            await client.data.giveDraftSaur(message.author.id, vivoName)
            message.channel.send(`<@${message.author.id}> HAS CHOSEN ${vivoName.toUpperCase()} FOR THE DRAFT, SKREE!!!`);

        //The fact that you've come here means that you or someone else already has that vivosaur
        } else if (fighterWithVivo.id === message.author.id) {
            message.channel.send(`TROGLODITE, YOU ALREADY **HAVE** THAT VIVOSAUR, SKREE!!!`);

        //The fact that you've come here means that someone else already has that vivosaur
        } else {
            message.channel.send(`<@${fighterWithVivo.id}> ALREADY CHOSE THAT VIVOSAUR, PICK ANOTHER, SKREE!!!`);
        }
    }
}