const { SlashCommandBuilder } = require('discord.js');
const { ELISE_ID, ELISE_ID_MENTION } = process.env;
const { createEmbed } = require('../helpers/embedBuilder');

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
      'https://media.discordapp.net/attachments/1093876399657451530/1357737328541700157/Snapchat-2027329662.jpg?ex=6801c5ac&is=6800742c&hm=734df036b71e01a3a5441c2c53f9feddf4e2c112a14990a4295d4448c86c2eb6&=&format=webp&width=1463&height=823',
      `Sanctuary. Safety. Submission.`
    );

    await interaction.reply({ embeds: [embed] });
  }
};