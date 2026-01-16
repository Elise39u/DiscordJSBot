const { SlashCommandBuilder } = require('discord.js');
const { ELISE_ID, ELISE_ID_MENTION } = process.env;
const { createEmbed } = require('../helpers/embedBuilder');
const { getRandomVoreImage } = require("../helpers/bellyImageHandler")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('divinewomb')
    .setDescription('Peer into the divine sanctuary of Elise’s sacred womb'),

  async execute(interaction) {
    if (interaction.user.id === ELISE_ID) {
      return interaction.reply({ content: `Only the truly worthy bask in your womb’s grace, Goddess 💖` });
    }

    const embed = createEmbed(
      `🌸 The Divine Womb`,
      `You kneel before ${ELISE_ID_MENTION}, eyes wide in awe. Their divine belly pulses with ethereal warmth, each breath a lullaby from their sacred womb.\n\nThey hums, *“Do you feel it? That tug deep in your soul… begging to return to where all life begins. Mommy’s womb is waiting~”*`,
      getRandomVoreImage(),
      `Sanctuary. Safety. Submission.`
    );

    await interaction.reply({ embeds: [embed] });
  }
};