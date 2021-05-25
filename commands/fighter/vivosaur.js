const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'vivosaur',
    fighter: false,
    administrator: false,

    async execute(client, message, args) {
        var superEvolver = false;

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

        let vivosaur = await client.data.vivosaurExists(vivoName);
        
        //If the above statement didn't give back a normal vivosaur, we might have a super evolver on our hands
        if(!vivosaur) {
            vivosaur = await client.data.superEvolverExists(vivoName);
            superEvolver = true;
        }
        
        //If we STILL don't have a vivosaur, then it must not really exist
        if(!vivosaur) {
            message.channel.send("THAT VIVOSAUR DOES NOT EXIST, SKREE!!!");
            return;
        }

        var vivoLength = vivosaur.misc.length;

        let embed = new Discord.MessageEmbed()

        //Sets embed color and emoji to corresponding vivosaur element (emojis stored in images/emojis)
        //Note: you can change the emoji names below to whatever you want, but these are their default names
        switch (vivosaur.element) {
            case "Fire":
                embed.setColor('RED');
                var element = client.emojis.cache.find(emoji => emoji.name === config.emojis.fireMedal);
                break;
            case "Earth":
                embed.setColor('GOLD')
                var element = client.emojis.cache.find(emoji => emoji.name === config.emojis.earthMedal);
                break;
            case "Air":
                embed.setColor('GREEN');
                var element = client.emojis.cache.find(emoji => emoji.name === config.emojis.airMedal);
                break;
            case "Water":
                embed.setColor('BLUE');
                var element = client.emojis.cache.find(emoji => emoji.name === config.emojis.waterMedal);
                break;
            case "Neutral":
                embed.setColor('FFFFFE'); //Pure white cannot be set, so we have to make-do with the next closest thing: 99.9% white
                var element = client.emojis.cache.find(emoji => emoji.name === config.emojis.neutralMedal);
                break;
            case "Legendary":
                embed.setColor('000001'); //Same old, we need to use 99.9% black
                var element = client.emojis.cache.find(emoji => emoji.name === config.emojis.legendaryMedal);
                break;
        }

        //Sets the description of the new embed object to vivosaur number + element + name
        //Note: this switch statement determines whether 0's needs to be output in front of the vivosaur's number
        switch (Math.floor(Math.log10(vivosaur.num))) {
            case 0:
                embed.setTitle(`**#00${vivosaur.num} ${element} ${vivosaur.name}**`);
                break;
            case 1:
                embed.setTitle(`**#0${vivosaur.num} ${element} ${vivosaur.name}**`);
                break;
            case 2:
                embed.setTitle(`**#${vivosaur.num} ${element} ${vivosaur.name}**`);
                break;
        }

        let desc1 = `**Class:** ${vivosaur.class}\n**Description:** ${vivosaur.description}`;
        let desc2 = ``;
        let desc3 = ``;
        let skillFields = [];

        //Creates the embed fields for skills
        for(i in vivosaur.skills) {

            //Creates varaibles for skill data
            //Ternary expressions are used to check if the vivosaur contains data corresponding to (some skills don't include baseDamage or effects)
            //Base damage also includes a ternary to increase damage by 5 if a super evolver is detected
            let baseDamage = vivosaur.skills[i].baseDamage ? `**Damage:** ${vivosaur.skills[i].baseDamage
                + (vivosaur.misc.genus ? vivosaur.stats.ATT : vivosaur.stats.ATT + 5)}` : ``;
            let fpCost = vivosaur.skills[i].fpCost ? `**FP Cost:** ${vivosaur.skills[i].fpCost}` : ``;
            let effect = vivosaur.skills[i].effect ? `**Effect:** ${vivosaur.skills[i].effect.description}` : ``;

            //If a skill has an additional effect, this takes on the rate to the skill description
            if(effect !== '' && vivosaur.skills[i].effect.rate) effect = effect + ` (${vivosaur.skills[i].effect.rate}%)`;            
            
            //Determines whether a skill is support, team, ability, or normal
            //Unfortunately Discord doesn't allow for colored text (and I'm not using code blocks eww), so colored blocks will do for now
            if(vivosaur.skills[i].type === "Support") {
                skillFields.push({name: `🟩 **__${vivosaur.skills[i].name}__**`, value: `${baseDamage}\n${fpCost}\n${effect}`});
            } else if(vivosaur.skills[i].type === "Team") {
                skillFields.push({name: `🟥 **__${vivosaur.skills[i].name}__**`, value: `${baseDamage}\n${fpCost}\n${effect}`});
            } else if(vivosaur.skills[i].type === "Ability") {
                skillFields.push({name: `🟦 **__${vivosaur.skills[i].name}__**`, value: `${effect}`});
            } else {
                skillFields.push({name: `🟧 **__${vivosaur.skills[i].name}__**`, value: `${baseDamage}\n${fpCost}\n${effect}`});
            }
        }
        
        //Checks whether or not the vivosaur is a super evolver, and prints out the appropriate miscellaneous data
        //Also adds gold fossil bonuses under stats if the vivo IS a super evolver
        if (!superEvolver) {
            var goldFossilStatBonus = ``;
            var goldFossilLPBonus = ``;
        } else {
            var goldFossilStatBonus = ` (+5)`;
            var goldFossilLPBonus = ` (+100)`;
        }

        //Fills out page 3 data, including various miscellaneous data
        //This loop takes all data in the misc section and creates specialized groups (some data is unique, such as most of the dinomaton's data wow this bot's soooo special)
        for (var name in vivosaur.misc) {
            dataHeader = name[0].toUpperCase() + name.substring(1, name.length).replace(/([a-z])([A-Z])/g, `$1 $2`);

            if(name === 'length') {
                desc3 = desc3 + `**${dataHeader}:** ${vivosaur.misc[name].feet} ft. - ${vivosaur.misc[name].meters} m. (${vivosaur.misc[name].overall})\n`;
            } else {
                desc3 = desc3 + `**${dataHeader}:** ${vivosaur.misc[name]}\n`;
            }
        }

        //Creates the embed fields for stats
        const statFields = [{name: `**__VIVOSAUR STATS__**`, value: `**LP:** ${vivosaur.stats.LP + goldFossilLPBonus}\n**ATT:** ${vivosaur.stats.ATT + goldFossilStatBonus}\n**DEF:** ${vivosaur.stats.DEF + goldFossilStatBonus}\n**ACC:** ${vivosaur.stats.ACC + goldFossilStatBonus}\n**SPE:** ${vivosaur.stats.SPE + goldFossilStatBonus}`, inline: true},
        {name: `**__SUPPORT EFFECTS__**`, value: `**Support Position:** ${supportEffect(vivosaur.support.supportPosition)}\n**ATT:** ${supportEffect(vivosaur.support.ATT)}\n**DEF:** ${supportEffect(vivosaur.support.DEF)}\n**ACC:** ${supportEffect(vivosaur.support.ACC)}\n**SPE:** ${supportEffect(vivosaur.support.SPE)}`, inline: true}];

        let desc = [desc1, desc2, desc3];
        let currentPage = 1;
        
        //Creates an attachment so the vivosaur sprite can be displayed locally (sprites stored in images/sprites)
        const vivoSprite = vivosaur.sprite.substring(15);
        const sprite = new Discord.MessageAttachment(vivosaur.sprite, vivoSprite);
        
        //Creates the embedded message on the first page
        embed.attachFiles(sprite)
        .setThumbnail(`attachment://${vivoSprite}`)
        .setDescription(desc[currentPage - 1])
        .addFields(statFields)
        .setTimestamp()
        .setFooter(`All data corresponds to Fossil Fighters: Champions`);

        //Actually sends the message and adds reactions
        let msg = await message.channel.send(embed);
        await msg.react("⬅️");
        await msg.react("➡️");

        //Filters to be used in tandem with the collectors defined below
        const backwardFilter = (reaction, user) => reaction.emoji.name === "⬅️" && user.id === message.author.id;
        const forwardFilter = (reaction, user) => reaction.emoji.name === "➡️" && user.id === message.author.id;

        //Reaction collectors to advance pages (time is in milliseconds, atm each collector expires after a minute)
        const backward = msg.createReactionCollector(backwardFilter, { time: 60000 });
        const forward = msg.createReactionCollector(forwardFilter, { time: 60000 });

        //Advances the page back if the left emoji is selected
        backward.on("collect", react => {
            react.users.remove(message.author.id);
            if(currentPage === 1)
                currentPage = 3;
            else
                --currentPage;

            basePage(currentPage, embed, statFields, skillFields);
            embed.setDescription(desc[currentPage - 1]);
            msg.edit(embed);
        });

        //Advances the page forward if the right emoji is selected
        forward.on("collect", react => {
            react.users.remove(message.author.id);

            if(currentPage === 3)
                currentPage = 1;
            else
                ++currentPage;

            basePage(currentPage, embed, statFields, skillFields);
            embed.setDescription(desc[currentPage - 1]);
            msg.edit(embed);
        });
    } 
}

//Outside function used to set null supports to '---'
function supportEffect(support) {
    if(!support) return '---';
    else if (support > 0) return `+${support}%`;
    else return (support === 'Own AZ' || support === 'Enemy AZ') ? `${support}` : `${support}%`;
}

//Outside function used to set the right fields
function basePage(page, embedMessage, statFields, skillFields) {
    if(page === 1) {
        embedMessage.fields = [];
        return embedMessage.addFields(statFields);
    }
    else if(page === 2) {
        embedMessage.fields = [];
        return embedMessage.addFields(skillFields);
    }
    else return embedMessage.fields = [];
}
