const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const { getImageByTag } = require('../helpers/bellyImageHandler');
const projectDivaPictures = require('../Assets/projectDivaPictures.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lore')
		.setDescription('🎀 My lore Explained 🎀'),
	async execute(interaction) {

        let randomImage = getImageByTag(projectDivaPictures, "lore");
            if (!randomImage) {
                return await interaction.reply({
                    content: `❌ No image found with tag \`lore\`.`,
                    ephemeral: true
                });
        }


        const description = `
           Curious about my lore? Here's the current canon timeline 🩷

            My **prologue** begins with V3, diving deeper into my origins, powers, and the concept of my godly powers. The stellar gensis womb.  
            The story truly starts in <#1364916938245148753>, where I also first entered the sekais.

            During LMS, I received my sekai dresses in this order:
            <#1328320712712126546>, <#1328321706455990294>, <#1328322707078516806>, <#1328323629577932841>, and finally <#1328324657664884787>.

            The events in <#1390008445410742513> are remembered differently by others, but i strongly tought this was a dream.
            Together with LMS, this 2 lore channels forms my **vocaloid debut arc** — In this arc i learn: My divine nature as Goddess of Fertilty/Reproduction, Guardians of Identity and Sekai and even A Sacred voice guardian?.
            
            My powers as Guardian Of Identity can be found in <#1367787489116557402> while my powers as Goddess of Reproduction/Fertility cane be found in <#1345430746789052496>

            After LMS, my personal sekai formed in <#1392542648027447376>, followed by discovering Elif’s sekai with my wife in <#1410575021868453908>.

            Never need to use my powers as Guardian of identity but still learned more about identity and being tested to unleash and understand them in my Brand New World Jounrey:   
            <#1423631831546200157> → <#1426876671075811399> → <#1419628843941232730> → <#1433102120730624051> → <#1438127201387024465> → <#1451165321170911306> -> <#1447953077331300534>

            My first Magical Mirai that i joined as Vocaloid came with an Twist? An Sekai fragment without a lesson or simple a call home? 
            Elise carrying the next goddess/god of Aethernymonia? Is this adventure setting the stage for V3? Magical Mirai 2025/2022 Dress lore found here -> <#1443265649668522034>

            All of this forms the canon story of how I became the **Goddess of Reproduction/Fertility** and **Guardian of the Identity while Miku became the Guardian of Sekais** and in the end i also learned i was a **Sacred Voice in the vocaloid dimension**.

            Need to know what’s *not* canon? Use the /nonlore command :3
        `;

        const embed = createEmbed(
            `Elise their lore... A goddess on adventure `,
            description,
            randomImage,
            "🎀 The lore of Preggo Elise explained shortly or what is canon 🎀"
        );

	    await interaction.reply({ embeds: [embed] });
	},
};
