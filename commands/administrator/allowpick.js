const Discord = require('discord.js');

module.exports = {
    name: 'allowpick',
    administrator: true,

    async execute(client, message, args) {

        //First off a draft needs to actually exist
        if (!(await client.data.findOngoing())) {
            message.channel.send(`NO CURRENT DRAFT EXISTS AT THIS POINT IN TIME, SKREE!!!`);
            return;
        
        //Check if current draft is already at vivosaur picks
        } else if(await client.data.draftStatus(['picking vivosaurs'])) {
            message.channel.send(`VIVOSAUR PICKS ARE ALREADY UNDERWAYS, SKREE!!!`);
            return;
        }

        let draft = await client.data.draftStatus(['congregating']);

        //We got a problem if no draft is congregating
        if(!draft) {
            message.channel.send(`THE CURRENT DRAFT IS NOT AT A POINT ALLOWING FOR VIVOSAUR SELECTIONS, SKREE!!!`);

        //We also need to check if enough players have enrolled in the draft to begin
        //Note: currently can't think of a way to compare lengths through a mongoose query, so this is the best method I have as of now
        } else if(draft.fighterList.length < draft.minFighters) {
            message.channel.send(`WE NEED ${draft.minFighters - draft.fighterList.length} MORE PLAYERS TO BEGIN THE VIVOSAUR SELECTION PROCESS, SKREE!!!`);

        //Cool let's move on to picking vivosaurs now!!!
        } else {
            await client.data.setDraftStatus(draft, 'picking vivosaurs');
            message.channel.send(`@everyone DRAFT REGISTRATION HAS COME TO A CLOSE, THE VIVOSAUR PICKS WILL BEGIN MOMENTARILY, SKREE!!!`); 

            for (let i = draft.fighterList.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  [draft.fighterList[i], draft.fighterList[j]] = [draft.fighterList[j], draft.fighterList[i]];
            }

            for(let i in draft.fighterList) {
                var fighterOrder = fighterOrder + `<@${draft.fighterList[i].id}> => `;
            }
            await client.data.updateFighters(draft, draft.fighterList)
            message.channel.send(`DRAFT PICK ROTATION: ${fighterOrder.substring(9, fighterOrder.length - 4)}`);
        }
    }
}