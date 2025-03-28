const { createEmbed } = require('../../commands/helpers/embedBuilder');
const { errorHandeler } = require('../../commands/helpers/errorHandler');
const { ERROR_CHANNEL, WELCOME_CHANNEL } = process.env

const embedWelcomeURLS = [
    "https://cdn.discordapp.com/attachments/859788500114210826/1355166541376917727/pjsk-pjsk-anime2.gif?ex=67e7f0b1&is=67e69f31&hm=ab5a2dd153335d6f6f4830b930607d1a5433e773a8743fcdf2ff09a3393f2b2d&",
    "https://cdn.discordapp.com/attachments/859788500114210826/1355166541934497793/ezgif-1ce8f1147c6317.gif?ex=67e7f0b1&is=67e69f31&hm=62fa49cc178289473683731e86e57f3eff22adcbceafe78c9adbbb31accf7cbe&",
    "https://cdn.discordapp.com/attachments/859788500114210826/1355166542446465055/pjsk-pjsk-anime.gif?ex=67e7f0b1&is=67e69f31&hm=901433f89e6943d68a23b5d4f58c2309e06ad9aa08294718b47e2092c6d66ad1&",
    "https://cdn.discordapp.com/attachments/859788500114210826/1355166542970486864/pjsk-anime-pjsk.gif?ex=67e7f0b1&is=67e69f31&hm=408d2f93e5205127688d9547477f10291d95530d2fbe193da4f17ae8dda64e19&",
    "https://cdn.discordapp.com/attachments/859788500114210826/1355166543453098175/hatsune-miku-project-sekai.gif?ex=67e7f0b1&is=67e69f31&hm=07cc0252b2ed307c0e12777f66f8efa46e02d33167293448f0e4afb76105d22c&",
    "https://cdn.discordapp.com/attachments/859788500114210826/1355166543918403624/pjsk-anime-project-sekai-anime.gif?ex=67e7f0b1&is=67e69f31&hm=97fa209e59a62d68125874e968acba13e7abb6c850ae94cf3e72fffcae3a53d0&"
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
