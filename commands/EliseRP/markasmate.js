const { SlashCommandBuilder } = require('discord.js');
const { ELISE_ID } = process.env;
const fs = require('fs');
const path = './harem.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('markasmate')
        .setDescription('Mark someone as part of your divine harem~')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The lucky one you’re claiming~')
                .setRequired(true)),
    async execute(interaction) {
        if (interaction.user.id !== ELISE_ID) {
            return interaction.reply({ content: '❌ Only the Goddess may bestow the honor of being marked as a mate~', ephemeral: true });
        }

        const target = interaction.options.getUser('target');

        let haremData = { mates: [] };
        if (fs.existsSync(path)) {
            haremData = JSON.parse(fs.readFileSync(path, 'utf8'));
        }

        if (!haremData.mates.includes(target.id)) {
            haremData.mates.push(target.id);
            fs.writeFileSync(path, JSON.stringify(haremData, null, 4));
        }

        await interaction.reply({
            content: `💍 You’re mine now, ${target}. Claimed by your Goddess and forever part of my divine harem~ Step out of line, and I’ll remind you exactly who you belong to~ 💋`,
            allowedMentions: { users: [target.id] }
        });
    }
};