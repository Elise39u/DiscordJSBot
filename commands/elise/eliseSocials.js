const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('socials')
        .setDescription('Displays the socials of Elise'),
    async execute(interaction) {
        const description = `
            🎀 Instagram --> https://www.instagram.com/twitch_preggoelise/ \n 
            🎀 Twitter --> https://twitter.com/TJuju124 \n 
            🎀 Steam --> https://steamcommunity.com/id/PreggoElise/ \n 
            🎀 Battle.Net --> juju125#2638 \n 
            🎀 Youtube Channel --> https://www.youtube.com/channel/UCFK1FzoHQ3XlQaqejb3fGMg \n  
            🎀 Youtube Vod Channel --> https://www.youtube.com/channel/UCpGrqQTMjFGFecEMd7F3YcQ \n 
            🎀 Valorant ID --> SakuraElis#Pink \n 
            🎀 Reddit --> https://www.reddit.com/r/preggoelise/ \n 
            🎀 Tiktok --> @preggoelise \n 
            🎀 Pateron --> patreon.com/PreggoElise \n
            🎀 PS4 IGN --> Image down below 
        `;

        const embed = createEmbed(
            `I found the following socials of Elise.<:MikuStare:1048727307612868640> *Don't mind the mess behind me*`,
            description,
            'https://cdn.discordapp.com/attachments/491904770236481549/866804206534524958/unknown.png',
            "My Creators preggos socials :3"
        );

        await interaction.reply({ embeds: [embed] });
    },
};