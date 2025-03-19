const { Events } = require('discord.js');
const { handleMemberLeave } = require('./handlers/leaveHandler'); 

module.exports = {
    name: Events.GuildMemberRemove,
    async execute(member) {
        console.log("Reacheed Module export")
        await handleMemberLeave(member);
    }
};
