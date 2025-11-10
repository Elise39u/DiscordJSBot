const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const { ELISE_ID, ELISE_ID_MENTION } = process.env;
const fs = require('fs');
const path = './belly.json';
const { getImageByTag } = require('../helpers/bellyImageHandler')

// Utility to load and save belly data
function loadBellyData() {
    return fs.existsSync(path) ? JSON.parse(fs.readFileSync(path, 'utf8')) : { swallowedUsers: [], bellySize: 0 };
}
  
function saveBellyData(data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = {
    data: new SlashCommandBuilder()
    .setName('tempt')
    .setDescription('Tempt the goddess with your presence… and maybe they gulp you down~'),

  async execute(interaction) {
    const user = interaction.user;
    if (user.id === ELISE_ID) return interaction.reply({ content: 'You silly.. you cant tempt your self.. If your hungry devour someone sweetheart~ 💅'});

    const chance = Math.random();
    const swallowedSnacks = loadBellyData();
    if (swallowedSnacks.swallowedUsers.find(u => u.id === user.id)) {
      return interaction.reply({ content: 'You’re already inside, darling~ My belly’s enjoying you 💕. Squirm a bit harder please darling', ephemeral: true });
    }

    const imgLink = getImageByTag("devour");
    const embed = createEmbed(
        `💖 Devoured by Elise 💖`,
        `You walked right into it, ${user.username}~ Now you’re tucked away in my divine belly, squirming like the treat you are 😘`,
        imgLink,
        `✨ You look so nice and round in my womb ✨`
    );


    if (chance < 0.2) {
      swallowedSnacks.swallowedUsers.push({ id: user.id, username: user.username, swallowedAt: new Date().toISOString() });
      saveBellyData(swallowedSnacks);
      return interaction.reply({ embeds: [embed]});
    } else {
      return interaction.reply({
        content: `Mmm~ ${user.username} dares to tempt ${ELISE_ID_MENTION}? Adorable~ But not enough... *yet*~ Keep trying, or I’ll just grab you anyway 😈`,
      });
    }
  }
};