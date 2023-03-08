//Whois command
const users = require('../dataNew/users.json')

module.exports = {
  name: 'whois',
  description: 'Get info about a user',
  run: async (message, Client, guild, channel, args) => {
    if(args[0]) {
      if(isNaN(args[0])) user = message.mentions.users.first().id;
      else user = args[0];
    }
    if(!user) user = message.user.id;

    const member = await message.guild.members.fetch(user).catch((e) => {
      console.log(e);
      message.channel.send('Error, user not found');
    })

    if(!member) {
      message.channel.send('Error, user not found');
    }

    const userData = await getBadges(member)
  }
}

async function getBadges(user) {
  const out = []
  const out2 = []
  if(users.developers.includes(user.id)) {
    out.push('<:PhoneDeveloper:838104705413415032>')
  } if(users.srStaff.includes(user.id)) {
    out.push('<:SrPhoneStaff:853459931650195517>')
  } if(user.allStaff.includes(user.id)) {
    out.push('<:PhoneStaff:838105339010089050>')
    out2.push('STAFF')
  } if(users.partners.includes(user.id)) {
    out.push('<:PhonePartner:838222120349597696>')
  }
}