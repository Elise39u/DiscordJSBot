const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('outfits')
		.setDescription('🎀 Well let this preggo explain preggos outfits too you 🎀'),
	async execute(interaction) {
        const description = `
            3 Version outfits, 18 pokemon outfits and well even 10 sekai outfits... Its clear this preggo has a lot of outfits and this pregog wants to help you understand them.
            Below in the image you see my 3 version outfits. Raning from my very first outfit to my upcoming v3. Booba sizes is adjusted to fit current v2 looks.
            After that we have my 10 sekai looks which can be found <#962632624587808810> My sekai dresses are themed to Miku as in LMS i was the closest to her.
            See it as an connection or bond between me and her or a unit. The VU are based on a connection between me and someone in the unit. Like saki in leo/need.
            The normal sekai dresses also focus a bit on this bond between me and them. But every look of my also has a pregnant and non pregnant version. This can be found in <#1113790775269015563>.
            Or an part of it... I have too many looks to show like the <#1291045909399863306> That would be an other 36 looks to add if you include pregnant and non pregnant. 
            Besides this i usually see: My main V2, Alt V2, Girly gamer and Fairy Elise as my main look combo or main group. With V1 and V3 added to it. To focus a bit on my lore importance.
            As last i have looks that are tied to well my wife miku as in: Dillema Elise, Backrooms Elise (Fun fact my odds and ends dress became this) or highlight Elis.
            Well its a lot and make sure to keep an eye on my streams and yt to see them all. With love preggo elise
        `;

        const embed = createEmbed(
            `🎀 Elise their outfit collection hehe or a bit 🎀`,
            description,
            'https://media.discordapp.net/attachments/1093876399657451530/1356937553265295410/EliseVersion.png?ex=67ee6213&is=67ed1093&hm=f19a35aa50f6272513676bff08293bd7c467d57ad08b92f7382b0bd8ece62d14&=&format=webp&quality=lossless&width=1463&height=823',
            "🎀 Elsie their outfits.🎀"
        );
	    await interaction.reply({ embeds: [embed] });
	},
};
