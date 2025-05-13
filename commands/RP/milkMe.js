const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

const flavorText = [
  "My breasts are heavy and leaking~ Come help Mommy relieve the pressure, or I’ll *make* you~ 😘",
  "You want milk? Get on your knees and earn it, baby~",
  "Mmm, I bet you’d love to nurse from these divine tits~ Just don’t forget who owns you 💋",
  "Dripping for attention~ And you look like the perfect little milk-toy~",
  "One suckle and you’ll be hooked~ I’m overflowing, and you’re mine to feed now 🍼"
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('milkme')
    .setDescription('Let Elise seductively offer divine milk to her followers~ 🍼'),

  async execute(interaction) {
    const selected = flavorText[Math.floor(Math.random() * flavorText.length)];

    const embed = createEmbed(
      `🍼 Mommy’s Milk Flowing~`,
      selected,
      'https://media.discordapp.net/attachments/1093876399657451530/1358746267018203136/Snapchat-1994583211.jpg?ex=67ff8292&is=67fe3112&hm=4a9e51e5d3ff4635c856c318dee4e99bf9032b588f6bcb3a9c57899e16eef039&=&format=webp&width=1463&height=823',
      `✨ Warm, sweet, and impossible to resist~ ✨`
    );

    await interaction.reply({ embeds: [embed] });
  }
};