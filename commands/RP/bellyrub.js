const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = './belly.json';
const { ELISE_ID, ELISE_ID_MENTION } = process.env;
const { createEmbed } = require('../helpers/embedBuilder');

const randomIMGs = [
    'https://media.discordapp.net/attachments/1093876399657451530/1361262470055989369/Snapchat-607535797.jpg?ex=67fe1df7&is=67fccc77&hm=d8fd6376a8aaae3ceebb00efdd6434bf460b4cb491463ec5abd2b918dbeb1bd3&=&format=webp&width=1463&height=823',
    'https://media.discordapp.net/attachments/1093876399657451530/1359470121269329920/Snapchat-875588561.png?ex=67f798b6&is=67f64736&hm=dab90d897c69b40d886ad3760c024cd48b405976f0b2ad3aa59acc7e35045747&=&format=webp&quality=lossless&width=1463&height=823'
];

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

    const roll = Math.random(); // 90% safe
    if (roll <= 0.9) {
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

    const imgLink = randomIMGs[Math.floor(Math.random() * randomIMGs.length)];
    const embed = createEmbed(
      `💖 Devoured by Elise 💖`,
      `😈 You dared touch my belly without proper worship… *bad choice.*\nBefore you know it, you’re sliding down ${ELISE_ID_MENTION}’s throat, swallowed whole and helpless~ Enjoy the heat, prey. 💋`,
      imgLink,
      `✨ You look so nice and round in my womb ✨`
    );

    return interaction.reply({ embeds: [embed] });
  }
};