const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const { getRandomBellyImage } = require('../helpers/bellyImageHandler')

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
      getRandomBellyImage(),
      `✨ Warm, sweet, and impossible to resist~ ✨`
    );

    await interaction.reply({ embeds: [embed] });
  }
};