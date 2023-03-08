const users = require('../dataNew/users.json')
const validTokens = ['-1', '-2', '-3', '-4', '-5', '-a', '-s']
const defaultTokens = {
    dataFormat: [3, false],
    exactData: {
        level: 3,
        alert: false
    }
}
const db = require('quick.db')
/*
Token usages
-<number> - set the level for the lock (default 3) (max: 4)
-u - Universal (default)
-g - guild only
-a - alert
-s - silent (default)
*/

module.exports = {
    name: 'lock',
    usage: '.!lock [tokens]',
    run: async (message, Client, guild, channel, args) => {
        if(!users.allStaff.includes(message.author.id)) {
            message.reply('I dont think you have permission to do that.');
            return;
        }

        if(args[0]) {
            tokens = await getTokens(a)
        } else {
            tokens = defaultTokens.dataFormat
        }

        //Token parser
        const level = tokens[0];
        const alert = tokens[1];

        db.set(`lockdown-active`, true)
        db.set(`lockdown-level`, level)

        if(alert) {
            const alertContacts = users.alertContacts;
            const guild = await client.guilds.fetch('784126280089337887');
            for(i=0;i<alertContacts.length;i++) {
                memberObj = await guild.members.fetch(alertContacts[i])
                userObj = memberObj.user

                userObj.send(`**SERVERNET MAJOR ALERT**\n\nSystem Lockdown\nLevel: ${level}\nActivated: <t:${Date.now()}> around <t:${Date.now()}:R>`)
            }
        }

        message.reply('Locked down')
    }
}

async function getTokens(a) {
    //Level, Alert?
    level = 0;
    alert = false;
    silent = false;

    for(i=0;i<getTokens.length;i++) {
        if(a[i].includes('-')) {
            b = a[i].toLowerCase
            //Level detection
            if(b == '-1' && 1>level) level = 1;
            if(b == '-2' && 2>level) level = 2;
            if(b == '-3' && 3>level) level = 3;
            if(b == '-4' && 4>level) level = 4;

            if(b == '-a' && !alert) alert = true;
            if(b == '-s' && !alert) silent = true;
        }

        if(i==a.length-1) {
            if(level === 0) {
                level = 3 //Default level
            }

            if(alert && silent) {alert = true; silent = false;}
            if(!alert && !silent) silent = true;

            data = [level, alert]
            return data;
        }
    }
}