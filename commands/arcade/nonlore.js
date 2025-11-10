const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nonlore')
		.setDescription('🎀 Why arent some things lore? 🎀'),
	async execute(interaction) {
        const description = `
            My lore has evolved over the past 5–6 years — starting with transformation stories and growing into a clear vision of who I am: the Goddess of Reproduction/Fertility and Guardian of Identity, while also apparently being a Sacred Voice.

            With that evolution, some parts of older lore conflict with my current story. For example, <#1160629986949075105> and parts of the pregnancy arc in <#1157983522418597923> are partially valid but not fully canon. (Elif original lore channel deleted due to rewritten of the lore...)

            Why? Because the truth lies in <#1345430746789052496> — it's the *real* reason I can get pregnant. I cant remeber if i got during my HRT treatment... or thaat my Royal mark has some ordinary powers.

            There are still lore inconsistencies here and there, but if you follow the timeline shared in the /lore command, it should all make sense! 💖

            And yes… over these 5–6 years, I've had 3 pregnancies oops! But i might be pregnant again already? Who knows.... 💖 😳

            To recap:
            1️⃣ Some previously mentioned lore isn't 100% canon anymore.
            2️⃣ Details may conflict, but I’m working on refining everything.
           3⃣ A family tree is available in <#1314260908377116712>, though it still needs a little polish!

            If you’re ever curious or confused, feel free to ask me questions — I’m always happy to chat about my lore! :3
        `;

        const embed = createEmbed(
            `What happend when you make lore for 5 years? (**WIP** Getting a rework due to new lore changes.)`,
            description,
            'https://cdn.discordapp.com/attachments/1093876399657451530/1356233917610328094/20250322104526_1.jpg?ex=67ebd2c3&is=67ea8143&hm=aa1d8124df025bf8e6ad3b60bb1bdfe6fa8e2aa468a7d41f00ad8768865f2a38&',
            "🎀 Why i choose for the image of myself now and consider some lore uncanon? 🎀"
        );

	    await interaction.reply({ embeds: [embed] });
	},
};
