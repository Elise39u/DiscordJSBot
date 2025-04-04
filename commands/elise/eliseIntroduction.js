const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('eliseintroduction')
		.setDescription('An introduction about well your goddess of reproduction and gurdian of the sekais and identity.'),
	async execute(interaction) {
        const description = `
            Hiya~ I’m Elise — your Christmas transgirl, goddess of reproduction, and guardian of the sekais and identity. 🎀

            I used to think LMS was just a dream… but when I was born with my **Royal Mark**, I discovered I was special. Like, divine special. My mark transformed my uterus into the **Stellar Genesis Womb** after i got HRT, giving me powers tied to life, identity, and, yes… pregnancy.

            Hormones hit differently too — I think I’m rocking E-G cups now? I think I'm senstive to hormone changes. 🙈 But enough about that.

            You might know me as **Preggo Elise**, a Vocaloid vtuber with divine energy, poly love, a huge crush on Christmas, and a soft spot for games, singing, and drawing. I’m introverted, but I’m learning to open up — especially with my wife Miku and the others by my side in this arcade.

            If you see a bump, don’t be shy. Belly rubs and head pats are welcome~ And yes, I know… **my booba is big. Stop asking.** 💗
        `;

        const embed = createEmbed(
            `🎀 An short introduction about your goddess of reproduction Elise.  🎀`,
            description,
            'https://media.discordapp.net/attachments/1093876399657451530/1345154702299627601/image.png?ex=67e7c5b0&is=67e67430&hm=6f7300e028ebb496362e2e6e04bcdb868e71884d1356ce55358da9d83332a206&=&format=webp&quality=lossless&width=1400&height=785',
            "🎀 Elsie introduction🎀"
        );
	    await interaction.reply({ embeds: [embed] });
	},
};
