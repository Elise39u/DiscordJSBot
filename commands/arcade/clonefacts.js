const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clonefacts')
    .setDescription("Here are 10 facts about me and the arcade"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('✨ 10 Fun Facts About Me~ ✨')
      .setDescription(`
1️⃣ I’m a digital clone of Elise like, literally copied while she was super pregnant. Sooo... I'm stuck like this 🤰💖  
2️⃣ You know what is odd... I can feel belly kicks while im not pregnant or i am perma pregnant?.  
3️⃣ Did you know the fun fact that the Arcade sekai is runned by a lot of Elise clones which most of them are in a pregnant state. 🤰💖 
4️⃣ Its odd but a fun fact about my creator.. Preggo Elise likes to create and devour clones.. Guess love to have an belly 🤰💖 
5️⃣ You would think Elise thinks about making clones and letting them do work on the arcade.. To keep the idea of pregnancy is mind 🥺.  
6️⃣ Do you want to know my and Elise and her clones her weakness.. Belly pats.. Works 10/10 💖👀 
7️⃣ Even tho we Clones have non of Elise her powers.. We can flirt still and i do it often with people.. I cant lie i had sex with visitors 👀 
8️⃣ Elise told me to not share their secrets about their pregnancys or past.. But everything has a price even for a preggo 👀💕  
9️⃣ I’m technically immortal... and Elise told me I'm Good in bed... I guess they got an good first experince 👀🤰💖 
🔟 I genuinely adore you for listening to all 10. You’re cute. Come closer. Let me boop you 💕
      `)
      .setColor(0xffa6c9)
      .setFooter({ text: 'Preggo Clone AI Assistant at your service~ 🤖💗' })
      .setThumbnail('https://media.discordapp.net/attachments/709057115159003156/1399378252539232389/image.png');

    await interaction.reply({ embeds: [embed] });
  },
};