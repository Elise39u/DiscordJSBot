const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = './belly.json';
const { ELISE_ID } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setcycle')
        .setDescription('Set Elise’s divine fertility, mood, and vore appetite~')
        .addStringOption(option =>
            option.setName('fertility')
                .setDescription('Choose your current fertility state')
                .addChoices(
                    { name: 'Ovulating', value: 'ovulating' },
                    { name: 'Fertile', value: 'fertile' },
                    { name: 'Breeding Heat', value: 'breedingheat' },
                    { name: 'Infertile', value: 'infertile' },
                    { name: 'Resting', value: 'resting' }
                )
                .setRequired(true))
        .addStringOption(option =>
            option.setName('mood')
                .setDescription('Your current divine mood~')
                .addChoices(
                    { name: 'Dominant', value: 'dominant' },
                    { name: 'Teasing', value: 'teasing' },
                    { name: 'Moody', value: 'moody' },
                    { name: 'Lustful', value: 'lustful' },
                    { name: 'Hungry', value: 'hungry' },
                    { name: 'Serene', value: 'serene' },
                    { name: 'Neutral', value: 'neutral' }
                )
                .setRequired(true))
        .addStringOption(option =>
            option.setName('voremood')
                .setDescription('How hungry are you for squirmers~?')
                .addChoices(
                    { name: 'Starving', value: 'starving' },
                    { name: 'Playful', value: 'playful' },
                    { name: 'Possessive', value: 'possessive' },
                    { name: 'Stuffed', value: 'stuffed' },
                    { name: 'Digesting', value: 'digesting' },
                    { name: 'Gentle', value: 'gentle' }
                )
                .setRequired(true)),
    async execute(interaction) {
        if (interaction.user.id !== ELISE_ID) {
            return interaction.reply({ content: 'Only the divine womb bearer may set the cycle~ 💫', ephemeral: true });
        }

        const fertility = interaction.options.getString('fertility');
        const mood = interaction.options.getString('mood');
        const voreMood = interaction.options.getString('voremood');

        let data = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path)) : {};
        data.fertilityCycle = fertility;
        data.moodCycle = mood;
        data.voreMood = voreMood;
        fs.writeFileSync(path, JSON.stringify(data, null, 4));

        await interaction.reply(`🌺 Cycle updated!\n\nYour womb radiates **${fertility}** energy.\nYour aura pulses with a **${mood}** mood.\nAnd your belly... is feeling **${voreMood}**~`);
    }
};