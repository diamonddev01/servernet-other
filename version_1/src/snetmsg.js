const redis = require('./redis')
const Discord = require("discord.js")
const guildconfig = require("./dataNew/guilds.json")
const userconfig = require("./dataNew/users.json")
const blacklists = require("./data/blacklists.json")
const config = require("./config.json")
const channels = config.channels
const rchannels = config.RevoltChannels;
const db = require("quick.db")
const eventB = require("./dataNew/eventbadges.json")
const errorinfo = require("./resources/errorcodes.json")
const allowedGuilds = require("./dataNew/allowedguilds.json");
const https = require('https');

module.exports = {
    name: "snetmsg",
    description: "runs the servernet message protocol",
    run: async (message, PublicClient, redisClient, RClient) => {
      if(message.author.id == "829383622439206993") return; //Returns if its the bot
      
      if (userconfig.staff.includes(message.member.id) || userconfig.srStaff.includes(message.member.id) || userconfig.developers.includes(message.member.id)) bypass = true;
      else bypass = false

      //If user is blacklisted, react with X and hammer and then return
			if(blacklists.users.includes(message.author.id) || blacklists.guilds.includes(message.guild.id)) {
        message.react('❌')
        message.react('🔨')
        return;
      }
      
      //If user is blacklisted, react with X and hammer and then return
			if(db.get(`${message.author.id}-blacklisted`)) {
				message.react('❌')
        message.react('🔨')
        return;
      }

      //If user is a bot, react with a bot emoji then return;
      if(message.author.bot) {
        message.react('🤖')
        return;
      }
      
      redisError = false;
      try {
        redisClient.get(`${message.author.id}-ongoing-SNT`, async (err, result) => {
          if(err) {
            console.log(err)
            redisError = true;
            message.react('❌')
            message.react('⚠️')
            return;
          }

          if(result && !bypass) {
            //User is timed out
            message.react('❌')
            message.react('⏲️')
          } else {
            //User can send a message

            //Rest of file

            try {
          redisClient.set(`${message.author.id}-ongoing-SNT`, `true`, 'EX', 5)
            } catch(e) {
              console.log(e)
            }
            
            channel = message.channel.id
            guildtags = getGuildTags(message); //Get the guild tags from the function
        		usertags = getUserTags(message); //Get the user tags from the function
            
            foundInText = await containsBadword(message, "blacklisted")
            contLink = await containsLink(message, "contLink")
            pings = await containsPing(message, "pings")
            badLink = await sneakyLink(message)
            //console.log(badLink)

            if(message.attachments.first()) {
              attachmentURL = ` ${message.attachments.first().url}`;
              camera = '<:Images:903438115077767228> '
              contLink = true;
              att = true;
            } else {
              attachmentURL = ''
              camera = ''
              att = false;
            }

            systemMessage = false

            sendmessage = "Error... please contact a developer. \n__Info__\nError Code: #004S\nError Info: Failed to set the sendmessage. Usually due to missing the main def line and/or a bad if statment."
            guildname = getGuildName(message.guild)
            sendmessage = `**[${guildname} ${guildtags}]** **${message.author.tag} ${usertags}:** ${camera}${message.content}${attachmentURL}`
            if(!message.content || message.content == "" || message.content == " ") {
              if(!attachmentURL) {
                sendmessage = `[SYSTEM<:OfficialServer:838105080087183380>]  AUTOMOD <:Bot:838453677106790450>: ${message.author.tag}, stickers break the bot, no thanks`
                systemMessage = true
              }
            } 
            if (foundInText == true) {
              sendmessage = `[SYSTEM<:OfficialServer:838105080087183380>]  AUTOMOD <:Bot:838453677106790450>: ${message.author.tag}, you cant send that here, its against the bots service policy`
              systemMessage = true
            } 
            if (pings == true) {
              sendmessage = `[SYSTEM<:OfficialServer:838105080087183380>]  AUTOMOD <:Bot:838453677106790450>: ${message.author.tag}, pings can not be sent by the bot or in the bots channel...`
              systemMessage = true
            }
            canSendLinks = allowLinks(message, message.author)
            if(canSendLinks == false && contLink) {
              sendmessage = `[SYSTEM<:OfficialServer:838105080087183380>]  AUTOMOD <:Bot:838453677106790450>: ${message.author.tag}, You need to send 100 messages to send links and media with SNet`
              systemMessage = true
            } 
            if(badLink == true || badLink == 'true') {
              sendmessage = `[SYSTEM<:OfficialServer:838105080087183380>]  AUTOMOD <:Bot:838453677106790450>: ${message.author.tag}, That link is not allowed, sorry.`
              systemMessage = true
            }
            if (pings == true) {
              sendmessage = `[SYSTEM<:OfficialServer:838105080087183380>]  AUTOMOD <:Bot:838453677106790450>: ${message.author.tag}, pings can not be sent by the bot or in the bots channel...`
            }

            //console.log(sendmessage)

            if(!systemMessage) {
              const rmsg = `(DISCORD) [${message.guild.name}] ${message.author.username}: ${message.content}`
              for(const channel of rchannels) {
                RClient.sendToChannel(channel, {content:rmsg})
              }
              for (var i = 0; i < channels.length; i++) {
                  try {
                    //if(message.author.username == 'Diamond Oreo') return;
                    PublicClient.channels.cache.get(channels[i]).send(sendmessage)
                } catch(e) {
                    //console.log(e)
                    z = e
                }
              }
              if(!att) message.delete().catch((e)=>{console.log(e)});
            } else {
              message.reply(sendmessage)
            }
            try {
          redisClient.set(`${message.author.id}-ongoing-SNT`, `true`, 'EX', 5)
            } catch(e) {
              console.log(e)
            }
           sendLogMessage(message, PublicClient)

           db.add(`MSG_TTL_G:${message.guild.id}`, 1);
           db.add(`MSG_TTL_A`, 1);
           db.add(`MSG_TTL_U:${message.author.id}`, 1)
          }
        })
      } catch(e) {
        console.log(e)
        message.react('❌')
        message.react('⚠️')
      }
    }
}

