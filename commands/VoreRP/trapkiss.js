const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const { ELISE_ID, ELISE_ID_MENTION } = process.env;
const fs = require('fs');
const path = './belly.json';

// Utility to load and save belly data
function loadBellyData() {
    return fs.existsSync(path) ? JSON.parse(fs.readFileSync(path, 'utf8')) : { swallowedUsers: [], bellySize: 0 };
}
  
function saveBellyData(data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trapkiss')
        .setDescription('Try to get a kiss from me... But there are risk involved 💋'),
    
  async execute(interaction) {
    const user = interaction.user;
    if (user.id === ELISE_ID) return interaction.reply({ content: 'You can’t trap kiss yourself, silly goddess 💋'});

    const data = loadBellyData();
    const alreadyInside = data.swallowedUsers.find(u => u.id === user.id);
    if (alreadyInside) return interaction.reply({ content: 'You’re already inside, cutie~ Settle in and squirm 💖'});

    const embed = createEmbed(
        `💖 Devoured by Elise 💖`,
        `You walked right into it, ${user.username}~ Now you’re tucked away in my divine belly, squirming like the treat you are 😘`,
        'https://cdn.discordapp.com/attachments/1093876399657451530/1361262470055989369/Snapchat-607535797.jpg?ex=67fe1df7&is=67fccc77&hm=d8fd6376a8aaae3ceebb00efdd6434bf460b4cb491463ec5abd2b918dbeb1bd3&',
        `✨ You look so nice and round in my womb ✨`
    );

    data.swallowedUsers.push({ id: user.id, username: user.username, swallowedAt: new Date().toISOString() });
    saveBellyData(data);
    return interaction.reply({ embeds: [embed] });
  }
};