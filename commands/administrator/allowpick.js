const Discord = require('discord.js');

module.exports = {
    name: 'allowpick',
    administrator: true,

    async execute(client, message, args) {

        //First off a draft needs to actually exist
        if (!(await client.data.findOngoing())) {
            message.channel.send(`NO CURRENT DRAFT EXISTS AT THIS POINT IN TIME, SKREE!!!`);
            return;
        }

        let draft = await client.data.draftStatus(['congregating']);

        //We got a problem if no draft is congregating
        if(!draft) {
            message.channel.send(`THE CURRENT DRAFT IS NOT AT A POINT ALLOWING FOR VIVOSAUR SELECTIONS, SKREE!!!`);
            return;

        //We also need to check if enough players have enrolled in the draft to begin
        //Note: currently can't think of a way to compare lengths through a mongoose query, so this is the best method I have as of now
        } else if(draft.fighterList.length < draft.minFighters) {
            message.channel.send(`WE NEED ${draft.minFighters - draft.fighterList.length} MORE PLAYERS TO BEGIN THE VIVOSAUR SELECTION PROCESS, SKREE!!!`);
            return;

        //Cool let's move on to picking vivosaurs now!!!
        } else {
            message.channel.send(`@everyone DRAFT REGISTRATION HAS COME TO A CLOSE, THE VIVOSAUR PICKS WILL BEING MOMENTARILY, SKREE!!!`);
            return;
        }
    }
}