//Functions

function getGuildTags(message) {
    guildtags_1 = ""
    guildtags_2 = ""
    if (guildconfig.boosted.includes(message.guild.id)) guildtags_2 = "<:Booster:847494417824874536>"
    if (guildconfig.verified.includes(message.guild.id)) guildtags_1 = "<:Verified:838105317509955644>"
    if (guildconfig.partners.includes(message.guild.id)) guildtags_1 = "<:PhonePartner:838222120349597696>"
    if (guildconfig.officical.includes(message.guild.id)) guildtags_1 = "<:OfficialServer:838105080087183380>"

    guildtags = [guildtags_1, guildtags_2]
    guildtags = guildtags.join("")
    return guildtags;
}

function getUserTags(message) {
    usertags_1 = ""
    usertags_2 = ""
    usertags_3 = ""
    if (userconfig.oldStaff.includes(message.member.id)) usertags_1 = "<:Goodbye:882412602263744563>"
    if (userconfig.staff.includes(message.member.id)) usertags_1 = "<:PhoneStaff:838105339010089050>"
    if (userconfig.srStaff.includes(message.member.id)) usertags_1 = "<:SrPhoneStaff:853459931650195517>"
    if (userconfig.developers.includes(message.member.id)) usertags_1 = "<:PhoneDeveloper:838104705413415032>"
    if (userconfig.verified.includes(message.author.id)) usertags_2 = "<:Verified:838105317509955644>"
    if (userconfig.partners.includes(message.author.id)) usertags_2 = "<:PhonePartner:838222120349597696>"
    if (userconfig.plus.includes(message.author.id)) usertags_3 = "<:plus:838104458620960768>"
    if (userconfig.boosters.includes(message.author.id)) usertags_3 = "<:Booster:847494417824874536>"
    if (userconfig.watchlist.includes(message.author.id)) usertags_1 = "<:Loading:838104894664736779>"

    if(message.author.id == "276434154579689474") usertags_3 = "<:Servernet10kAward:920837747948798032>";

    usertags = [usertags_1, usertags_2, usertags_3]
    usertags = usertags.join("")
    return usertags;
}

/*function messageCount(message) {
    db.add(`msg_${message.author.id}`, 1)
}

function userLevel(message) {
    db.fetch(`msg_${message.author.id}`).then(i => {
        sent = i.value
    })
    return sent;
}*/

