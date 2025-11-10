const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const fs = require('fs');
const path = './belly.json';
const { getRandomVoreImage } = require("../helpers/bellyImageHandler")

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

    const imgLink = getRandomVoreImage();
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