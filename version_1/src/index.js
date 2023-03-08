//requirements and declairations
const db = require('quick.db')
const revoltChat = require('revchatapi');
const blacklists = require("./data/blacklists.json")
const guildblacklists = require("./data/serverblacklists.json")
const Discord = require("discord.js");
const PublicClient = new Discord.Client();
const config = require('./config.json')
const RevoltClient = new revoltChat.Client(config.rtkn);
const prefix2 = config.prefix;
//commands select
const fs = require("fs");
const { publicDecrypt } = require("crypto");
const { setMaxListeners, send } = require("process");
PublicClient.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    PublicClient.commands.set(command.name, command);
};
const redis = require('./redis')
const {users} = require('./data/blacklists.json')

const cnm = require("./customNetworks/manager")
const snetmsg = require("./snetmsg")
redisClient = ''

//Client ready
PublicClient.on('ready', async() => {
    console.log('Your Bot is now Online.')
    let activities = config.activites,i = 0;
    setInterval(() => PublicClient.user.setActivity(`${activities[i++ %  activities.length]}`,  {type:"PLAYING",url:"https://www.youtube.com/watch?v=DWcJFNfaw9c"  }), 5000)
    redisClient = await redis()
    console.log(`Connecting to ${config.channels.length} channels throuout ${PublicClient.guilds.cache.size} guilds!`)
});

//command handler
/*PublicClient.on("message", (message) => {
    const msg = message.content.slice(0).split(/ +/);
    const msgcnt = msg.shift().toLowerCase();
    if(!msgcnt.startsWith(prefix2)) return;
    if(message.author.bot) return;

    const args = message.content.slice(prefix2.length).split(/ +/);
    const command = args.shift().toLowerCase();
    //commands
    if (command == "avatar" || command == "uptime" || command == "ping" || command == "rank" || command == "botinfo" || command == "topic") {
        PublicClient.commands.get(command).run(PublicClient, message, args, Discord);
    } //else/* if(command == "av" || command == "rank") *///{
        //aliashandler.run(client, message, args, Discord);
    //}
//});

//tags = Pre Set

PublicClient.on("message", (message) => {
    if (config.channels.includes(message.channel.id)) {
    if(!users.includes(message.author.id) && !db.get(`${message.author.id}-blacklisted`)) giveXp(message)
    snetmsg.run(message, PublicClient, redisClient, RevoltClient);
    } else {
    cnm.run(PublicClient, message, redisClient)
    }
});



