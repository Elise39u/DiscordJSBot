const { EmbedBuilder } = require('discord.js');

function createEmbed(title, description, imageLink = null) {
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(0x609bf2);

    if (imageLink) {
        embed.setImage(imageLink);
    };

    return embed;
}

module.exports = { createEmbed };