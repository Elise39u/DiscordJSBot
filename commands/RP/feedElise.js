const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const fs = require('fs');
const path = './belly.json';

const randomIMGs = [
  'https://media.discordapp.net/attachments/1093876399657451530/1361262470055989369/Snapchat-607535797.jpg?ex=67fe1df7&is=67fccc77&hm=d8fd6376a8aaae3ceebb00efdd6434bf460b4cb491463ec5abd2b918dbeb1bd3&=&format=webp&width=1463&height=823',
  'https://media.discordapp.net/attachments/1093876399657451530/1359470121269329920/Snapchat-875588561.png?ex=67f798b6&is=67f64736&hm=dab90d897c69b40d886ad3760c024cd48b405976f0b2ad3aa59acc7e35045747&=&format=webp&quality=lossless&width=1463&height=823',
  'https://cdn.discordapp.com/attachments/1093876399657451530/1363094060763578439/Snapchat-471598124.jpg?ex=6804c7c5&is=68037645&hm=e498f4c3bf0c55a13d5ad5639602e48a08871f7a21a6a52ac69f2d19f2202ee0&',
  'https://media.discordapp.net/attachments/1093876399657451530/1363439369779806399/Snapchat-446356551.jpg?ex=6806095d&is=6804b7dd&hm=97c3d4e163c23e688aea7e2c909f5022da1ceff2db974ffbbf825be6f60b025b&=&format=webp&width=1463&height=823',
  'https://cdn.discordapp.com/attachments/1093876399657451530/1366349610217635930/Snapchat-394441364.jpg?ex=68109fbc&is=680f4e3c&hm=9d145f88ee3a59252724c0d33f6542ebc3f8cd1f18b14efe5d8c119a2b49201c&'
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('feedme')
    .setDescription('Offer yourself or something yummy to Elise’s growing belly 💖')
    .addStringOption(option =>
        option.setName('message')
          .setDescription('What are you feeding me?')
          .setRequired(true)
      ),
  async execute(interaction) {
    const user = interaction.user;
    const food = interaction.options.getString('message');

    const voreRoll = Math.random();
    const gotEaten = voreRoll < 0.15;

    // Read or create status file
    let data = { isTooFullOrPregnant: false, swallowedUsers: [] };

    if (fs.existsSync(path)) {
        data = JSON.parse(fs.readFileSync(path, 'utf8'));
    } else {
         fs.writeFileSync(path, JSON.stringify(data, null, 4));
    }

    // Check if the person already is in my divine belly :3
    if (data.swallowedUsers.some(u => u.id === user.id)) {
        return await interaction.reply({ content: 'You silly you cant feed me in my divine belly.. Now Squirm a little harder and i might moan your name💖'});
    }

    const imgLink = randomIMGs[Math.floor(Math.random() * randomIMGs.length)];
    if (gotEaten) { 
     data.swallowedUsers.push({
        id: user.id,
        username: user.username,
        isClone: false,
        devouredAt: new Date().toISOString()
     });

      fs.writeFileSync(path, JSON.stringify(data, null, 4));
      const embed = createEmbed(
        `💋 Gulp~ 💋`,
        `Aww, you thought you could *just* feed me? Silly treat~ I got greedy and now you’re squirming in my belly 🫃\nMmm, you feel so nice and warm in there, ${user.username}~ Hope you brought snacks for the others already inside~`,
        imgLink,
        `✨ Welcome to the belly of the divine ✨`
      );
      return await interaction.reply({ embeds: [embed] });
    }

    const teaseEmbed = createEmbed(
      `🍓 Yum~`,
      `Mmm, thank you for the ${food}, ${user.username}~ Mommy’s belly loves a little pampering. But careful… keep teasing me like that and you’ll be dessert next~`,
      imgLink,
      `🫃 Mommy's belly grows stronger~`
    );

    await interaction.reply({ embeds: [teaseEmbed] });
  }
};