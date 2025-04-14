const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = './belly.json';
const { ELISE_ID_MENTION } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('squirm')
        .setDescription('Let Elise know you’re wiggling around inside her belly~'),
    async execute(interaction) {
        const user = interaction.user;
        let data = { swallowedUsers: [] };

        if (fs.existsSync(path)) {
            data = JSON.parse(fs.readFileSync(path, 'utf8'));
        }

        const isInside = data.swallowedUsers?.some(u => u.id === user.id);

        if (!isInside) {
            return interaction.reply({
                content: `😒 You’re not even *inside* me right now~ What are you squirming for? Trying to crawl in on your own? How *cute*~`,
                ephemeral: true
            });
        }

        return interaction.reply({
            content: `💗 Mmm~ I felt that little wiggle~ ${ELISE_ID_MENTION} is very pleased~ You squirm so sweetly for your Goddess… Keep moving, and I *might* moan your name next time~ 😘`,
        });
    }
};