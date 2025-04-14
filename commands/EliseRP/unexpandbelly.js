const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = './belly.json';
const { ELISE_ID } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unexpandbelly')
        .setDescription('Shrink your belly size~ Only for Goddess Elise')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('How far do you want you want to deflate your belly darling?')
                .setRequired(true)),
    async execute(interaction) {
        if (interaction.user.id !== ELISE_ID) {
            return interaction.reply({
                content: '❌ Only the Goddess may shrink her divine belly~',
                ephemeral: true
            });
        }

        const amount = interaction.options.getInteger('amount');

        let data = fs.existsSync(path)
            ? JSON.parse(fs.readFileSync(path, 'utf8'))
            : { bellySize: 0 };

        data.bellySize = Math.max((data.bellySize || 0) - amount, 0);
        fs.writeFileSync(path, JSON.stringify(data, null, 4));

        await interaction.reply({
            content: `💨 Mmm~ Belly deflated just a touch~ But don’t get used to this. I like feeling **full**~`,
        });
    }
};