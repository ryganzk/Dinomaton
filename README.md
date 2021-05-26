# Dinomaton
A Discord bot tied with MongoDB to act upon data for a Fossil Fighters Champions draft league

# Command Types
**Command Type** |  **Help Command** | **Command Description**
---------------- | ----------------- | ---------------------------------------------------------------------------------------------
Admin            | d!adminhelp       | contians commands for moderating draft flow and fighters
Draft            | d!drafthelp       | contains commands for fighters participating in drafts, such as team picking
Fighter          | d!fighterhelp     | contains commands for setting up battles with other fighters, as well as looking up vivosaurs

# Requirements
1. A **Discord Bot Token**, you can create yourself by using: https://discord.com/developers/applications
2. **Node.js** for running the modules that enable the bot to function: https://nodejs.org/en/ 
3. A **MongoDB cluster** for storing data, they offer a free plan that gives you 500MB: https://www.mongodb.com
4. A terminal for running the bot, personal recommendation would be to use **Visual Studio Code**: https://code.visualstudio.com

# Setup
This guide will go over how to set up Dinomaton locally on your own machine. Chances are if you're familiar with remotely hosting bots, you'll already know what to do

1. Download the latest release and extract
2. On the homepage of your newly created cluster (see second requirement above), selecct Connect
    1. Add your connection IP address (MongoDB will automatically find it, so all you need to do is accept)
    2. Create a database user for yourself, make sure to set a secure username and password
    3. Click **Choose a connection method** and select **Connect using MongoDB Compass**. Proceed to download and install MongoDB Compass onto your system
    4. Copy the connection string at the bottom of the installation page and paste it into MongoDB Compass (remember to insert the password you set!!!)
3. Open the newly extracted folder in VS Code, and paste your bot token and MongoDB connection string within the config.json file
4. Use ```npm install``` in the VS Code terminal
5. You're good to go! Run ```npm run start``` and Dinomaton should go online!!!

# Common Errors
> ```npm install``` is throwing an error

You may need to reinstall Node.js with extra components, or re-open the terminal
> The bot starts up but it won't connect to the cluster

Open a new MongoDB Compass window, and override the original connection string with the new one. I think this string tacks on a few permissions at the end that grants other applications connection perms
