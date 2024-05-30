const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const fs = require('fs');
const path = require('path');

const randomGIFs = [
    'https://tenor.com/qeig35TKySs.gif',
    'https://tenor.com/cdRxxHTK3tP.gif',
    'https://tenor.com/vBqGT3ywErC.gif',
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('List of avalibile options this preggo assiant can help you with'),
    async execute(interaction) {
        const commandsDir = path.join(__dirname, '..', '..', 'commands');
        let commandList = '';

        const gifLink = randomGIFs[Math.floor(Math.random() * randomGIFs.length)];
        const loadCommands = (dir) => {
            const files = fs.readdirSync(dir);
            for (const file of files) {
                const stat = fs.lstatSync(path.join(dir, file));
                if (stat.isDirectory()) {
                    loadCommands(path.join(dir, file));
                } else if (file.endsWith('.js')) {
                    const command = require(path.join(dir, file));
                    if (command && command.data && command.data.name) {
                        commandList += `🎀 **/${command.data.name}**: ${command.data.description}\n`;
                    }
                }
            }
        };

        loadCommands(commandsDir);

        const embed = createEmbed('Help - Available Commands', commandList, gifLink);
        await interaction.reply({ embeds: [embed] });
    },
};