const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = './belly.json';
const { ELISE_ID } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setpregnancy')
        .setDescription('Privately mark Elise as pregnant~')
        .addStringOption(option =>
            option.setName('by')
                .setDescription('Who got you pregnant?')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('How many? (e.g. 1 for baby, 2 for twins)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Pregnancy type')
                .addChoices(
                    { name: 'Real', value: 'real' },
                    { name: 'Clone', value: 'clone' }
                )
                .setRequired(true)),
    async execute(interaction) {
        if (interaction.user.id !== ELISE_ID) {
            return interaction.reply({ content: '❌ Only Elise can mark herself as pregnant~', ephemeral: true });
        } 


        const by = interaction.options.getString('by');
        const amount = interaction.options.getInteger('amount');
        const type = interaction.options.getString('type');

        let data = { swallowedUsers: [], isTooFullOrPregnant: true };
        if (fs.existsSync(path)) {
            data = JSON.parse(fs.readFileSync(path, 'utf8'));
        }
        
        // Check if already pregnant
        if (data.pregnancy) {
            return interaction.reply({
                content: '🍼 Silly~ You already told me you’re pregnant! No double dipping unless you give birth first~ 💋',
                ephemeral: true
            });
        }

        data.pregnancy = {
            by,
            amount,
            type,
            since: new Date().toISOString()
        };
        data.isTooFullOrPregnant = true;

        fs.writeFileSync(path, JSON.stringify(data, null, 4));

        await interaction.reply(`✨ Pregnancy marked: You’re now carrying **${amount}** from **${by}** (${type}) 💗`);
    }
};