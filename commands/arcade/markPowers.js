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
            🎮 **Vocaloid world powers** --> After learning how to become an idol as fanloid in LMS. She also transformed into a vocaloid instead of a fanloid. But also falling to
            the same things you see in project diva.
            🎮 **Portal powers** --> Used to travel to the sekais and back between your guys and girls world and the vocaloid world.  
            🎮 **Flight** --> Elise lost this power after she felt down to sand planet where her entry to the vocaloid realm began. She used to travel in a moon shaped symbol or star   
            🎮 **Time stopping** --> Elise learned in a dream that she can stop time.. But the dream dindt turn out to be a dream but real. Now she is learning to harvest this power on a journey  
            🎮 **Chaning Eye Colors** --> I dont think its a power but her eye colors keep chaning and even are not the same as each other. Must be a side effect   
            🎮 **Hormone infleunce**  --> She always learned that the mark had a infleunce in her hormone treatment. Even making it work better then people expected. Growing to an E-G size on her homne planet but shriking again
            Until aqquired her full powers again 
            🎮 **Affection powers** --> Her mark seems to have an affection on you humans. Making some of the easly in love with Elise but others resist it. Guess it handy with that to be poly.   
            🎮 **Fertilazation powers**  --> Elise gotten a utures on her home planet and her Mark seems to influence it a bit too much. Making her highly fertile and easly pregnant   
            🎮 **Inflation powers** --> Apprently my creator can inflate her belly when ever she wanted. So she can look pregnant when ever she want. 
            🎮 **Pregnancy powers** --> Something you will learn in LMS but Elise her species can feel how long they are pregnant.  
            🎮 **Stellar Genesis Womb** --> Apprently the Mark made her utures a special one. You will learn in the LMS adventure its true power.
            
            That are the recorded powers so far.. But dont worry if you have question feel free to ask Elise directly. But the Stellar Genesis Womb was something not explained to me 
            It felt Elise either dint understand its true power or Elise wants to keep its powers as secret. Mabye the Stellar Gensis Womb makes her also highly fertile?
        `;

        const embed = createEmbed(
            `Preggo Elise Their powers. Let me summarize `,
            description,
            'https://cdn.discordapp.com/attachments/709057115159003156/1337427012238839808/image.png?ex=67a76777&is=67a615f7&hm=6272fe4bfcefc809bf279e3b9ea97a38f4cf1d43bc19c893123e5731113c6d43&'
        );

	    await interaction.reply({ embeds: [embed] });
	},
};