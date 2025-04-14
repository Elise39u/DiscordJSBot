const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = './belly.json';
const { ELISE_ID_MENTION } = process.env;
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bellysquish')
    .setDescription('Savor the squishy, divine weight of Elise’s full belly~'),

  async execute(interaction) {
    let data = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path, 'utf8')) : { swallowedUsers: [] };
    const count = data.swallowedUsers.length;
    const preyList = count
      ? data.swallowedUsers.map(u => `• **${u.username}** — squirming since ${new Date(u.devouredAt).toLocaleString()}`).join('\n')
      : 'No one inside... for now~';

    const embed = createEmbed(
      `🍑 Squish~`,
      `You press against ${ELISE_ID_MENTION}’s belly... it's *warm*, *massive*, and absolutely stuffed. You feel movement beneath the skin—little kicks, squirms, and rolls of prey too far gone to resist.\n\nShe coos: *“Careful now... press any harder and I might just have to make you the next squirm in the pile~”*\n\n**Belly Contents:**\n${preyList}`,
      'https://media.discordapp.net/attachments/1093876399657451530/1359470121269329920/Snapchat-875588561.png?ex=67f798b6&is=67f64736&hm=dab90d897c69b40d886ad3760c024cd48b405976f0b2ad3aa59acc7e35045747&=&format=webp&quality=lossless&width=1463&height=823',
      `💫 Sacred. Soft. Full of sinners. 💫`
    );

    await interaction.reply({ embeds: [embed] });
  }
};