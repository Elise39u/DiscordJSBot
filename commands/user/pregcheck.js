const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { createEmbed } = require('..//helpers/embedBuilder');
const fs = require('fs');
const path = './belly.json';
const { cleanExpiredClones, isPregnant, formatPregnancyLine, getBellySize, hasRoomForMore, formatUserLine  } = require('../helpers/bellyUtils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pregcheck')
        .setDescription('Check who’s currently swimming inside Elise’s cozy belly~'),
    async execute(interaction) {
        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, JSON.stringify({ isTooFullOrPregnant: false, swallowedUsers: [] }, null, 4));
        }

        let data = JSON.parse(fs.readFileSync(path, 'utf8'));
        cleanExpiredClones(data);
        fs.writeFileSync(path, JSON.stringify(data, null, 4));

        const total = getBellySize(data);
        const userList = data.swallowedUsers || [];

        // Pregnancy section
        const userLines = userList.length > 0
            ? userList.map(formatUserLine).join('\n')
            : '*Nobody is inside yet~*';

        const pregnancyLine = isPregnant(data)
            ? `**Pregnancy?** ${formatPregnancyLine(data.pregnancy)}`
            : '';

        const description = `**Belly Size:** ${total} squirmer${total !== 1 ? 's' : ''}\n\n` +
            `${userLines}\n\n` +
            `${pregnancyLine}`;

        const embed = createEmbed(
            `💖 Elise’s Cozy Belly Status 💖`,
            description,
            null,
            'So many warm tummies~ Stay snug inside~ 💕',
            '#FF69B4'
        );
        await interaction.reply({ embeds: [embed] });
    }
};