const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('markpowers')
		.setDescription('My creators their powers'),
	async execute(interaction) {
        const description = `
        🎮 **Elemental Control** — Master of all 7 elements from her origin world, often tied to an ongoing war... or maybe a Genshin-like tale? (*coming soon*) 
        🎮 **Portal Travel** — Can move between your world, the sekais, and the vocaloid realm using dimensional portals and other dimensions.  
        🎮 **Flight (Lost)** — Once soared as moon/star-shaped light, but lost this ability after being pulled to the sand planet.  
        🎮 **Heterochromia** — Her ever-changing eye colors might be more than cosmetic—perhaps a lingering side effect?  
        🎮 **Stellar Genesis Womb** — A divine, multi-ability womb possibly linked to her being the Goddess of Reproduction/Fertility. More powers await discovery...
        🎮 **Sacred Voice powers** - As Sacred Voice, Elise holds immense vocaloid idol powers. Her true power as Guardian of the Sacred voices is unknown but one of them is: The ability to change outfit on will with the crystal of project diva x or the teleportion used in LMS which she used to teleport frelly across the world. Part of this transformation was being recongized and transformed to Vocaloid in LMS.
        🎮 **Royal mark powers** - Her royal mark on her cleavage grants elise ordinary powers. From an idol aura that they yet have to learn to understandad, to an affection field charming others while some resist a lot fall, to a hidden time freeze ability, to a femine flux affectin their makeup in weird ways. Its even said Elise her mark has a hormonal influence on them making them really senstive to in the progress.  
        `;

        const description2 = `
        🎮 **Elemental Control** — Master of all seven elements from her origin world, forever tied to a lingering war… or perhaps a Genshin-like saga yet to be told? (*coming soon*)  
        🎮 **Portal Travel** — Slips seamlessly between your world, the sekais, and the Vocaloid realm through dimensional gates.  
        🎮 **Flight (Lost)** — Once soared like a star-shaped light across the skies, but lost this gift after being bound to the sand planet.  
        🎮 **Heterochromia** — Her ever-shifting eye colors are no mere ornament… they whisper of lingering side effects and hidden truths.  
        🎮 **Stellar Genesis Womb** — A divine, multi-faceted womb that marks her as the Goddess of Reproduction and Fertility. Its true powers remain shrouded in mystery, waiting to be awakened~.  
        🎮 **Sacred Voice** — As the Sacred Voice, Elise wields immense vocaloid idol powers. With a single note, she shifts outfits at will through the Project Diva X crystal, or vanishes in an instant with the teleportation she once flaunted in LMS. One song, one step—and the world bends to her rhythm.  
        🎮 **Royal Mark** — Etched upon her cleavage, this mark grants Elise intoxicating powers: an idol’s radiant aura, a charm that ensnares hearts, the ability to freeze time itself… and a feminine flux that alters her beauty in unpredictable ways. Some whisper it even heightens her hormones, leaving her deliciously sensitive~.  
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