PublicClient.on("message", (message) => {
    const msg = message.content.slice(0).split(/ +/);
    const msgcnt = msg.shift().toLowerCase();
    if(!msgcnt.startsWith(prefix2)) return;
    if(message.author.bot) return;

    //PublicClient.channels.cache.get("").send(sendmessage)

//    if(message.channel == "829391681433894922" || message.channel == "847240923666055198" ||message.channel == "832024314671923252" || message.channel == "830075576240439298" || message.channel == "751550925893795973" || message.channel == "830076452056989736" || message.channel == "829670028545884160" ||message.channel == "830004295676067892" ||message.channel == "829417082655473664" || message.channel == "829426107295858690" || message.channel == "829847417154175017" || /*message.channel == "829419344659349557" || */message.channel == "829436574223171675" || message.channel == "829454925846413322" || message.channel == "829474055367032832" || message.channel == "829991816441888798" || message.channel == "806502076262776912" || message.channel == "830012802801860619" || message.channel == "831106219045027850" || message.channel == "830790419502596101") {
/*        sendmessage = `[SERVICE<:OfficialServer:838105080087183380>]  ServerNet <:Bot:838453677106790450>: Commands cant be run in the global chat!`
        //PublicClient.channels.cache.get("829391850900160563").send(sendmessage)
PublicClient.channels.cache.get("829391681433894922").send(sendmessage)
PublicClient.channels.cache.get("829417082655473664").send(sendmessage)
PublicClient.channels.cache.get("829426107295858690").send(sendmessage)
//PublicClient.channels.cache.get("829419344659349557").send(sendmessage)
PublicClient.channels.cache.get("829436574223171675").send(sendmessage)
PublicClient.channels.cache.get("829454925846413322").send(sendmessage)
PublicClient.channels.cache.get("829474055367032832").send(sendmessage)
PublicClient.channels.cache.get("829670028545884160").send(sendmessage)
PublicClient.channels.cache.get("829991816441888798").send(sendmessage)
PublicClient.channels.cache.get("806502076262776912").send(sendmessage)
PublicClient.channels.cache.get("751550925893795973").send(sendmessage)
PublicClient.channels.cache.get("831106219045027850").send(sendmessage)
//PublicClient.channels.cache.get("830790419502596101").send(sendmessage)
//PublicClient.channels.cache.get("832024314671923252").send(sendmessage)
//PublicClient.channels.cache.get("834561611887935489").send(sendmessage)
//PublicClient.channels.cache.get("835289885148446750").send(sendmessage)
//PublicClient.channels.cache.get("835576305172742144").send(sendmessage)
PublicClient.channels.cache.get("835327878887505959").send(sendmessage)
PublicClient.channels.cache.get("847240923666055198").send(sendmessage)
return;
    }*/
    const args = message.content.slice(prefix2.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if(command == "verification" || command == "rank" || command == "info" || command == "blacklistinfo" || command == "partners" || command == "blacklist" || command == "unblacklist" || command == "gato") {
        guild = message.guild
        channel = message.channel
        PublicClient.commands.get(command).run(message, PublicClient, guild, channel, args)
    }

    if(command == "report") {
        PublicClient.channels.cache.get("829847554245656636").send(`${message.author.tag} (${message.author.id}) filed a report: ${message.content.slice(prefix2.length).slice(6)}.`)
    }
    if(command == "support") {
        const Embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('SUPPORT')
        .addFields(
        { name: 'Globus Network', value: `[Invite](https://discord.gg/gAhdDebHx6) The Bots Owner Group`, inline: true },
        )
        .setTimestamp()
    message.channel.send(Embed)
    }
    if(command == "staff") {
        tags = "";
    /*if(message.author.id == "540693411741696059") tags = "<:Verified:838105317509955644>"
    if(message.author.id == "676005930537582602" || message.author.id == "421725052623519745" || message.author.id == "827234085566152786") tags = "<:PhonePartner:829926018806579220>"
    if(message.author.id == "....") tags = "<:PhoneStaff:838105339010089050>"
    if(message.author.id == "743408362708008980") tags = "<:PhoneModerator:829952286842159134>"
    if(message.author.id == "560959879850754057") tags = "<:PhonePartner:829926018806579220>|<:PhoneModerator:829952286842159134>"
    if(message.author.id == "287981112909758465") tags = "<:PhoneManager:829952287010586654>"
    if(message.author.id == "395990735934980097") tags = "<:PhoneDeveloper:838104705413415032> "
    if(message.author.id == "632541244035301376") tags = "<:PhoneDeveloper:838104705413415032> **[Owner]**"
    */    const Embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('SUPPORT')
        .addFields(
        { name: 'Developers', value: `<:PhoneDeveloper:838104705413415032> **[Owner]** <@!632541244035301376> \|\| <:PhoneDeveloper:838104705413415032> <@!395990735934980097>`, inline: true },
        { name: 'Managers', value: `<:PhoneManager:829952287010586654> <@!287981112909758465>`, inline: true },
        { name: 'Moderators', value: `<:PhoneModerator:829954396031942726> <@!743408362708008980> \|\| <:PhoneModerator:829954396031942726> <@!560959879850754057>`, inline: true },
        { name: 'Staff', value: `<:PhoneStaff:838105339010089050
> **NILL**`, inline: true },
        { name: 'Partnership', value: `The <:PhonePartner:838222120349597696> is given to any **SERVER OWNER** or trusted user who uses the bot, it is not obtainable from manager+ (do not beg for this role, any server must have 20 human members)`, inline: true },
        { name: 'Verification', value: `The <:Verified:838105317509955644> is given to any high profile or trusted user, it is not obtainable for any other role`, inline: true },
        )
        .setTimestamp()
    message.channel.send(Embed)
    }

    if(command == "restart" || command == "shutdown") {
        if(message.author.id == "632541244035301376" || message.author.id == "287981112909758465") {
            message.reply("OK")
            if(command == "shutdown") sendmessage = `[SERVICE<:OfficialServer:838105080087183380>]  pebblehost <:Bot:838453677106790450>: SHUTTING DOWN BOT`
            if(command == "restart") sendmessage = `[SERVICE<:OfficialServer:838105080087183380>]  pebblehost <:Bot:838453677106790450>: RESTARTING BOT`
PublicClient.channels.cache.get("829391681433894922").send(sendmessage)
PublicClient.channels.cache.get("829417082655473664").send(sendmessage)
PublicClient.channels.cache.get("829426107295858690").send(sendmessage)
//PublicClient.channels.cache.get("829419344659349557").send(sendmessage)
PublicClient.channels.cache.get("829436574223171675").send(sendmessage)
PublicClient.channels.cache.get("829454925846413322").send(sendmessage)
PublicClient.channels.cache.get("829474055367032832").send(sendmessage)
PublicClient.channels.cache.get("829670028545884160").send(sendmessage)
PublicClient.channels.cache.get("829991816441888798").send(sendmessage)
PublicClient.channels.cache.get("806502076262776912").send(sendmessage)
PublicClient.channels.cache.get("751550925893795973").send(sendmessage)
//PublicClient.channels.cache.get("831106219045027850").send(sendmessage) replied no to RA
//PublicClient.channels.cache.get("830790419502596101").send(sendmessage)
//PublicClient.channels.cache.get("832024314671923252").send(sendmessage)
//PublicClient.channels.cache.get("834561611887935489").send(sendmessage)
//PublicClient.channels.cache.get("835289885148446750").send(sendmessage)
//PublicClient.channels.cache.get("835576305172742144").send(sendmessage)
PublicClient.channels.cache.get("835327878887505959").send(sendmessage)
PublicClient.channels.cache.get("847240923666055198").send(sendmessage)
    //831106219045027850
        }

    }
    if(command == "hosting"){
        const { guild, channel } = message
        
     PublicClient.commands.get("hosting").run(PublicClient, guild, channel, args)
    }
})

RevoltClient.on('message', async (message) => {
    const rchannels = config.RevoltChannels;
    if(message.author.isBot || !rchannels.includes(message.channel.id)) return;

    const dchannels = config.channels;

    const rcontent = `**@${message.author.username}:** ${message.content}`;
    const dcontent = `<:RevoltServer:936762503562661948> **@${message.author.username}:** ${message.content}`;

    for(const channel of rchannels) {
        RevoltClient.sendToChannel(channel, {content: rcontent});
    }

    for(const channelID of dchannels) {
        const channel = PublicClient.channels.cache.get(channelID) || await PublicClient.channels.fetch(channelID).catch((e) => {console.log(e);});

        if(channel) channel.send(dcontent).catch((e)=>{console.log(e)});
    }
})

PublicClient.login(config.token2);

function giveXp(message) {
    if(message.author.bot) return
    if(!config.channels.includes(message.channel.id)) return;
    db.add(`global_msg_all`, 1)
    db.add(`global_msg_${message.author.id}`, 1)
    //db.add(`global_xp_${message.author.id}`, 1)
    //var lvl = db.get(`global_lvl_${message.author.id}`) || 0
    //var xp = db.get(`global_xp_${message.author.id}`)
    //var needed = 50
    var messages = db.get(`global_msg_${message.author.id}`);
    level = Math.floor(message/100)
    if((messages % 100) === 0) {
        levelup(message.author, messages, message)
    }
}

function levelup(user, level, m) {
    if((level % 500) !== 0) {
        m.channel.send(`Congratulations to ${user.tag} for reaching ${level} messages`).catch((e)=>{console.log(e)});
        return;
    }
    custmsg = require("./cSnetMsg")
    custmsg.run(`Congratulations to ${user.tag} (${user.id}) for reaching the achivement ${level} messages`, PublicClient)
}