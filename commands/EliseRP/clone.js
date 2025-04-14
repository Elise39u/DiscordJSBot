const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = './belly.json';
const { createEmbed } = require('../helpers/embedBuilder');
const { ELISE_ID } = process.env;
const { cleanExpiredClones } = require('../helpers/bellyUtils');

const randomIMGs = [
  'https://media.discordapp.net/attachments/1093876399657451530/1361262470055989369/Snapchat-607535797.jpg?ex=67fe1df7&is=67fccc77&hm=d8fd6376a8aaae3ceebb00efdd6434bf460b4cb491463ec5abd2b918dbeb1bd3&=&format=webp&width=1463&height=823',
  'https://media.discordapp.net/attachments/1093876399657451530/1359470121269329920/Snapchat-875588561.png?ex=67f798b6&is=67f64736&hm=dab90d897c69b40d886ad3760c024cd48b405976f0b2ad3aa59acc7e35045747&=&format=webp&quality=lossless&width=1463&height=823'
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clonebirth')
    .setDescription('Elise creates a lovely clone inside their belly~'),

  async execute(interaction) {
    if (interaction.user.id !== ELISE_ID) {
      return await interaction.reply({ content: '❌ Only Elise can create clones to squirm in their womb~', ephemeral: true });
    }

    let data = {
      isTooFullOrPregnant: false,
      swallowedUsers: []
    };

    // Load existing data
    if (fs.existsSync(path)) {
      data = JSON.parse(fs.readFileSync(path, 'utf8'));
    }

    cleanExpiredClones(data);

    // Add new clone
    const cloneName = `Clone-Elise#${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    data.swallowedUsers.push({
      id: `clone-${Date.now()}`, // fake ID
      username: cloneName,
      isClone: true,
      devouredAt: new Date().toISOString()
    });

    // Save data
    fs.writeFileSync(path, JSON.stringify(data, null, 2));

    const imgLink = randomIMGs[Math.floor(Math.random() * randomIMGs.length)];

    // Embed flavor text
    const embed = createEmbed(
      `💗 A Clone Is Born 💗`,
      `Ah~ I just summoned a squirmy little version of me~ She's cozying up inside my belly already and kicking like crazy~ 💞\n\nHer name is **${cloneName}**, and she's staying for the next 24 hours... Don’t worry~ I can still swallow *plenty* of others while she’s in there~ 😘`,
      imgLink,
      `✨ Elise's belly glows with new life~ ✨`
    );

    await interaction.reply({ embeds: [embed] });
  }
};