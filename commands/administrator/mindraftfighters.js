const Discord = require('discord.js');

module.exports = {
    name: 'mindraftfighters',
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
        if (!fighters) {
            message.channel.send(`TRY SPECIFYING AN INTEGER NEXT TIME, SKREEHEEHEE!!!`);
            return;

        //Oh yeah, any number under 4 is a no-go
        } else if (fighters < 4) {
            message.channel.send(`I CANNOT PERMIT YOU TO HAVE UNDER 4 PARTICIPANTS, SKREEE!!!`);
            return;
        }

        draft = await client.data.draftStatus(['congregating']);

        //Changing the rules can only occur before picking has begun
        if(!draft) {
            message.channel.send(`IT'S TOO LATE TO CHANGE THE DRAFT'S RULESET, SKREE!!!`);
            return; 

        //What happens if there are more current participants than our new minimum allows? Error duh
        } else if (fighters < draft.fighterList.length) {
            message.channel.send(`LOOKS THE THE DRAFT HAS TOO MANY PARTICIPANTS, SKREE!!!`);
            return;

        //We also need to make sure the new minimum amount doesn't exceed the maximum
        } else if (fighters > draft.maxFighters) {
            message.channel.send(`THIS DRAFT HAS A MAXIMUM OF ${draft.maxFighters}, SKREE!!! CHANGE THAT FIRST!!!`);
            return;
        }

        //It's time to change the minimum!!!
        await client.data.updateMinFighters(draft, fighters);
        
        if (fighters > draft.fighterList.length) {
            message.channel.send(`@everyone THE DRAFT NEEDS ${fighters} FIGHTERS TO BEGIN!!! WE ARE ONLY ${fighters - draft.fighterList.length} SHORT, SKREE!!!`);
        } else {
            message.channel.send(`@everyone THE DRAFT REACHED ITS MINIMUM CAPACITY OF  ${fighters} FIGHTERS!!! LOOKS AS IF WE JUST MADE IT, SKREE!!!`);
        }
    }
}
