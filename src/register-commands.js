require("dotenv").config();
const {REST, Routes, ApplicationCommandOptionType} = require("discord.js");

const commands = [
    {
    name: "about",
    description: "About Zig Bot"
    },
    {
    name:"class",
    description:"Sends out a reminder for an upcoming class.",
    options:[
        {
        name:"month",
        description:"What month is the class in?",
        type:ApplicationCommandOptionType.Integer,
        required:true,
        choices:[
            {name:"January",value:1},
            {name:"Febuary",value:2},
            {name:"March",value:3},
            {name:"April",value:4},
            {name:"May",value:5},
            {name:"June",value:6},
            {name:"July",value:7},
            {name:"August",value:8},
            {name:"September",value:9},
            {name:"October",value:10},
            {name:"November",value:11},
            {name:"December",value:12}
        ]
        },
        {
        name:"day",
        description:"What day is the class on?",
        type:ApplicationCommandOptionType.Integer,
        required:true
        },
        {
        name:"year",
        description:"What year is the class in? (put in the last two numbers of the year)",
        type:ApplicationCommandOptionType.Integer,
        required:true
        },
        {
        name:"hour",
        description:"What hour is the class at?(1-12 no AM/PM)",
        type:ApplicationCommandOptionType.Integer,
        required:true,
        choices:[
            {name:"1",value:1},
            {name:"2",value:2},
            {name:"3",value:3},
            {name:"4",value:4},
            {name:"5",value:5},
            {name:"6",value:6},
            {name:"7",value:7},
            {name:"8",value:8},
            {name:"9",value:9},
            {name:"10",value:10},
            {name:"11",value:11},
            {name:"12",value:12},
        ]
        },
        {
        name:"minute",
        description:"What minute of the hour is class at?",
        type:ApplicationCommandOptionType.String,
        required:true,
        choices:[
            {name:"00",value:"00"},
            {name:"15",value:"15"},
            {name:"30",value:"30"},
            {name:"45",value:"45"},
        ]

        },
        {
        name:"am-pm",
        description:"Is the class in the morning or afternoon?",
        type:ApplicationCommandOptionType.String,
        required:true,
        choices:[
            {name:"AM",value:"AM"},
            {name:"PM",value:"PM"}
        ]
        },
        {
        name:"canceled",
        description:"Is class canceled or not?",
        type:ApplicationCommandOptionType.Integer,
        required:true,
        choices:[
            {name:"Not Canceled",value:0},
            {name:"Canceled",value:1}
        ]
        }
    ]
    },
    {
    name:"help",
    description:"Provides descriptions of every command"
    },
    {
    name:"request",
    description:"Requests a song to be added to a class playlist",
    options:[
        {
        name:"url",
        description:"The Spotify URL of the song you want to request(make sure it starts with https://)",
        type:ApplicationCommandOptionType.String,
        required:true
        }
    ]
    }
];


const rest = new REST({version:"10"}).setToken(process.env.TOKEN);

( async () => {
    try {
        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID,process.env.GUILD_ID),{body:commands});
        console.log("Slash commands registered!")
    } catch (error) {
        console.log(`There was an error! Error:${error}`);
    }
})();