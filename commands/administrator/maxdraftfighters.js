const Discord = require('discord.js');

module.exports = {
    name: 'maxdraftfighters',
    administrator: true,

    async execute(client, message, args) {

        //Alright we wanna make sure the user specifed an argument
        if(!args[0]) {
            message.channel.send(`A BLANK PROMPT WILL GET YOU ANYTHING BUT MY ADORATION, SKREE!!!`);
            return;
        }

        var fighters = parseInt(args[0])

        //Okay now check if the user passed a number
        //Note: Decimals are okay, parseInt will truncate (4.25 => 4)
        if(!fighters) {
            message.channel.send(`TRY SPECIFYING AN INTEGER NEXT TIME, SKREEHEEHEE!!!`);
            return;

        //By the way, any number under 8 won't be acceptable
        } else if(fighters < 8) {
            message.channel.send(`YOU MUST ACCOUNT FOR AT LEAST 8 FIGHTERS MAX, SKREEE!!!`);
            return;
        }

        draft = await client.data.draftStatus(['congregating']);

        //Changing the rules can only occur before picking has begun
        if(!draft) {
            message.channel.send(`IT'S TOO LATE TO CHANGE THE DRAFT'S RULESET, SKREE!!!`);
            return; 

        //What happens if there are more current participants than our new maximum allows? Error duh
        } else if(fighters < draft.fighterList.length) {
            message.channel.send(`LOOKS THE THE DRAFT HAS TOO MANY PARTICIPANTS, SKREE!!!`);
            return;
        
        //We also need to make sure the new maximum isn't less than the minimum
        } else if(fighters < draft.minFighters) {
            message.channel.send(`THIS DRAFT HAS A MINIMUM OF ${draft.minFighters}, SKREE!!! CHANGE THAT FIRST!!!`);
            return;
        }

        //It's time to change the maximum!!!
        await client.data.updateMaxFighters(draft, fighters);


        if(fighters > draft.fighterList.length) {
            message.channel.send(`@everyone THE DRAFT NEEDS ${fighters} FIGHTERS TO REACH PEAK CAPACITY!!! ${fighters - draft.fighterList.length} SPACES ARE AVALIABLE STILL, SKREE!!!`);
        } else {
            message.channel.send(`@everyone THE DRAFT REACHED ITS MAX CAPACITY OF ${fighters} FIGHTERS!!! WE'RE GONNA HAVE A HECTIC SET OF FIGHTS, SKREEEEE!!!`);
        }
    }
}
