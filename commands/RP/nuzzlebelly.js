const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('nuzzlebelly')
    .setDescription('Nuzzle against the goddess’s divine, pregnant belly~ Let her feel your desire~ 💖'),
    async execute(interaction) {
        const user = interaction.user;
        if (user.id === ELISE_ID) return interaction.reply({ content: 'You can’t nuzzle yourself, goddess~ 💖', ephemeral: true });
    
        return interaction.reply({
          content: `Aww~ ${user.username} presses their cheek into my big, swollen belly~ Mmm… such a worshipful little thing 💕 Keep that up, or I might make you part of it~`,
        });
    }
};