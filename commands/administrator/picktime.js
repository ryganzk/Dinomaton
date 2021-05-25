const Discord = require('discord.js');

module.exports = {
    name: 'picktime',
    administrator: true,

    async execute(client, message, args) {

        //Alright we wanna make sure the user specifed an argument
        if(!args[0]) {
            message.channel.send(`A BLANK PROMPT WILL GET YOU ANYTHING BUT MY ADORATION, SKREE!!!`);
            return;
        }

        let time = args[0];
        var fighters = parseInt(args[0]);

        //Okay now check if the user passed a number
        //Note: Decimals are okay, parseInt will truncate (4.25 => 4)
        if (!fighters) {
            message.channel.send(`TRY SPECIFYING AN INTEGER NEXT TIME, SKREEHEEHEE!!!`);
            return;
        }

        draft = await client.data.draftStatus(['congregating']);

        //Changing the rules can only occur before picking has begun
        if(!draft) {
            message.channel.send(`IT'S TOO LATE TO CHANGE THE DRAFT'S RULESET, SKREE!!!`);
            return;
        }

        if(time < 60 || time > 1440) {
            message.channel.send(`FIGHTERS MUST HAVE AT LEAST AN HOUR AND AT MOST A FULL DAY TO PICK A VIVOSAUR, SKREE!!!`);
            return;
        }

        //It's time to change the minimum!!!
        await client.data.updatePickTime(draft, time);
        message.channel.send(`@everyone PARTICIPANTS WILL NOW HAVE ${time} MINUTES TO PICK A VIVOSAUR, SKREE!!!`);
    }
}
