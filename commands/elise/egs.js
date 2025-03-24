const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('egs')
		.setDescription('what does EGS stand for in the youtube series. '),
	async execute(interaction) {
        const description = `
           Curious what stands for EGS. Well in short it is Elise Gender Story or known as my transgender story.
           I know i have special powers and a special place in this life span of yours but still being seen as a transgender girl is hard on planet earth.
           I mean like for example and all i shouldnt be able to get pregnant by the boundaries of your realm but here i am. So what lead to this point.
           What lead to me revealing my powers, my identity that to this day i still struggle so much with as in learning who i am? What am i? Why am i here?
           EGS is my experince in life on how this all went. From simple things as just a 2 year recap what lead to reveal of this big desicion to eeven small stuff.
           Ass idenity, sexuality and even a upcomning idea my preggo Neoprounoun. So yeah interest or wanna see more about this preggos gender story.
           Then you can click the title of the embed and you will be taken to the EGS playlist on youtube. Alternatively if you want more depth.
           <#1175925314229121074> Holds my EGS stories as of moment of typing to EGS 27 in more depth. if your interested in that 
        `;

        const embed = createEmbed(
            `🎀 Elise her gender story 🎀`,
            description,
            'https://media.discordapp.net/attachments/709057115159003156/1242704164681678909/20220728164709_1.jpg?ex=67e0e771&is=67df95f1&hm=f0e56e58f3ceca9af7fe2e33e32018e50d6c44649a137f5fddc7f55108f7a4c2&=&format=webp&width=1461&height=823',
            "🎀 Elise Gender Story explained 🎀"
        );

        embed.setURL("https://www.youtube.com/watch?v=GxUxIMQsYP4&list=PLNc-vlTat7viUYY1BuxU1T563gskQpvJJ")
	    await interaction.reply({ embeds: [embed] });
	},
};
