require('dotenv').config()
const Discord = require("discord.js");
const axios = require('axios')
const intents = new Discord.Intents(process.env.INTENT_ID)
const bot = new Discord.Client({ intents });
const token = process.env.TOKEN;
const masterlist = process.env.RAGE_MASTERLIST
const ip = process.env.SERVER_IP

bot.login(token);

bot.on("ready", () => {
    console.log("Bot | Online");
    setInterval(function() {

        axios.get(masterlist)
            .then(function(response) {
                if (response.status == 200) {
                    if (response.data[ip]) {
                        //console.log(response.data[ip].players);
                        bot.user.setActivity(`AC-RP with ${response.data[ip].players} players.`);
                    } else {
                        bot.user.setActivity(`Rage:MP Server is offline`);
                    }
                } else console.log("Can't load Rage:MP Masterlist!")
            })
            .catch(function(error) {
                console.log(error);
            });
    }, 3000);
});

bot.on('message', (msg) => {

    if (msg.content === "!verify" && msg.channelId === '884934707672936460') {
        var author = msg.author.username
        if (msg.member.roles.cache.some(role => role.name === 'verified-user')) {


            const exampleEmbed = {

                author: {
                    name: bot.user.username,
                    icon_url: bot.user.displayAvatarURL(),

                },

                description: 'You are already verified user!',
            };

            msg.member.send({ embeds: [exampleEmbed] });
            msg.delete(1000)


        } else {
            msg.reply("```" + author + " has been given a verified-user role.```");

            let role = msg.guild.roles.cache.find(role => role.name === 'verified-user');

            msg.member.roles.add(role);
        }
    }


})


bot.on("guildMemberAdd", (msg) => {

    const channel = msg.guild.channels.cache.find(channel => channel.name === "new-members")
    var author = msg.user.username
    const wlcmMsg = {
        fields: [{
            name: 'Welcome',
            value: author.toString() + ' has joined the server. Have fun with us :smiley:',
            inline: true
        }],

        timestamp: new Date(),
        footer: {
            color: 0x0099ff,
            text: 'Copyright © 2021 by Arcadius RolePlay',
            icon_url: bot.user.displayAvatarURL(),
        },
    };
    channel.send({ embeds: [wlcmMsg] });


});


bot.on("guildMemberAdd", (member) => {

    var author = member.user.username

    const exampleEmbed = {
        color: 3447003,

        author: {
            name: bot.user.username,
            icon_url: bot.user.displayAvatarURL(),

        },
        title: 'Hello ' + author + ", welcome to Arcarius RolePlay Discord server.",

        description: 'Arcadius RolePlay is new community that is based on GTA V RolePlay and Rage:MP Client. For more informations visit our Portal. Have fun :smiley:',
        fields: [{
                name: 'Important links',
                value: '[PORTAL](https://www.facebook.com/) \n[FORUM](https://www.youtube.com) \n[UCP](https://www.facebook.com/) ',
                inline: true,
            },
            {
                name: 'Social media',
                value: '[FACEBOOK](https://www.facebook.com/) \n[YOUTUBE](https://www.youtube.com)',
                inline: true,
            },

        ],
        image: {
            url: 'https://arcadium-roleplay.herokuapp.com/portal/images/acrp-logo-page.png',
        },
        timestamp: new Date(),
        footer: {
            text: 'Copyright © 2021 by Arcadius RolePlay',
            icon_url: bot.user.displayAvatarURL(),
        },
    };

    member.send({ embeds: [exampleEmbed] });

});