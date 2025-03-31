const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nonlore')
		.setDescription('🎀 Why arent some things lore? 🎀'),
	async execute(interaction) {
        const description = `
            Lore is been written through the past 5-6 of my life. First fromn the idea of transformation to now the clear picture i have of myself in the lore. 
            The goddess of reproduction and gurdian of sekais and identity. But with that comes some conflict in what i have wroten as lore.
            To start <#1160629986949075105> and the pregnancy part of <#1157983522418597923> Have some vallid lore but not compelety. Why do i say this?
            The <#1345430746789052496> is the reason i can get pregnant. I did get a utures but it not thanks to a transformation.
            Also i did get HRT on my origins planet and my Royal mark caused me to react ordinarlly well to the hormons a bit too well.
            Further more there will be conflicting details in the lore. Which is hard to side track but if you follow the order of lore command you should be fine..
            If you have question about my lore feel free to ask them and il try to answe as best as i can. 
            So yes in the past 5-6 years i have been pregnant 3-4 oops. But i hope you understand my lore now a bit :3.

            So to recap. The preivous mentiond lore parts arent offically canon 100%. Details can be conflicting but i try to fix that.
            A familiy tree is present in <#1314260908377116712> but this one needs to be updated and more clear for you to watch. 
        `;

        const embed = createEmbed(
            `What happend when you make lore for 5 years?`,
            description,
            'https://cdn.discordapp.com/attachments/1093876399657451530/1356233917610328094/20250322104526_1.jpg?ex=67ebd2c3&is=67ea8143&hm=aa1d8124df025bf8e6ad3b60bb1bdfe6fa8e2aa468a7d41f00ad8768865f2a38&',
            "🎀 Why i choose for the image of myself now and consider some lore uncanon? 🎀"
        );

	    await interaction.reply({ embeds: [embed] });
	},
};
