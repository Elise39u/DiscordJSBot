const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('..//helpers/embedBuilder');

const ROLE_ID = '1423674657957089454';
const LOG_CHANNEL_ID = '822837640872067082'; 


async function logSpicyRole(interaction, member, action) {
    const logChannel = interaction.guild.channels.cache.get(LOG_CHANNEL_ID);
    if (!logChannel) return;
    const username = member.user ? member.user.tag : member.displayName;
    const embed = createEmbed(`**MOMMY MOMMY**`, `I saw that **${username}**  has either **${action}** the spicy role. by me UWU!!`, null, "");
    await logChannel.send({ embeds: [embed] });
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('spicyrole')
        .setDescription('Gives or removes the spicy role from you.'),
    async execute(interaction) {
        const role = interaction.guild.roles.cache.get(ROLE_ID);
        const member = interaction.member;

        if (!role) {
            return interaction.reply({ content: 'Hmm, the spicy role seems to have vanished... Try again later!', ephemeral: true });
        }

        if (!interaction.guild.members.me.permissions.has('MANAGE_ROLES')) {
            return interaction.reply({ content: 'I can\'t spice things up without permission to manage roles!', ephemeral: true });
        }

        if (role.position >= interaction.guild.members.me.roles.highest.position) {
            return interaction.reply({ content: 'This role is too spicy for me to handle. Ask an admin!', ephemeral: true });
        }

        if (member.roles.cache.has(role.id)) {
            await member.roles.remove(role);
            await interaction.reply({ content: `Oh, can't handle the heat? The spicy role has been removed! 🌶️`, ephemeral: true });
            await logSpicyRole(interaction, member, 'removed');
        } else {
            await member.roles.add(role);
            await interaction.reply({ content: `Feeling brave? The spicy role is yours now! 🔥`, ephemeral: true });
            await logSpicyRole(interaction, member, 'received');
        }
    }
};