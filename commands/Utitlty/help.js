const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder,ComponentType, StringSelectMenuInteraction  } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const fs = require('fs');
const path = require('path');
const { errorHandeler } = require('../helpers/errorHandler');

const emojiMap = {
    Admin: '💻',
    Arcade: '🎮',
    RP: '💖',
    Elise: '👑',
    Fun: '🎉',
    Utitlty: '🛠',
    User: '👪',
    VoreRP: '🐍',
    EliseRP: '💕',
};

const commandFolders = ['Admin', 'Arcade', 'RP', 'Elise', 'Fun', 'User', 'Utitlty', 'VoreRP', 'EliseRP'];

const formatCategoryName = (folder) => `${emojiMap[folder] || '🎀'} ${folder.charAt(0).toUpperCase() + folder.slice(1)}`;

const loadCommands = (dirPath) => {
    const commands = [];
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        if (file.endsWith('.js')) {
            const command = require(path.join(dirPath, file));
            if (command?.data?.name && command?.data?.description) {
                commands.push(`🎀 **/${command.data.name}** — ${command.data.description}`);
            }
        }
    }
    return commands;
};

const randomGIFs = [
    'https://cdn.discordapp.com/attachments/859788500114210826/1352255226618318859/pjsk-project-sekaiLN.gif',
    'https://cdn.discordapp.com/attachments/859788500114210826/1352255227084013568/pjsk-pjsk-animeVBS.gif',
    'https://cdn.discordapp.com/attachments/859788500114210826/1352255228149239848/pjsk-pjsk-animeMMJ.gif',
    'https://cdn.discordapp.com/attachments/859788500114210826/1352255228581249144/pjsk-pjsk-anime.gif',
    'https://cdn.discordapp.com/attachments/859788500114210826/1352255229294542979/pjsk-pjsk-animeLN2.gif',
    'https://cdn.discordapp.com/attachments/859788500114210826/1352256020734541875/pjsk-pjsk-animeNightCord.gif',
    'https://cdn.discordapp.com/attachments/859788500114210826/1352256021544046605/pjsk-pjsk-anime.gif'
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('List of available commands I can assist you with'),
        async execute(interaction) {
            const menu = new StringSelectMenuBuilder()
                .setCustomId('help_category')
                .setPlaceholder('Choose a category to explore~')
                .addOptions(
                    commandFolders.map((folder) => ({
                        label: folder.charAt(0).toUpperCase() + folder.slice(1),
                        value: folder,
                        emoji: emojiMap[folder] || undefined,
                    }))
                );
        
            const row = new ActionRowBuilder().addComponents(menu);
            const gifLink = randomGIFs[Math.floor(Math.random() * randomGIFs.length)];
        
            const embed = createEmbed(
                'Help - Available Commands',
                "Darling~ use the menu below to explore my divine command set. But beware... you might just awaken something~ 💋",
                gifLink,
                '🎀 What can your goddess do for you? 🎀'
            );
        
            const reply = await interaction.reply({
                embeds: [embed],
                components: [row],
                fetchReply: true,
            });
        
            const collector = reply.createMessageComponentCollector({
                componentType: ComponentType.StringSelect,
                time: 120_000, // 2 minutes
            });
        
            collector.on('collect', async (selectInteraction) => {
                if (selectInteraction.user.id !== interaction.user.id) {
                    return await selectInteraction.reply({
                        content: 'Uh uh uh~ This menu isn’t for your little fingers, cutie 💅',
                        ephemeral: true,
                    });
                }
        
                const selectedCategory = selectInteraction.values[0];
                const categoryPath = path.join(__dirname, '..', selectedCategory);
                const gifLink = randomGIFs[Math.floor(Math.random() * randomGIFs.length)];
        
                if (!fs.existsSync(categoryPath)) {
                    return await selectInteraction.reply({
                        content: 'Oops~ I couldn’t find that command set 💔',
                        ephemeral: true,
                    });
                }
        
                const commands = loadCommands(categoryPath);
                const embed = createEmbed(
                    `${formatCategoryName(selectedCategory)} Commands`,
                    commands.length > 0
                        ? commands.join('\n')
                        : '*No commands yet, my sweet~ But soon...*',
                    gifLink,
                    `${formatCategoryName(selectedCategory)}`,
                    '#FF69B4'
                );
        
                await selectInteraction.update({
                    embeds: [embed],
                    components: [row],
                });
            });
        
            collector.on('end', async () => {
                try {
                    await interaction.followUp({
                        content: '⏳ The divine help window has closed, darling~ Come back to me anytime you get lost 💖',
                        ephemeral: true,
                    });
            
                    // Slight delay before deleting the message
                    setTimeout(async () => {
                        try {
                            await interaction.deleteReply();
                        } catch (err) {
                            console.error('Failed to delete help message:', err.message);
                        }
                    }, 4000);
                } catch (err) {
                    console.error('Failed to send toast message or delete:', err.message);
                }
            });
        }
};