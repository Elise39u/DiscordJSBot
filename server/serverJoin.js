const { Events } = require('discord.js');
const { handleMemberJoin } = require('./handlers/joinHandler'); 

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        await handleMemberJoin(member);
    }
};
