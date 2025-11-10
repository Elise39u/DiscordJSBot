const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = './belly.json';
const { ELISE_ID, ELISE_ID_MENTION } = process.env;
const { createEmbed } = require('../helpers/embedBuilder');
const { getRandomVoreImage } = require('../helpers/bellyImageHandler')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bellyrub')
    .setDescription('Attempt to rub the goddess’s swollen belly… if they lets you~.'),
  
  async execute(interaction) {
    const user = interaction.user;
    if (user.id === ELISE_ID) {
      return interaction.reply({
        content: 'You can’t rub your own divine belly, silly goddess 💅'
      });
    }

    let data = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path, 'utf8')) : { swallowedUsers: [] };
    const alreadyInside = data.swallowedUsers.some(u => u.id === user.id);
    if (alreadyInside) {
      return interaction.reply({
        content: `You’re already deep inside ${ELISE_ID_MENTION}’s belly, wiggling like the obedient prey you are 💖`
      });
    }

    const roll = Math.random(); // 80% safe
    if (roll <= 0.8) {
      return interaction.reply({
        content: `🤲 You gently press your hands against ${ELISE_ID_MENTION}’s divine, swollen belly... It's warm, full, and *alive* with movement.\nThey coos, "Mmm~ careful now, rub me *right*, or you’ll be padding before dinner."`
    });
    }

    // Devour the user
    data.swallowedUsers.push({
      id: user.id,
      username: user.username,
      devouredAt: new Date().toISOString(),
      isClone: false
    });

    fs.writeFileSync(path, JSON.stringify(data, null, 2));

    const imgLink = getRandomVoreImage();
    const embed = createEmbed(
      `💖 Devoured by Elise 💖`,
      `😈 You dared touch my belly without proper worship… *bad choice.*\nBefore you know it, you’re sliding down ${ELISE_ID_MENTION}’s throat, swallowed whole and helpless~ Enjoy the heat, prey. 💋`,
      imgLink,
      `✨ You look so nice and round in my womb ✨`
    );

    return interaction.reply({ embeds: [embed] });
  }
};