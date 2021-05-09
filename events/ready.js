module.exports = async(client) => {
    try {
        client.user.setPresence({ activity: { name: `with your sanity`, type: "PLAYING" }, status: "online" });
        client.logger.ready(`${client.user.tag} is now up and ready to shred!`);
    } catch (err) {
        console.log(err);
    }
};