function allowLinks(message, user) {
  if (userconfig.watchlist.includes(message.author.id)) return false;
    if(userconfig.staff.includes(user.id) || userconfig.srStaff.includes(user.id) || userconfig.developers.includes(user.id) || userconfig.verified.includes(user.id)) return true;
    var msgs = db.fetch(`global_msg_${user.id}`) || 1;
    if (msgs < 100) {
        return false;
    } if (msgs >= 100) {
        return true;
    }
}

function getGuildName(guild) {
    //Main Guilds
    guildname = guild.name
    return guildname
}

function sendLogMessage(message, client) {
    logmessage = 'ATTX FAIL'
    badges = getUserTags(message)
    gbadges = getGuildTags(message)
    logchannels = ["855584088849121340", "855577865399697448", "829847139017949204"]
    for (var i = 0; i < logchannels.length; i++) {
        try {
            if(logchannels[i] == "855577865399697448") logmessage = oldLogMessage(message, badges)
            else logmessage = `**[${message.guild.name} ${gbadges} | ${message.guild.id} ${gbadges}] {${message.channel.name} | ${message.channel.id}} ${message.author.tag} ${badges} | ${message.author.id} ${badges}**\n${message.content}`
            client.channels.cache.get(logchannels[i]).send(logmessage)
        } catch(e) {
            console.log(e)
        }
   }
}

function oldLogMessage(message, badges) {
    logmessage = new Discord.MessageEmbed()
    .setTitle('Message Sent')
    .setDescription('This embed is automated by servernet')
    .setAuthor(message.author.tag, message.author.avatarURL)
    .addFields(
        { name: 'User', value: `${message.author.tag} (${message.author.id})`, inline: true },
        { name: 'Badges', value: `USR: ${badges}`, inline: true },
        { name: 'Guild info', value: `Guild Name: ${message.guild.name} (${message.guild.id})\nChannel Name: ${message.channel.name} (${message.channel.id})` },
        { name: 'Content', value: `${message.content}`, inline: false }
    )
    return logmessage;
}

async function flagText(message, type) {
    var { content, mentions } = message
    //console.log(type)
    if(type == "contLink") {
        contLink = false
        links = ["http://", "https://", ".com", ".gg"]
        for (var i in links) {
            if (content.toLowerCase().includes(links[i].toLowerCase())) contLink = true;
        } return contLink;
    } if (type = "pings") {
        pings = false
        if(mentions.members.first()) pings = true
        if(mentions.everyone) pings = true
        if(content.includes("@here")) pings = true
        if(content.includes("@everyone")) pings = true
        return pings;
    } if(type == "blacklisted") {

    } if (type == "badLink") {
      
    }
}

async function containsLink(message) {
  return new Promise(resolve => {
    const {content} = message;
    contLink = false
    links = ["http://", "https://", ".com", ".gg"]
    for (g=0;g<links.length;g++) {
      if (content.toLowerCase().includes(links[g].toLowerCase())) resolve(true);
      if(g == links.length -1) {
        resolve(false)
      }
    }
  })
}

async function containsPing(message) {
  return new Promise(resolve => {
    const { mentions, content } = message;
    pings = false
    if(mentions.members.first()) pings = true
    if(mentions.everyone) pings = true
    if(content.includes("@here")) pings = true
    if(content.includes("@everyone")) pings = true
    resolve(pings);
  })
}

async function sneakyLink(message) {
  //console.log('ur my sussy baka')
        const promise = new Promise(async (resolve) => {
          https.get(`https://badlink.diamondstudios.tk/discord?message="${message.content}"`, res => {
            res.on('data', d => {
              //console.log(d.toString())
              resolve(d.toString());
            })
          })
        })
        return promise;
}

async function containsBadword(message) {
  return new Promise(resolve => {
  const {content} = message;
  const blacklisted = config.blacklisted;
    for (m=0;m<blacklisted.length; m++) {
      if (message.content.toLowerCase().includes(blacklisted[m].toLowerCase)) resolve(true);
      if(m == blacklisted.length-1) {
        resolve(false);
      }
    }
  })
}