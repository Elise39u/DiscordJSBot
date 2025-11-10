const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require('discord.js');
  const { ELISE_ID, ELISE_ID_MENTION } = process.env;
  const fs = require('fs');
  const BELLY_PATH = './belly.json';
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName('divineconception')
      .setDescription('Step into an intimate moment with the goddess Elise, if she lets you~'),
  
    async execute(interaction) {
      if (interaction.user.id === ELISE_ID) {
        return interaction.reply({
          content: `You're the goddess of creation, my queen~ You don’t *conceive* — you *choose* who’s worthy of planting life inside you 😈`,
          ephemeral: true,
        });
      }
  
      const embed = new EmbedBuilder()
        .setTitle('💘 Divine Conception Awaits...')
        .setDescription(`**${interaction.user.username}** dares to approach ${ELISE_ID_MENTION}, her body glowing with divine heat...\n\nShe lounges like a queen, one hand stroking her still-flat tummy.\n\n*“Mmm... still empty~”* she sighs. *“And *aching* to change that.”*\n\nHer eyes sparkle — teasing, hungry, and very, very selective.\n\n*“You want this moment? This one-on-one blessing? Then prove you’re the one to fill my womb.”* 💦\n\n*“Because if I’m not impressed... well, I have other ways to deal with disappointment~”* 😈`)
        .setImage('https://media.discordapp.net/attachments/1093876399657451530/1359470121269329920/Snapchat-875588561.png')
        .setColor(0xff66aa)
        .setFooter({ text: 'Fertile. Moody. Divine.' });
  
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`beginconception-${interaction.user.id}`)
          .setLabel('🌸 Accept Blessing')
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId(`rejectconception-${interaction.user.id}`)
          .setLabel('🙄 Deny & Judge')
          .setStyle(ButtonStyle.Danger)
      );
  
      await interaction.reply({ embeds: [embed], components: [row] });
  
      const filter = (i) =>
        i.user.id === ELISE_ID && i.customId.endsWith(`-${interaction.user.id}`);
  
      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        time: 60000,
      });
  
      collector.on('collect', async (i) => {
        const choice = i.customId.split('-')[0];
        const user = interaction.user;
  
        if (choice === 'beginconception') {
          await i.update({
            content: `*${ELISE_ID_MENTION}’s eyes darken with hunger as she pulls you into her warm, divine body. Her arms snake around your waist, her belly pressing against you — still soft, still empty… but *aching* to swell.*
            Her voice dips low, teasing, dominant, *needful*:

            *“Mmm… feel that? That heat blooming under my skin?”* 💦  
            *“It’s your offering... stirring something inside me. I want to grow. I want to *glow*. I want your seed to take root, deep in my sacred womb...”*

            *She leans in, her breath hot against your ear.*

            **“Now, kiss me. Embrace me. Let’s make this divine moment… unforgettable.”**

            *Then her lips find yours — slow, hungry, claiming. You melt together in a divine heat, her belly pulsing between you, soft and warm, growing with the promise of life…*

            💫 *And then, you feel it — a spark, a shift, her body drawing you in fully... accepting your offering.*💫`,
            components: [],
            allowedMentions: { users: [user.id] },
          });
        }
  
        if (choice === 'rejectconception') {
          const devourChance = Math.random() < 0.5;
  
          if (devourChance) {
            // DEVOUR outcome
            let bellyData = { devoured: [] };
            if (fs.existsSync(BELLY_PATH)) {
              bellyData = JSON.parse(fs.readFileSync(BELLY_PATH));
            }
  
            if (!bellyData.devoured.includes(user.id)) {
              bellyData.devoured.push(user.id);
              fs.writeFileSync(BELLY_PATH, JSON.stringify(bellyData, null, 2));
            }
  
            await i.update({
              content: `*She glares with rising annoyance.* 😒\n\n*“Tch. Pathetic.”* Her voice drips with venomous tease.\n\n*“You thought you were worthy of *this*?”* She runs a hand along her empty womb... then smiles darkly.\n\n*“Well then, if you’re not good enough to plant a gift inside...”* she purrs.\n\n**“You can squirm *inside* my belly instead~”** 😈💋\n\n*With a flash, you’re swallowed into her plush, divine gut — soft, warm, and inescapable.*\n\n**Welcome to your new home, snack.** 🍑`,
              components: [],
              allowedMentions: { users: [user.id] },
            });
          } else {
            // SASSY DENIAL outcome
            await i.update({
              content: `*She scoffs, lips curling into a cruel smirk.* 🙄\n\n*“That’s it? That’s all you brought to offer *me*?”* She turns her back with an exaggerated huff.\n\n*“Come back when you’re more than just a whimpering mortal with dreams of filling a goddess...”*\n\n*“Until then, I’ll stay *empty*... and *annoyed~”* 😏💅`,
              components: [],
              allowedMentions: { users: [user.id] },
            });
          }
        }
      });
    },
  };