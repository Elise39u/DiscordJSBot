const { REST, Routes } = require('discord.js');
require('dotenv').config();
const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const rest = new REST().setToken(DISCORD_TOKEN);

(async () => {
    try {
        console.log('🔄 Resetting all application (/) commands...');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [] });
        console.log('✅ Successfully reset all commands!');
    } catch (error) {
        console.error('❌ Failed to reset commands:', error);
    }
})();