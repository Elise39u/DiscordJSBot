const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { createEmbed } = require('../commands/helpers/embedBuilder');
const { GUILD_ID } = process.env;

const errorChanneld = "822837640872067082";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Get information about our little arcade :3.'),
    async execute(interaction) {
        try {
            const guild = await interaction.client.guilds.fetch(GUILD_ID);
            if (!guild) {
                return interaction.reply("Error: Guild not found.");
            }

            const owner = await guild.fetchOwner();
            const memberCount = guild.memberCount;
            const rolesCount = guild.roles.cache.size;
            const channelCount = guild.channels.cache.size;
            const dateCreated = `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`;

            const embed = new EmbedBuilder()
            .setColor(6331378)
            .setTitle("Arcade Sekai Information")
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: "Arcade Sekai Owner", value: owner.user.tag, inline: false },
                { name: "Sekai Date Found", value: dateCreated, inline: false },
                { name: "Sekai visitor count", value: `${memberCount}`, inline: false },
                { name: "Sekai rooms count", value: `${channelCount}`, inline: false },
                { name: "Sekai Roles Count", value: `${rolesCount}`, inline: false }
            )
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        await interaction.reply({ embeds: [embed] });

        } catch (error) {
            const errorChannel = member.guild.channels.cache.get(errorChanneld);
            if(errorChannel) {
                const errorEmbed = new createEmbed("Mommy Elise i got an error", "I expiercend an error while looking for the Sekai data", null);
                await channel.send({ embeds: [errorEmbed] });
            }
        }
    }
};
