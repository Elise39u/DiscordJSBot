const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clapify')
        .setDescription('👏 Time 👏 To 👏 Clap 👏 Your 👏 Message 👏')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('👏 Time 👏 To 👏 Clap 👏')
                .setRequired(true)),
    async execute(interaction) {
        const inputText = interaction.options.getString('text');
        const clapifiedText = inputText.split(' ').join(' 👏 ');
        await interaction.reply(clapifiedText);
    },
};