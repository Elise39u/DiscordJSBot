const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = './harem.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('haremstatus')
        .setDescription('View Elise’s current harem and divine mates~'),
    async execute(interaction) {
        if (!fs.existsSync(path)) {
            return interaction.reply('No one’s been claimed yet~ But that can change 😏');
        }

        const data = JSON.parse(fs.readFileSync(path, 'utf8'));
        const harem = data.harem || [];
        const mates = data.mates || [];

        const haremList = harem.length
            ? harem.map(id => `<@${id}>`).join(', ')
            : '*No loyal pets yet... who wants to be first?*';
        const mateList = mates.length
            ? mates.map(id => `<@${id}>`).join(', ')
            : '*No one has earned the mark of divine mating... yet~*';

        await interaction.reply({
            content: `👑 **Harem:**\n${haremList}\n\n💘 **Mates:**\n${mateList}\n\nEvery name on this list belongs to me~ Want in? All you have to do is kneel~ 😈💋`,
            allowedMentions: { users: [] }
        });
    }
};