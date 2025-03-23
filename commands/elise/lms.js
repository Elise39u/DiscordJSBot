const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lms')
		.setDescription('explaning Elises their first adventure'),
	async execute(interaction) {
        const description = `
            I always thought this adventure was a dream, Something one only could wish off. 
            That moment i ended up in the vocaloid dimension and was bound to its rules. But then i saw her.
            A girl surronded by a group of what looked like humans... Greenish blue tigtales. 
            A few years later and well were suppose to wait for luka who never showed up. Which lead us to an fun adventure.
            A muscical adventure were we, yes me and miku fell in love and got married. Even at one point in the adeventure whrere well. 
            I experinced my first true pregnancy which was funny but it all felt not real. So come with me and Miku on a journey.
            The journey of my first adventure were i only not learn of my true powers but also my true prophecy and puropse as Goddes of Reproduction.
            and the Gurdian of the sekais and identity. You can click the title to take you to the adventure playlist. :3 channel is <#1185957399673188402>
        `;

        const embed = createEmbed(
            `🎀 My first true adventure. Luka Missing Story a short description 🎀`,
            description,
            'https://cdn.discordapp.com/attachments/1093876399657451530/1353398025011073196/GmutiuraAAA2Wpo.webp?ex=67e181a2&is=67e03022&hm=790e73c2d8f270a7a87a313b46cbefcd1c1ad9a1dad8adfe6241d20fb62707df&'
        );

        embed.setURL("https://www.youtube.com/watch?v=oOVPvZmGHcQ&list=PLNc-vlTat7vhazaNk3t4IwJGlerPOQ7Cu")
	    await interaction.reply({ embeds: [embed] });
	},
};
