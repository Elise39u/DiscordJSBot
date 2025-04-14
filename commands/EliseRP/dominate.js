const { SlashCommandBuilder } = require('discord.js');
const { ELISE_ID } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dominate')
        .setDescription('Assert your divine dominance over a chosen one~')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Who’s getting put in their place?')
                .setRequired(true)),
    async execute(interaction) {
        if (interaction.user.id !== ELISE_ID) {
            return interaction.reply({ content: '❌ Only the Goddess herself may unleash her divine dominance~', ephemeral: true });
        }

        const target = interaction.options.getUser('target');

        await interaction.reply({
            content: `💫 *Kneel.* You belong to me now, ${target}. Your body, your will, even your thoughts—they’re mine to toy with~ Obey your Goddess or I’ll show you what happens when you don’t~ 😈`,
            allowedMentions: { users: [target.id] }
        });
    }
};