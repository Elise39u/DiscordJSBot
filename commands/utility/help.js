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

        // Soon to come commands 
        const comingSoonCommands = [
            { name: 'Lore Explained', description: 'With V3 on the Horizion and LMS in the making. I wanna explain the order of my lore short.' },
            { name: 'Elise introduction', description: 'An shorter introduction of your preggo trans demi poly preggo girl. Then #elise-introduction in the elise corner' },
            { name: 'Outifits Explained', description: 'Elise has so many outfits so why not explain them' },
            { name: 'Refernece Sheets', description: 'An quick reminder on where you can find a few of my creators looks' },
            { name: 'clapify', description: '👏 Time 👏 for 👏 a 👏 fun 👏 clapping 👏 session 👏' },
            { name: 'EGS story', description: 'Interested in what EGS stands for... Its the Elise Gender Story.. Im here to explain it' },
            { name: 'LMS story', description: 'Wonder what LMS stands for now its considerd canon lore? Luka missing story and im here to explain Elises 1st adventure' },
            { name: 'Stellar Genesis Womb', description: 'A more in debt explanation about elise her utures and powers surrounding it' },
        ];

        //Add the commands to an list to add later to the command lst 
        let comingSoonList = '\n✨ **New Abbilties Coming Soon** ✨\n';
        comingSoonCommands.forEach(cmd => {
            comingSoonList += `🚧 **/${cmd.name}**: ${cmd.description}\n`;
        });
        
        const embed = createEmbed('Help - Available Commands', commandList + comingSoonList, gifLink);
        await interaction.reply({ embeds: [embed] });
    },
};