const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lore')
		.setDescription('🎀 My lore Explained 🎀'),
	async execute(interaction) {
        const description = `
           Curious about my lore? Here's the current canon timeline 🩷

            My **prologue** begins with V3, diving deeper into my origins, powers, and the concept of <#1345430746789052496>.  
            The story truly starts in <#1364916938245148753>, where I also first entered the sekais.

            During LMS, I received my sekai dresses in this order:
            <#1328320712712126546>, <#1328321706455990294>, <#1328322707078516806>, <#1328323629577932841>, and finally <#1328324657664884787>.

            The events in <#1390008445410742513> are remembered differently by others, but i strongly tought this was a dream.
            Together with LMS, this 2 lore channels forms my **vocaloid debut arc** — In this arc i learn: My divine nature as Goddess of Fertilty/Reproduction, Guardians of Identity and Sekai and even A Sacred voice guardian? .

            After LMS, my personal sekai formed in <#1392542648027447376>, followed by discovering Elif’s sekai with my wife in <#1410575021868453908>.

            Never need to use my powers as Guardian of identity but still learned more about identity and being tested to unleash and understand them in my Brand New World Jounrey:   
            <#1423631831546200157> → <#1426876671075811399> → <#1419628843941232730> → <#1433102120730624051> → <#1227552953653530625> → <#1236658845955129344>

            All of this forms the canon story of how I became the **Goddess of Reproduction/Fertility** and **Guardian of the Identity while Miku became the Guardian of Sekais** and in the end i also learned i was a **Sacred Voice in the vocaloid dimension**.

            Need to know what’s *not* canon? Use the /nonlore command :3
        `;

        const embed = createEmbed(
            `Elise their lore... A goddess on adventure `,
            description,
            'https://cdn.discordapp.com/attachments/709057115159003156/1005109230610694264/20220805144557_1.jpg?ex=67eb452a&is=67e9f3aa&hm=55cef04b42bdeda6336bec7500cc97dc74c9793d2b5fa388768cd7a6f6004cac&',
            "🎀 The lore of Preggo Elise explained shortly or what is canon 🎀"
        );

	    await interaction.reply({ embeds: [embed] });
	},
};
