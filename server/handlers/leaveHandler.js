const { createEmbed } = require('../../commands/helpers/embedBuilder');

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

const leaveChannelId = "797789187910664193";
const errorChannelld = "822837640872067082";

async function handleMemberLeave(member) {
    const channel = member.guild.channels.cache.get(leaveChannelId);
    if (!channel) {
        const errorChannel = member.guild.channels.cache.get(errorChannelld);
        if(errorChannel) {
            const errorEmbed = new createEmbed("Mommy Elise i got an error", "I expiercend an error while a member left can you look at me", null);
            await errorChannel.send({ embeds: [errorEmbed] });
        }
        return;
    }

    const randomImage = embedLeaveUrls[Math.floor(Math.random() * embedLeaveUrls.length)];

    const leaveEmbed = new createEmbed("* A visitor has left the arcade sekai *", "I saw that " +  member.user.displayName  + " left the girly game sekai. Hope we might see them agian soon",
        randomImage)
    
    await channel.send({ embeds: [leaveEmbed] });
}

module.exports = { handleMemberLeave };
