const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = './belly.json';
const { ELISE_ID_MENTION, ELISE_ID } = process.env;
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bellysquish')
    .setDescription('Savor the squishy, divine weight of Elise’s full belly~'),

  async execute(interaction) {
    let data = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path, 'utf8')) : { swallowedUsers: [] };
    const count = data.swallowedUsers.length;

    if(interaction.user.id === ELISE_ID) {
      return interaction.reply({
        content: `Silly Goddess. You cant squish your own belly..🤰💖 Tag someone else to do it or just devour them on the spot without warning 😈`
      });
    }

    if(count === 0 ) {
      return interaction.reply({
          content: `Silly **${interaction.user.username}**. There is no one inside my *divine belly atm* 🤰💖. *I wonder how you will squirm inside my divine belly* 😈. Want to be the first in?`
      });
    } else {
      const isPrey = data.swallowedUsers.some(u => u.id === interaction.user.id);
      if (isPrey) {
        return interaction.reply({
          content: `Mmm~ Look at you, squirming again, my sweet little snack~ 💞 You just can’t help it, can you? All snug and safe inside Mommy’s **swollen, divine belly**, feeling the soft pressure of my tummy as you wiggle~ 🤰✨\n\nI feel every gentle shift, every delicate movement of yours... and it pleases me more than you know. My belly is so full, so warm, so content with you inside, and you—*precious little thing*—only make it more delightful. 🥰\n\nYou’re such a **good snack** when you’re so sweet, squirming around just for me. I can feel how much you adore being close to Mommy, tucked away in her soft, gurgly paradise. So be a darling and use **/squirm**—show me just how much you love it here with me~ 💗\n\nBut, sweet one, always remember: I can be gentle and kind... but if you start misbehaving? Well~ I might have to stop playing with my food and **digest you**. Slowly, carefully, lovingly... like a true little treat~ 😈`
        });
      }

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
  }
};