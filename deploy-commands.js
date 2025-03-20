const { REST, Routes } = require('discord.js');
require('dotenv').config();
const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const commandDirectories = ['commands', 'server']; // Include both commands and server folders

// Function to read commands recursively
function loadCommandsFromDirectory(directory) {
    const dirPath = path.join(__dirname, directory);
    if (!fs.existsSync(dirPath)) return;

    const files = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const file of files) {
        const filePath = path.join(dirPath, file.name);
        if (file.isDirectory()) {
            loadCommandsFromDirectory(path.join(directory, file.name)); // Recursively search subfolders
        } else if (file.name.endsWith('.js')) {
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                console.log(`✅ Loaded command from: ${filePath}`);
                commands.push(command.data.toJSON());
            } else {
                console.log(`⚠️ [WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
}

// Load all commands from specified directories
for (const directory of commandDirectories) {
    loadCommandsFromDirectory(directory);
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(DISCORD_TOKEN);

// Deploy the commands
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands },
        );

        console.log(`✅ Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(`❌ Error deploying commands:`, error);
    }
})();