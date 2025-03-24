const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('markpowers')
		.setDescription('My creators their powers'),
	async execute(interaction) {
        const description = `
            🎮 **Teleportation** --> As seen in LMS. Elise has gotten teleportation powers to telport around the world   
            🎮 **Elemetal powers** --> Her home world has elemetal powers and she was able to use all 7 of them in a war never stopped fighting or was this the genshin adventure *coming soon*?   
            🎮 **Idol powers** --> Her Orgins mark gives her idol powers which she doesnt understand fully but only can feel  
            🎮 **Vocaloid world powers** --> After learning how to become an idol as fanloid in LMS. She also transformed into a vocaloid instead of a fanloid. But also falling tothe same things you see in project diva.
            🎮 **Portal powers** --> Used to travel to the sekais and back between your guys and girls world and the vocaloid world.  
            🎮 **Flight** --> Elise lost this power after she felt down to sand planet where her entry to the vocaloid realm began. She used to travel in a moon shaped symbol or star   
            🎮 **Time stopping** --> Elise learned in a dream that she can stop time.. But the dream dindt turn out to be a dream but real. Now she is learning to harvest this power on a journey  
            🎮 **Chaning Eye Colors** --> I dont think its a power but her eye colors keep chaning and even are not the same as each other. Must be a side effect   
            🎮 **Affection powers** --> Their mark seems to have an affection on you humans. Making some of the easly in love with Elise. They dont understand it power fully since some seem to resist it.   
            🎮 **Stellar Genesis Womb** --> A special womb that apprently makes her mabye the Godesses of Reproduction? A multi abbilty womb which powers will be revealed soon
            
            All the powers are here. For example the Stellar gensis womb is one with multiple abbilties so it might be there are more powers yet to be discoverd.
            That makes me wonder actually? Am i clone of Elise who is permantly frozen in its state progression? I wonder what abbilties the stellar gensis womb has tho. 
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