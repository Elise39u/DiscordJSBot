const { Events } = require('discord.js');
const { handleMemberLeave } = require('./handlers/leaveHandler'); 

module.exports = {
    name: Events.GuildMemberRemove,
    async execute(member) {
        await handleMemberLeave(member);
    }
};
