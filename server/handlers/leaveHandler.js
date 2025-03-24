const { createEmbed } = require('../../commands/helpers/embedBuilder');
const { errorHandeler } = require('../../commands/helpers/errorHandler');
const { ERROR_CHANNEL, WELCOME_CHANNEL } = process.env

const embedLeaveUrls = [
    "https://images.hdqwalls.com/wallpapers/sad-miku-1a.jpg",
    "https://data.whicdn.com/images/104730073/original.gif",
    "https://cdn75.picsart.com/185243629000202.gif?to=min&r=640",
    "https://cdn.discordapp.com/attachments/757611689003974779/861351458824781875/ezgif-6-00b29df6c68e.gif",
    "https://cdn.discordapp.com/attachments/757611689003974779/861351473162223656/ezgifmaker.gif",
    "https://i.pinimg.com/originals/d4/19/73/d419735eb285e55e0a38093683fb3503.gif",
    "https://cdn.discordapp.com/attachments/757611689003974779/861351713444331550/Hibana.gif",
    "https://wallpapers.com/images/hd/anime-girl-sad-alone-hatsune-miku-city-view-70uef0rsbenzw78x.jpg",
    "https://cdn.discordapp.com/attachments/709057115159003156/1096071814901407754/DilemmaRunMiku.gif",
    "https://cdn.discordapp.com/attachments/709057115159003156/1096071816814010469/P7qoKy.gif"
];


async function handleMemberLeave(member) {
    try {
        const channel = member.guild.channels.cache.get(WELCOME_CHANNEL);
        if (!channel) {
            const errorChannel = member.guild.channels.cache.get(ERROR_CHANNEL);
            if(errorChannel) {
                throw new Error("Mammy i couldnt find the welcome channel");
            }
            return;
        }

        const randomImage = embedLeaveUrls[Math.floor(Math.random() * embedLeaveUrls.length)];

        const leaveEmbed = new createEmbed("*A visitor has left the arcade sekai*", "I saw that " +  member.user.displayName  + " left the girly game sekai. Hope we might see them agian soon",
            randomImage, "🎀 Someone left the arcade sekai :( 🎀")
        
        await channel.send({ embeds: [leaveEmbed] });
    } catch(error) {
        await errorHandeler(error.message, 0xff0000, "LEAVE_HANDLER_CHNL_ERR", "leaveHandler");
    }
}

module.exports = { handleMemberLeave };
