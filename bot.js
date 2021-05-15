const config = require('./config.json');
const Discord = require('discord.js');
fs = require("fs");
util = require('util');
readdir = util.promisify(fs.readdir);
mongoose = require('mongoose');

const client = new Discord.Client();

//Initializes collections to be used
client.events = new Discord.Collection();
client.commands = new Discord.Collection();
client.data = require('./database/mongodb.js');
client.logger = require('./console/logger.js');

async function bootSequence() {

    //Boots up every event in ./events
    const eventFiles = fs.readdirSync('./events/');
    for(const file of eventFiles) {
        const event = require(`./events/${file}`);
        const eventName = file.split(".")[0];
        client.logger.event(`Loading Event ~ ${eventName}`);
        client.on(eventName, event.bind(null, client));
    }

    //Loads up every command in ./commands
    let folders = await readdir('./commands/');
    folders.forEach(direct => {
        const commandFiles = fs.readdirSync('./commands/' + direct + '/').filter(file => file.endsWith('.js'));
        for(const file of commandFiles) {
            const command = require(`./commands/${direct}/${file}`)
            client.commands.set(command.name, command);
        }
    });

    //Activates the mongoose database to be used
    mongoose.connect(config.mongoDB, {
        keepAlive: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(() => {
        client.logger.log("Dinomaton found a valid database. It's curtains for us!");
    }).catch(() => {
        client.logger.log("Hmmm, seems like Dinomaton could not find a valid database...");
    });

    //Handles vivosaur documents on first run
    const vivosaurFiles = fs.readdirSync('./database/documents/vivosaurs/');
    var vivoList = [];
    for(const file of vivosaurFiles) {
        const vivosaur = require(`./database/documents/vivosaurs/${file}`);
        if(!(await client.data.vivosaurDocExists(vivosaur))) {
            vivoList.push(vivosaur);
            client.logger.log(`${file.split(".")[0]} has been imported into dinomaton.vivosaurs`);
        }
    }

    //Imports the array of vivosaur documents (if they exist)
    if(vivoList.length > 0) {
        await client.data.importVivosaurs(vivoList);
    }

    client.login(config.token);
}

bootSequence();

//Logs an unintended change in bot status if it occurs
client.on("disconnect", () => client.logger.log("Dinomaton has wreaked too much havoc, disconnecting...", "warn"))
    .on("reboot", () => client.logger.log("Dinomaton's internal processor has cooled down, rebooting...", "log"))
    .on("error", (error) => client.logger.log(error, "error"))
    .on("warn", (warning) => client.logger.log(warning, "warn"));

//Unhandled errors are thrown in the console
process.on("unhandledRejection", (err) => {
    console.error(err);
});