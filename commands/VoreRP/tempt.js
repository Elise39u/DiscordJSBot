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

const randomIMGs = [
  'https://media.discordapp.net/attachments/1093876399657451530/1361262470055989369/Snapchat-607535797.jpg?ex=67fe1df7&is=67fccc77&hm=d8fd6376a8aaae3ceebb00efdd6434bf460b4cb491463ec5abd2b918dbeb1bd3&=&format=webp&width=1463&height=823',
  'https://media.discordapp.net/attachments/1093876399657451530/1359470121269329920/Snapchat-875588561.png?ex=67f798b6&is=67f64736&hm=dab90d897c69b40d886ad3760c024cd48b405976f0b2ad3aa59acc7e35045747&=&format=webp&quality=lossless&width=1463&height=823',
  'https://cdn.discordapp.com/attachments/1093876399657451530/1363094060763578439/Snapchat-471598124.jpg?ex=6804c7c5&is=68037645&hm=e498f4c3bf0c55a13d5ad5639602e48a08871f7a21a6a52ac69f2d19f2202ee0&',
  'https://media.discordapp.net/attachments/1093876399657451530/1363439369779806399/Snapchat-446356551.jpg?ex=6806095d&is=6804b7dd&hm=97c3d4e163c23e688aea7e2c909f5022da1ceff2db974ffbbf825be6f60b025b&=&format=webp&width=1463&height=823',
  'https://cdn.discordapp.com/attachments/1093876399657451530/1366349610217635930/Snapchat-394441364.jpg?ex=68109fbc&is=680f4e3c&hm=9d145f88ee3a59252724c0d33f6542ebc3f8cd1f18b14efe5d8c119a2b49201c&',
];

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

    const imgLink = randomIMGs[Math.floor(Math.random() * randomIMGs.length)];
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