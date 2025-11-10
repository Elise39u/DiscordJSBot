const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = './belly.json';
const { ELISE_ID } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fertilitybless')
        .setDescription('Bless someone with heightened fertility or heat~')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Who shall feel your fertile touch?')
                .setRequired(true)),

    async execute(interaction) {
        const target = interaction.options.getUser('target');

        if (interaction.user.id !== ELISE_ID) {
            return interaction.reply({ content: '❌ Only the divine Elise may bless others with fertility~', ephemeral: true });
        }

        const data = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path)) : {};

        if (!data.fertilityBlessings) data.fertilityBlessings = {};
        data.fertilityBlessings[target.id] = {
            by: interaction.user.username,
            since: new Date().toISOString()
        };

        fs.writeFileSync(path, JSON.stringify(data, null, 4));

        await interaction.reply({
            content: `🌺 You reach out with a sultry whisper... and bless **${target.username}** with irresistible fertility~ 💫`,
            ephemeral: false
        });
    }
};