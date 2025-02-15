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

        // Soon to come commands 
        const comingSoonCommands = [
            { name: 'Lore Explained', description: 'With V3 on the Horizion and LMS in the making. I wanna explain the order of my lore short.' },
            { name: 'Elise introduction', description: 'An shorter introduction of your preggo trans demi poly preggo girl. Then #962632709405032458' },
            { name: 'Outifits Explained', description: 'Elise has so many outfits so why not explain them' },
            { name: 'Refernece Sheets', description: 'An quick reminder on where you can find a few of my creators looks' },
            { name: 'Server Info', description: 'Gain some information on this arcade' },
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