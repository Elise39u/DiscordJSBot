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

        // Check for guild avatar first
        let avatarURL;
        if (targetMember.avatar) {
            avatarURL = targetMember.displayAvatarURL({ dynamic: true, size: 512 });
        } else {
            avatarURL = targetUser.displayAvatarURL({ dynamic: true, size: 512 });
        }

        // Use nickname if available, otherwise username
        const displayName = targetMember.nickname || targetUser.username;

        const embed = createEmbed(`I found ${targetUser.username}'s Avatar`, " ", avatarURL, "🎀 The avtar of " + displayName + " for you 🎀");
        await interaction.reply({ embeds: [embed] });
    },
};