const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('daycheck')
    .setDescription("Wanna know what day it is? Inspired by Countchief :3"),

  async execute(interaction) {
    // Get user locale, fallback to 'en-US' if none is set
    const userLocale = interaction.locale || 'en-US';

        const today = new Date();
        const weekday = new Intl.DateTimeFormat(userLocale, { weekday: 'long' }).format(today);
        //const TodayDate = new Date();
        //const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let response;
        switch (weekday) {
        case "Sunday":
             response = "Its Slowpoke sunday :3. Time to pat them :3"
            break;
        case "Monday":
             response =  ":o Its Miku Monday CALL ELISE QUICK"
            break;
        case "Tuesday":
             response = "I have a few blocks lauying around.. Is it tetris tuseday already?"
            break;
        case "Wednesday":
            response ="Guys, Girls, Non-binary pals Check the waters real quick... I heared on Wailord Wednesday there are more of them in there to spot"
            break;
        case "Thursday":
            response ="Even as vocaloid herself.. Elise cant forget Teto thursday ofcourse XD"
            break;
        case "Friday":
             response = "Okay okay okay listen up... Explain to my as clone and assistant of Elise.. What is funky? Because its funky friday XD"
            break;
        case "Saturday":
             response = "YAWWWWWWWWNNNNNNN i go to bed since i heared its sleepy saturday good nap."
             break;
        default:
            response = "Huh, couldn’t figure out what day it is... blame Elise!";
        }

        
        await interaction.reply(response)
    }
}