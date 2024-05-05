require("dotenv").config();
const {Client, IntentsBitField, ActivityType} = require("discord.js");
const pack = require("../package.json");

const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

client.on("ready", (c) => {
    console.log(`*( ${c.user.username} is now online! )*`);
    client.user.setActivity({
        name:"Ziggy&Puff",
        type:ActivityType.Streaming,
        url:"https://twitch.tv/ziggyandpuff"
    });
});

client.on("interactionCreate", (e) => {
    if(!e.isChatInputCommand()) return;

    if(e.commandName === "about"){
        e.reply(`About Zig Bot, Version: ${pack.version}, this bot makes it easier to make reminders about spin class.`);
    }
    if(e.commandName === "class"){
        let urole = e.member.roles.cache.find(role => role.name === 'Administrator');
        console.log(urole);
        console.log(e.user)
        
        if(urole === undefined) {
            e.reply("```Error:User does not have enough privilege to access this command```")
            return;
        }
        const ann = client.channels.cache.get("1228906549662060625");
        const role = e.guild.roles.cache.get("1228912776534294570");
        const month = e.options.get("month").value;
        const day = e.options.get("day").value;
        const year = e.options.get("year").value;
        const hour = e.options.get("hour").value;
        const minute = e.options.get("minute").value;
        const ampm = e.options.get("am-pm").value;
        const can = e.options.get("canceled").value;
        e.reply("Notified!");
        if(!can) {ann.send(`There will be a new class on ${month}/${day}/${year} at ${hour}:${minute} ${ampm}. Make sure to come if you can! \n \n`+"```This notiflication is power by Zig-Bot```"+`||${role}||`);
        return;}
        ann.send(`The class for ${month}/${day}/${year} has been canceled. Make sure not to come that day!\n\n`+"```This notiflication is powered by Zig-bot```||"+`${role}||`);
    }
    if(e.commandName === "help"){
        e.reply("Here is a list of the following commands:\n```/about --- provides info about the bot\n/class --- announces a scheduled class\n/help --- provides a list of bot commandes and a description of each one\n/request --- provides the owner with a song request for an upcoming playlist```");
    }
    if(e.commandName === "request"){
        const url = e.options.get("url").value;
        const user = e.user.globalName;
        const chan = client.channels.cache.get("1229613360048242728");
        const ping = e.guild.roles.cache.get("1228898019554885692");
        chan.send(`${user} has requested a song:${url}.\nPlease consider adding this to a playlist.\n\n||${ping}||`);
        e.reply(`Your request has been processed ${user}!`);
    }
});


client.login(process.env.TOKEN);
