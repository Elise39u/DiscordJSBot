const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const fs = require('fs');
const path = require('path');

const randomGIFs = [
    'https://cdn.discordapp.com/attachments/859788500114210826/1352255226618318859/pjsk-project-sekaiLN.gif?ex=67dd5951&is=67dc07d1&hm=c9aec6954e36d248a90e4629949dc9c38c4535e2fc8e589095aa8218b41033df&',
    'https://cdn.discordapp.com/attachments/859788500114210826/1352255227084013568/pjsk-pjsk-animeVBS.gif?ex=67dd5951&is=67dc07d1&hm=f10502c89b1b952117ecacf2c5c6fb3b39cd42f68628affd0b934931376945a1&',
    'https://cdn.discordapp.com/attachments/859788500114210826/1352255228149239848/pjsk-pjsk-animeMMJ.gif?ex=67dd5952&is=67dc07d2&hm=e0c380766258ddb267936a04ba75ed91898de0ce9c059db9b35508e5cec2eab0&',
    'https://cdn.discordapp.com/attachments/859788500114210826/1352255228581249144/pjsk-pjsk-anime.gif?ex=67dd5952&is=67dc07d2&hm=98d6f0e3f9acd4fccc5cbac986a3c46987a5ebb56097cc11716b8fdeb3674330&',
    'https://cdn.discordapp.com/attachments/859788500114210826/1352255229294542979/pjsk-pjsk-animeLN2.gif?ex=67dd5952&is=67dc07d2&hm=1843c2675b0e8749843931a5170ceeabcb6b6d6339cf5a18da991b8595f56012&',
    'https://cdn.discordapp.com/attachments/859788500114210826/1352256020734541875/pjsk-pjsk-animeNightCord.gif?ex=67dd5a0f&is=67dc088f&hm=8aa8a41e1488246247055dd50c7dd882a081b6ca6f72e952841dc156f8cac15f&',
    'https://cdn.discordapp.com/attachments/859788500114210826/1352256021544046605/pjsk-pjsk-anime.gif?ex=67dd5a0f&is=67dc088f&hm=20772d29780e3d7f131e47191d7f280efb67dbe612c03506c7f78484e598cc6b&'
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('List of available commands I can assist you with'),
    async execute(interaction) {
        const commandDirectories = ['commands', 'server']; // Scan both folders
        let commandList = '';

        const gifLink = randomGIFs[Math.floor(Math.random() * randomGIFs.length)];

        const loadCommands = (dirPath) => {
            const files = fs.readdirSync(dirPath);
            for (const file of files) {
                const filePath = path.join(dirPath, file);
                const stat = fs.lstatSync(filePath);
                if (stat.isDirectory()) {
                    loadCommands(filePath); // Recursively scan subfolders
                } else if (file.endsWith('.js')) {
                    try {
                        const command = require(filePath);
                        if (command?.data?.name && command?.data?.description) {
                            commandList += `🎀 **/${command.data.name}**: ${command.data.description}\n`;
                        }
                    } catch (err) {
                        console.warn(`Skipping invalid command file: ${filePath}`, err);
                    }
                }
            }
        };

        // Load commands from all specified directories
        commandDirectories.forEach((dir) => {
            const fullPath = path.join(__dirname, '..', '..', dir);
            if (fs.existsSync(fullPath)) {
                loadCommands(fullPath);
            }
        });

        // List of upcoming commands
        const comingSoonCommands = [
            { name: 'Lore Explained', description: 'Explaining the order of my lore short, as V3 and LMS approach.' },
            { name: 'Elise introduction', description: 'A short intro of your preggo trans demi poly girl, Elise.' },
            { name: 'Outfits Explained', description: 'A breakdown of all Elise’s outfits.' },
            { name: 'Reference Sheets', description: 'Quick access to creator references for Elise.' },
            { name: 'Clapify', description: '👏 Time 👏 for 👏 a 👏 fun 👏 clapping 👏 session 👏' },
            { name: 'EGS Story', description: 'Explaining the meaning of EGS—Elise Gender Story.' },
            { name: 'LMS Story', description: 'Explaining LMS (Luka Missing Story), Elise’s first adventure.' },
            { name: 'Stellar Genesis Womb', description: 'A deep dive into Elise’s uterus and its unique powers.' },
        ];

        // Add upcoming commands to the list
        let comingSoonList = '\n✨ **Upcoming Features** ✨\n';
        comingSoonCommands.forEach(cmd => {
            comingSoonList += `🚧 **/${cmd.name}**: ${cmd.description}\n`;
        });

        const embed = createEmbed('Help - Available Commands', commandList + comingSoonList, gifLink);
        await interaction.reply({ embeds: [embed] });
    },
};