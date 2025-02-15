const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('choose')
        .setDescription('Having a problem choosing? Let this preggo AI choose')
        .addStringOption(option => 
            option.setName('choice1')
                .setDescription('First choice')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('choice2')
                .setDescription('Second choice')
                .setRequired(true)),
    
    async execute(interaction) {
        const choice1 = interaction.options.getString('choice1');
        const choice2 = interaction.options.getString('choice2');
        const choicesList = [choice1, choice2];
        const chosen = choicesList[Math.floor(Math.random() * choicesList.length)];
        
        await interaction.reply(`I choose for you >.<: **${chosen}** Did I do well? :3`);
    }
};
