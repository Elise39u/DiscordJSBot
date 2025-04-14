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
                .setRequired(true))
        .addStringOption(option =>
            option.setName('species')
                .setDescription('What species are you carrying? (e.g. human, dragon eggs, slime spawn...)')
                .setRequired(true)),
    async execute(interaction) {
        if (interaction.user.id !== ELISE_ID) {
            return interaction.reply({ content: '❌ Only Elise can mark herself as pregnant~', ephemeral: true });
        } 

        const by = interaction.options.getString('by');
        const amount = interaction.options.getInteger('amount');
        const type = interaction.options.getString('type');
        const species = interaction.options.getString('species');

        let data = { swallowedUsers: [], isTooFullOrPregnant: true };
        if (fs.existsSync(path)) {
            data = JSON.parse(fs.readFileSync(path, 'utf8'));
        }
        
        // Prevent stacking pregnancies
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
            species,
            since: new Date().toISOString()
        };
        data.isTooFullOrPregnant = true;

        fs.writeFileSync(path, JSON.stringify(data, null, 4));
        
        await interaction.reply(
            `💫 Mmm~ You’re now deliciously stuffed with **${amount} ${species}** from **${by}** (${type})...\n` +
            `Each squirm is a reminder of just how *thoroughly filled* you are~ 💗 Let them grow, let them squirm... until your belly's too round to hide~ 🔥`
        );
    }
};