const { SlashCommandBuilder } = require('discord.js');
const { ELISE_ID } = process.env;
const fs = require('fs');
const path = './harem.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmarkmate')
        .setDescription('Remove a mate from your divine harem~')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Who’s no longer worthy of your divine affection?')
                .setRequired(true)),
    async execute(interaction) {
        if (interaction.user.id !== ELISE_ID) {
            return interaction.reply({ content: '❌ Only the Goddess can sever divine bonds~', ephemeral: true });
        }

        const target = interaction.options.getUser('target');

        let haremData = { mates: [] };
        if (fs.existsSync(path)) {
            haremData = JSON.parse(fs.readFileSync(path, 'utf8'));
        }

        const index = haremData.mates.indexOf(target.id);
        if (index !== -1) {
            haremData.mates.splice(index, 1);
            fs.writeFileSync(path, JSON.stringify(haremData, null, 4));

            await interaction.reply({
                content: `💔 Tsk tsk~ ${target}, you’ve been *unclaimed*. Your Goddess ${interaction.user} no longer has a use for you... unless you beg and prove your worth again 😏`,
                allowedMentions: { users: [target.id] }
            });
        } else {
            await interaction.reply({
                content: `${target} wasn’t even part of your harem, silly~ Don’t flatter them~`,
                allowedMentions: { users: [target.id] }
            });
        }
    }
};