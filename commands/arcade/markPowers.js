const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('markpowers')
		.setDescription('My creators their powers'),
	async execute(interaction) {
        const description = `
        🎮 **Teleportation** — Gained during LMS, lets Elise travel freely across worlds.  
        🎮 **Elemental Control** — Master of all 7 elements from her origin world, often tied to an ongoing war... or maybe a Genshin-like tale? (*coming soon*)  
        🎮 **Idol Aura** — Powers gifted by her Origin Mark, felt deeply but still a mystery to them.  
        🎮 **Vocaloid Shift** — Transitioned from fanloid to vocaloid during LMS, bound to the rhythms and songs as in Project DIVA.  
        🎮 **Portal Travel** — Can move between your world, the sekais, and the vocaloid realm using dimensional portals and other dimensions.  
        🎮 **Flight (Lost)** — Once soared as moon/star-shaped light, but lost this ability after being pulled to the sand planet.  
        🎮 **Time Freeze** — First discovered in a dream… that wasn’t a dream. Now learning to master time itself.  
        🎮 **Heterochromia** — Her ever-changing eye colors might be more than cosmetic—perhaps a lingering side effect?  
        🎮 **Affection Field** — Elise’s mark unintentionally charms others. Some fall easily, others resist… the reason is unclear.  
        🎮 **Stellar Genesis Womb** — A divine, multi-ability womb possibly linked to her being the Goddess of Reproduction. More powers await discovery...
        `;

        const embed = createEmbed(
            `Preggo Elise Their powers. Let me summarize `,
            description,
            'https://cdn.discordapp.com/attachments/709057115159003156/1337427012238839808/image.png?ex=67a76777&is=67a615f7&hm=6272fe4bfcefc809bf279e3b9ea97a38f4cf1d43bc19c893123e5731113c6d43&',
            "🎀 My creator their offical powers as been found been in <#1152967259225075803> 🎀"
        );

	    await interaction.reply({ embeds: [embed] });
	},
};