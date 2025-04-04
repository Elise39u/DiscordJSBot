const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lore')
		.setDescription('🎀 My lore Explained 🎀'),
	async execute(interaction) {
        const description = `
            Well my lore is a book work and if you havent seen <#1152967259225075803> then well.. I wanted to tell you the order and explain what is canon cuurently.
            My prolouge or my beginning will come with the V3. Its planned to go deeper in on my backstory. My prolouge also goes deeper in on the idea of <#1345430746789052496> and my powers
            <#1185957399673188402> Is my offical first adventure and the start of my lore. In this adventure is also the first time i entered the sekais.
            During LMS i got my sekai dresses in order of: <#1328320712712126546> then <#1328321706455990294> then <#1328322707078516806> then <#1328323629577932841> and as final <#1328324657664884787>
            The idea is that <#1153034890921644175> is bascially remeberd wrong and that this in combination with LMS that will be my vocaloid debut lore basically. From fanloid to vocaloid.
            Also a few months after LMS my own sekai formed in <#1153067429249953852> and not long after that me and my wife found the sekai of Elif <#1157983522418597923>.
            That leaves us with the Visual upgrades in order of: <#1200201844350259211> to <#1209546893919789077> to <#1257085336555753614> to <#1212050830308679710> to <#1227552953653530625> and as final <#1236658845955129344>

            This lore can be considerd canon and will be accuarte to why im the Goddess of Reproduction and Gurdian of the sekais and identity.
            If you want to read why something aren't canon use the nonlore commnad :3
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
