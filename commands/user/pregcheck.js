const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { createEmbed } = require('..//helpers/embedBuilder');
const fs = require('fs');
const path = './belly.json';
const { cleanExpiredClones, isPregnant, formatPregnancyLine, getBellySize, hasRoomForMore, formatUserLine, isDivinePregnant  } = require('../helpers/bellyUtils');

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

            let pregnancyLine = '';

            if (isDivinePregnant(data)) {
                const preg = data.pregnancy;
                let flavorText = '';
            
                switch (preg.species?.toLowerCase()) {
                    case 'human':
                        flavorText = 'She’s glowing and round~ You can almost feel the gentle kicks inside her soft belly~ 🍼';
                        break;
                    case 'eggs':
                    case 'insect eggs':
                    case 'dragon eggs':
                        flavorText = 'Her belly is taut and pulsing... full of squirming, unhatched eggs~ Every shift makes her moan softly~ 🥚💗';
                        break;
                    case 'water baby':
                    case 'elemental':
                        flavorText = 'Her tummy sloshes with a gentle shimmer—pregnant with something *fluid, mystical*, and alive~ 🌊✨';
                        break;
                    case 'demonspawn':
                        flavorText = 'There’s a faint glow, a demonic purr deep within~ She’s bearing dark and dangerous delights inside~ 🔥😈';
                        break;
                    case 'alien':
                        flavorText = 'You can see the faint pulsing shapes shift beneath her belly... otherworldly life forms writhing in warmth~ 👽💦';
                        break;
                    default:
                        flavorText = 'She’s looking full and divine~ Her belly tells a story of pleasure, life, and delicious weight~ 💖';
                        break;
                }
            
                pregnancyLine = `**Pregnancy?** ${formatPregnancyLine(preg)} 💕\n\n${flavorText}`;
            } else {
                pregnancyLine = ``;
            }
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