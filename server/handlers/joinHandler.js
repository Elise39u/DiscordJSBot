const { createEmbed } = require('../../commands/helpers/embedBuilder');
const { errorHandeler } = require('../../commands/helpers/errorHandler');
const { ERROR_CHANNEL, WELCOME_CHANNEL } = process.env

const embedWelcomeURLS = [
    "https://i.kym-cdn.com/photos/images/original/001/236/970/0f1.gif", 
    "https://cdn.discordapp.com/attachments/757611689003974779/861329033756672030/LTWB_Micrystal.gif", 
    "https://cdn.discordapp.com/attachments/757611689003974779/861329293066108936/2ffuym.gif", 
    "https://cdn.discordapp.com/attachments/757611689003974779/861329462636183602/ezgif.com-gif-maker_3.gif",
    "https://cdn.discordapp.com/attachments/757611689003974779/861329538398552084/ezgif-3-f1b581708e09.gif", 
    "https://cdn.discordapp.com/attachments/709057115159003156/999650609621897328/gif_5.gif", 
    "https://cdn.discordapp.com/attachments/709057115159003156/948212388925157436/unknown.png", 
    "https://cdn.discordapp.com/attachments/709057115159003156/1096071817199878176/Sepihm_in_the_ring.gif", 
    "https://cdn.discordapp.com/attachments/709057115159003156/1096071815903846442/Mannequin.gif", 
    "https://cdn.discordapp.com/attachments/709057115159003156/1096071814494552135/ezgif-3-025a1bb57f42.gif", 
    "https://cdn.discordapp.com/attachments/709057115159003156/1096071814075134092/ezgif.com-optimize.gif", 
    "https://cdn.discordapp.com/attachments/709057115159003156/1096071815392145559/ChristmasGif.gif", 
    "https://cdn.discordapp.com/attachments/709057115159003156/1096071990965698601/tenor_3.gif"
]

const welcomeRoleId = "699572966551322635";

async function getWelcomeRole(member) {
    try {
        const role = await member.guild.roles.fetch(welcomeRoleId);
        if (role) {
            await member.roles.add(role);
        } else {
            throw new Error("Mammy i couldnt add the role: " + role.name + " and dindt add it to the user: " + member.name);
        }
    } catch (error) {
        await errorHandeler(error.message, 0xff0000, "JOIN_HANDLER_ROLE_ERR", "joinHandler");
    }
}

async function handleMemberJoin(member) {
    try {
        const channel = member.guild.channels.cache.get(WELCOME_CHANNEL);
        if (!channel) { 
            const errorChannel = member.guild.channels.cache.get(ERROR_CHANNEL);
            if(errorChannel) {
                throw new Error("Mammy i couldnt find the welcome channel");
            }
            return;
        }

        const randomImage = embedWelcomeURLS[Math.floor(Math.random() * embedWelcomeURLS.length)];

        await channel.send(`🎀 Welcome to the Arcade Sekai, ${member}! 🎀`);
        const joinEmbed = new createEmbed("🎀 Welcome to the Arcade garden in the Sekai🎀", "Before i start, i do have to say a few things. 💖 \n <#703637751274143854> <-- Channel where you can find the rules of the server 🎀 \n <#797792369416208386>  <-- For some information on the server 🎀 \n <#699557641818734638> <-- Main  chat 🎀 \n <#962632709405032458> <-- Introduction about me if your interested 🎀💙",
            randomImage, "🎀 Welcome to arcade sekai your the " + member.guild.memberCount + "th vistor🎀")
        
        getWelcomeRole(member)
        await channel.send({ embeds: [joinEmbed] });
    } catch(error) {
        await errorHandeler(error.message, 0xff0000, "JOIN_HANDLER_CHNL_ERR", "joinHandler");
    }
}

module.exports = { handleMemberJoin };
