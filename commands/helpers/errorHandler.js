const {ERROR_CHANNEL} = process.env;
const { createEmbed } = require('./embedBuilder');

const errorGifs = [
    "https://cdn.discordapp.com/attachments/1353686944756011092/1353689308997091388/skbidi.gif?ex=67e290e9&is=67e13f69&hm=fe277453e3912245894a18b4d55508288e1a56702dbdb6a951b9c618b32b8e88&",
    "https://cdn.discordapp.com/attachments/1353686944756011092/1353689309588492308/hatsune-miku-miku.gif?ex=67e290e9&is=67e13f69&hm=7812d57cd5fd35ddcef16535c774dd60d22c33d62833412b3abe4d240a4c7ba1&",
    "https://cdn.discordapp.com/attachments/1353686944756011092/1353689310322229299/pjsk-pjsk-anime.gif?ex=67e290e9&is=67e13f69&hm=eb6d2f8a8877c9b68fe85e5a521d8c19d512452d39e65e9d5f547b6919171b04&",
    "https://cdn.discordapp.com/attachments/1353686944756011092/1353689311031201913/miku-shocked.gif?ex=67e290ea&is=67e13f6a&hm=c503053a3609246c16e702815f355061b597ff8d49d3ce56a29c72a43c4e6b26&",
];

async function errorHandeler(errorReason, colorCode, errorCode, currentCommand) {
    const loggingChannel = await interaction.client.channels.fetch(ERROR_CHANNEL);
    
    const randomImage = errorGifs[Math.floor(Math.random() * errorGifs.length)];
    await loggingChannel.send("<@203095887264743424> MOMMY PREGGO HALP I GOT AN ERROR")

    const errorEmbed = createEmbed("Halp Mommy", "Mommy i found the following: " + errorCode + " with the following reason: " +  errorReason + " While doning: " + currentCommand,
        randomImage, "🎀 I found an error mommy please help 🎀", colorCode
    )
    await loggingChannel.send({ embeds: [errorEmbed] });
}

module.exports = {errorHandeler}