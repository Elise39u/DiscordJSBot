const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('..//helpers/embedBuilder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get your own or some one elses avatar')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user whos avatar you want')
                .setRequired(false)),
    async execute(interaction) {
        const targetUser = interaction.options.getUser('user') || interaction.user;
        const targetMember = await interaction.guild.members.fetch(targetUser.id);

        // Check if the user has a guild avatar
        const avatarURL = targetMember.avatar 
            ? `https://cdn.discordapp.com/guilds/${interaction.guild.id}/users/${targetUser.id}/avatars/${targetMember.avatar}.png?size=512`
            : targetUser.displayAvatarURL({ dynamic: true, size: 512 });

        const embed = createEmbed(`I found ${targetUser.username}'s Avatar`, " ", avatarURL, "🎀 The avtar of " + targetMember.username + " for you 🎀");
        await interaction.reply({ embeds: [embed] });
    },
};