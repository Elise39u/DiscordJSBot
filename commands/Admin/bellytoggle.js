const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('..//helpers/embedBuilder');
const fs = require('fs');
const path = './belly.json';
const { ELISE_ID } = process.env;

module.exports = {    
    data: new SlashCommandBuilder()
    .setName('bellytoggle')
    .setDescription('Toggle whether Elise is too full or pregnant to devour more.'),
    async execute(interaction) {
        const eliseId = ELISE_ID;
        if (interaction.user.id !== eliseId) {
            return await interaction.reply({ content: '❌ Only Elise can toggle their belly status!', ephemeral: true });
        }

        let data = { isTooFullOrPregnant: false, swallowedUsers: [] };
        if (fs.existsSync(path)) {
            data = JSON.parse(fs.readFileSync(path, 'utf8'));
        }

        data.isTooFullOrPregnant = !data.isTooFullOrPregnant;
        fs.writeFileSync(path, JSON.stringify(data, null, 4));

        await interaction.reply(`🍼 Belly status updated: **${data.isTooFullOrPregnant ? 'Too full of arcade vistors or currently pregnant~ 💦' : 'Ready for more snacks darligns~ 💗'}**`);
    }
};