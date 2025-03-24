const { EmbedBuilder } = require('discord.js');

function createEmbed(title, description, imageLink = null, footerTitle = null, color = 0x609bf2) {
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color);

    if(footerTitle) {
        embed.setFooter({text: footerTitle, iconURL: undefined})
    }

    if (imageLink) {
        embed.setImage(imageLink);
    };

    return embed;
}

module.exports = { createEmbed };