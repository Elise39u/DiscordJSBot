const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const fs = require('fs');
const path = require('path');
const { errorHandeler } = require('../helpers/errorHandler');

const randomGIFs = [
    'https://cdn.discordapp.com/attachments/859788500114210826/1352255226618318859/pjsk-project-sekaiLN.gif',
    'https://cdn.discordapp.com/attachments/859788500114210826/1352255227084013568/pjsk-pjsk-animeVBS.gif',
    'https://cdn.discordapp.com/attachments/859788500114210826/1352255228149239848/pjsk-pjsk-animeMMJ.gif',
    'https://cdn.discordapp.com/attachments/859788500114210826/1352255228581249144/pjsk-pjsk-anime.gif',
    'https://cdn.discordapp.com/attachments/859788500114210826/1352255229294542979/pjsk-pjsk-animeLN2.gif',
    'https://cdn.discordapp.com/attachments/859788500114210826/1352256020734541875/pjsk-pjsk-animeNightCord.gif',
    'https://cdn.discordapp.com/attachments/859788500114210826/1352256021544046605/pjsk-pjsk-anime.gif'
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('List of available commands I can assist you with'),
    async execute(interaction) {
        const commandDirectories = ['commands']; // for multiple folders outside commands we could use 'commands', 'server' and so on.. But this causes issue #5
        const categories = {};

        const gifLink = randomGIFs[Math.floor(Math.random() * randomGIFs.length)];

        // Load commands categorized by subfolder
        const loadCommands = async (dirPath, category = 'General') => {
            try {
                const files = fs.readdirSync(dirPath);
                for (const file of files) {
                    const filePath = path.join(dirPath, file);
                    const stat = fs.lstatSync(filePath);

                    if (stat.isDirectory()) {
                        loadCommands(filePath, file); 
                    } else if (file.endsWith('.js')) {
                        const command = require(filePath);
                        if (command?.data?.name && command?.data?.description) {
                            if (!categories[category]) categories[category] = [];
                            categories[category].push(`🎀 **/${command.data.name}** - ${command.data.description}`);
                        }
                    }
                }
            } catch (error) {
                await errorHandeler(error.message, 0xFFFF00, "HELP_command_Warning_Invalid_Path", "help");
            }
        };

        // Load commands from all specified directories
        for (const dir of commandDirectories) {
            const fullPath = path.join(__dirname, '..', '..', dir);
            if (fs.existsSync(fullPath)) {
                loadCommands(fullPath);
            }
        }

        // Generate the command list with categories
        let commandList = '';
        for (const [category, commands] of Object.entries(categories)) {
            commandList += `\n### ${category}\n${commands.join('\n')}`;
        }

        // Upcoming commands
        const comingSoonCommands = [
            { name: 'Lore Explained', description: 'Explaining the order of my lore short, as V3 and LMS approach.' },
            { name: 'Elise introduction', description: 'A short intro of your preggo trans demi poly girl, Elise.' },
            { name: 'Outfits Explained', description: 'A breakdown of all Elise’s outfits.' },
            { name: 'Reference Sheets', description: 'Quick access to creator references for Elise.' },
            { name: 'Clapify', description: '👏 Time 👏 for 👏 a 👏 fun 👏 clapping 👏 session 👏' },
            { name: 'Stellar Genesis Womb', description: 'Explained why Elise is the goddess of reproduction and her abbilties around this power.' },
            { name: 'Yume', description: 'A small insight into the realationship between my creator Elise and their wife Miku... Also known as Yume ships.' },
        ];

        let comingSoonList = '\n✨ **Upcoming Features** ✨\n';
        comingSoonCommands.forEach(cmd => {
            comingSoonList += `🚧 **/${cmd.name}** - ${cmd.description}\n`;
        });

        const embed = createEmbed('Help - Available Commands', commandList + '\n' + comingSoonList, gifLink, "🎀 See what your assistant can do? 🎀");
        await interaction.reply({ embeds: [embed] });
    },
};