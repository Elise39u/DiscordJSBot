const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = './belly.json';

// Utility to load and save belly data
function loadBellyData() {
    return fs.existsSync(path) ? JSON.parse(fs.readFileSync(path, 'utf8')) : { swallowedUsers: [], bellySize: 0 };
}

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('bellyecho')
        .setDescription('Send a muffled message from inside Elise’s belly')
        .addStringOption(opt => opt.setName('message').setDescription('What do you want to say from inside?').setRequired(true)),

    async execute(interaction) {
        const user = interaction.user;
        const data = loadBellyData();
        const inside = data.swallowedUsers.find(u => u.id === user.id);
        if (!inside) return interaction.reply({ content: 'You’re not inside me... yet~ 💋', ephemeral: true });

        const message = interaction.options.getString('message');
        return interaction.reply({
            content: `💬 *Muffled echo from ${user.username} inside Elise’s belly:* “${message}” 🤰💖`
        });
    }
};