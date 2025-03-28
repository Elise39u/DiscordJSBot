const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('eliseintroduction')
		.setDescription('An introduction about well your goddess of reproduction and gurdian of the sekais and identity.'),
	async execute(interaction) {
        const description = `
            Till this day i always strongly belived that this christmas girl. Yeah your christmas transgirl Elise. That LMS was a dream.
            I never expected that once i got my Royal mark at birth that i was special or special on the level of a goddess.
            Because apprently im the Goddess of Reproduction and the Gurdian of the sekais and identity. Thats what i get for wishing to be a transgirl.
            Yes i got a utres on my homeworld back then but my mark semeed to affect it and turned into the stellar geneis womb. Granting me special powers. 
            I mean i knew i was senestive to hormons because my Mark seems to let me have a good cup size in tits. I think they are a E-G in cup size?
            But enough about that. You hear to learn who i am? I'm known in the world of yours as Preggo Elise a vocaloid vtuber with special powers.
            That thanks to my Royal mark and Stellar genesis womb. Im a introverted girl who works on becoming a bit more open and such. I like fantasizng in games
            or well play games with my friends and such. Im also a poly girl and have a complicated relationships tree. I really like games and christmas and drawing.
            Also i like to sing from time to time. So might i see you around in this arcade espcially with my wife Miku and her friends.
            Dont be scared if i look pregnant. Belly rubs and head pats are always welcome and yes as said i know.. My booba is big stop asking. See you soon :3
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
