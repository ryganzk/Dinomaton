const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'vivosaurlist',
    fighter: false,
    administrator: false,

    async execute(client, message, args) {
        var vivosaurList;
        var superEvolverList;

        //Executes if a query has been specified
        if(args[0]) {
            query = args[0].charAt(0).toUpperCase() + args[0].substring(1).toLowerCase();
            secondQuery = args[1]

            //Determines if the user provided any search queries
            switch(query) {
                case "Fire":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Fire");
                    break;
                case "Earth":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Earth");
                    break;
                case "Air":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Air");
                    break;
                case "Water":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Water");
                    break;
                case "Neutral":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Neutral");
                    break;
                case "Legendary":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Legendary");
                    break;
                case "Theropods":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Theropods");
                    break;
                case "Sauropods":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Sauropods");
                    break;
                case "Ornithopods":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Ornithopods");
                    break;
                case "Stegosaurs":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Stegosaurs");
                    break;
                case "Ankylosaurs":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Ankylosaurs");
                    break;
                case "Ceratopsians":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Ceratopsians");
                    break;
                case "Pterosaurs":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Pterosaurs");
                    break;
                case "Synapsids":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Synapsids");
                    break;
                case "Pliosaurs":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Pliosaurs");
                    break;
                case "Rhinoceros":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Rhinoceros");
                    break;
                case "Felidae":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Felidae");
                    break;
                case "Artiodactyla":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Artiodactyla");
                    break;
                case "Ammonites":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Ammonites");
                    break;
                case "Trilobites":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Trilobites");
                    break;
                case "Carnivore":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Carnivore");
                    break;
                case "Herbivore":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Herbivore");
                    break;
                case "Omnivore":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Omnivore");
                    break;
                case "Small":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Small");
                    break;
                case "Medium":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Medium");
                    break;
                case "Large":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Large");
                    break;
                case "Titanic":
                    vivosaurList = await client.data.returnAllVivosaursWithQuery("Titanic");
                    break;
                case "Alphabetical":
                    vivosaurList = await client.data.returnAllVivosaurs();
                    break;
                default:
                    message.channel.send('SEEMS LIKE YOUR SPECIFIED QUERY GAVE NO MATCHES, SKREE!!!');
                    throw new Error('Oops false query');
            }

        //No query, run like normal
        } else {
            vivosaurList = await client.data.returnAllVivosaurs();
        }

        superEvolverList = await client.data.returnAllSuperEvolvers();

        //Sorts vivosaur list (unless specified)
        if(args[args.length - 1]) {
            if(args[args.length - 1].toLowerCase() !== "alphabetical") {
                vivosaurList.sort(function (x, y) {
                    return x.num - y.num;
                });
            }
        } else {
            vivosaurList.sort(function (x, y) {
                return x.num - y.num;
            });
        }

        vivosaurCount = vivosaurList.length;

        var pages = [];
        currentPage = 1;
        var superEvolverListPosition = 0;

        for(var i = 0; i < vivosaurCount; i++) {
            let vivosaurName = ``;
            let vivosaur = vivosaurList[i];

            //Sets embed color and emoji to corresponding vivosaur element (emojis stored in images/emojis)
            //You can change the names in ./config.json if you need to
            switch(vivosaur.element) {
                case "Fire":
                    var element = client.emojis.cache.find(emoji => emoji.name === config.emojis.fireMedal);
                    break;
                case "Earth":
                    var element = client.emojis.cache.find(emoji => emoji.name === config.emojis.earthMedal);
                    break;
                case "Air":
                    var element = client.emojis.cache.find(emoji => emoji.name === config.emojis.airMedal);
                    break;
                case "Water":
                    var element = client.emojis.cache.find(emoji => emoji.name === config.emojis.waterMedal);
                    break;
                case "Neutral":
                    var element = client.emojis.cache.find(emoji => emoji.name === config.emojis.neutralMedal);
                    break;
                case "Legendary":
                    var element = client.emojis.cache.find(emoji => emoji.name === config.emojis.legendaryMedal);
                    break;
            }

            //Sets the description of the new embed object to vivosaur number + element + name
            //Note: this switch statement determines whether 0's needs to be output in front of the vivosaur's number
            switch (Math.floor(Math.log10(vivosaur.num))) {
                case 0:
                    vivosaurName = `#00${vivosaur.num} ${element} ${vivosaur.name}`;
                    break;
                case 1:
                    vivosaurName = `#0${vivosaur.num} ${element} ${vivosaur.name}`;
                    break;
                case 2:
                    vivosaurName = `#${vivosaur.num} ${element} ${vivosaur.name}`;
                    break;
            }

            //Checks if the vivosaur has a super evolver
            for(var j = 0; j < superEvolverList.length; j++) {
                if(vivosaur.num === superEvolverList[j].num) {
                    vivosaurName = vivosaurName + ` (${superEvolverList[j].name})`;
                    superEvolverList.splice(j, 1);
                }
            }

            vivosaurName = vivosaurName + `\n`

            //Decides what page number to put the vivosaur on
            pageNum = Math.floor((i / 20));
            pages[pageNum] = pages[pageNum] + vivosaurName;
        }

        embed = new Discord.MessageEmbed()
        .setColor('BLURPLE')
        .setDescription(`**${pages[currentPage - 1].substring(9)}**`)
        .setFooter(`Page 1 of ${pages.length}`);

        let msg = await message.channel.send(embed);
        
        //Adds reaction collectors if more than a single page exists
        if(pages.length > 1) {
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
                if(currentPage === 1) currentPage = pages.length;
                else --currentPage;

                embed.setDescription(`**${pages[currentPage - 1].substring(9)}**`)
                .setFooter(`Page ${currentPage} of ${pages.length}`);
                msg.edit(embed);
            });

            //Advances the page forward if the right emoji is selected
            forward.on("collect", react => {
                react.users.remove(message.author.id);

                if(currentPage === pages.length) currentPage = 1;
                else ++currentPage;

                embed.setDescription(`**${pages[currentPage - 1].substring(9)}**`)
                .setFooter(`Page ${currentPage} of ${pages.length}`);
                msg.edit(embed);
            });
        }
    }
}
