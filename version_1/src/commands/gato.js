const gato = {
  imageURLs: ["https://cdn.discordapp.com/attachments/616743046570049542/881561655350263808/20210815_210902.jpg", "https://cdn.discordapp.com/attachments/616743046570049542/886032529226887198/20210905_111940.jpg", "https://cdn.discordapp.com/attachments/616743046570049542/882785399636901958/20210902_083347.jpg", "https://cdn.discordapp.com/attachments/833722167249731626/881701833637244978/20210310_154701.jpg", "https://cdn.discordapp.com/attachments/833722167249731626/881701833960226836/20210828_083600.jpg", "https://cdn.discordapp.com/attachments/833722167249731626/881701858660474930/IMG_20210829_095342_521.jpg", "https://cdn.discordapp.com/attachments/833722167249731626/881701859067314276/20210829_215825.jpg", "https://cdn.discordapp.com/attachments/833722167249731626/881701935403642991/20210828_071247.jpg", "https://cdn.discordapp.com/attachments/833722167249731626/881701936011821098/20210828_071300.jpg", "https://cdn.discordapp.com/attachments/833722167249731626/881701989753430047/20210824_203436.jpg", "https://cdn.discordapp.com/attachments/833722167249731626/881701990340624394/20210824_204550.jpg", "https://cdn.discordapp.com/attachments/833722167249731626/881702036771586048/20210818_200203.jpg", "https://cdn.discordapp.com/attachments/616743046570049542/881561387388776448/20210818_195942.jpg", "https://cdn.discordapp.com/attachments/616743046570049542/881561386772222023/20210818_195945.jpg", "https://cdn.discordapp.com/attachments/616743046570049542/881561335597506610/20210824_204546.jpg", "https://cdn.discordapp.com/attachments/616743046570049542/881561335094206474/20210824_204602.jpg", "https://cdn.discordapp.com/attachments/616743046570049542/881561211370635274/gatoinabag.jpg", "https://cdn.discordapp.com/attachments/616743046570049542/881561206471675944/gatofull.png", "https://cdn.discordapp.com/attachments/616743046570049542/881561178239823912/gatoyum.png", "https://cdn.discordapp.com/attachments/616743046570049542/881561170773942382/gatoREEEEEE.jpg", "https://cdn.discordapp.com/attachments/616743046570049542/881561155968073808/gatoplead.png", "https://cdn.discordapp.com/attachments/616743046570049542/881561148208586832/gatopfpliveaction.png", "https://cdn.discordapp.com/attachments/616743046570049542/881561144798617671/gatopfp.png", "https://cdn.discordapp.com/attachments/616743046570049542/881561114217967696/gato.png", "https://cdn.discordapp.com/attachments/616743046570049542/881561094341148750/20210310_154701.jpg", "https://cdn.discordapp.com/attachments/616743046570049542/881561035562168360/20210829_220524.jpg", "https://cdn.discordapp.com/attachments/616743046570049542/881561035079835668/20210829_220251.jpg", "https://cdn.discordapp.com/attachments/833722167249731626/881702037467852870/20210818_200146.jpg", "https://cdn.discordapp.com/attachments/833722167249731626/881702110494879754/20210824_204602.jpg", "https://cdn.discordapp.com/attachments/798908485320048660/901862798517227570/20211024_193143.jpg", "https://cdn.discordapp.com/attachments/798908485320048660/901862799075082350/20211024_193102.jpg", "https://cdn.discordapp.com/attachments/798908485320048660/901862799750352966/20211024_144052.jpg"]
}
const users = require('../dataNew/users.json')
custmsg = require("../cSnetMsg")
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

async function getGatoImage() {
  n = await randomIntFromInterval(0, gato.imageURLs.length-1)
  out = gato.imageURLs[n]
  return out
}

module.exports = { 
    name: 'gato',
    run: async (message, Client, guild, channel, args) => {
        if(args[0]) {
          globalReq = await globalRequest(args, message.author.id)
        } else {
          globalReq = false
        }

        const imageURL = await getGatoImage()

        if(!globalReq) {
          message.channel.send(imageURL).catch(async (e) => {
            console.log(e)
            imageURL2 = await getGatoImage()
            message.channel.send(imageURL2)
          })
        } else if(globalReq) {
          custmsg.run(`**[ADMIN <:OfficialServer:838105080087183380>] ServerNet<:Bot:838453677106790450>:** ${message.author.tag} shared a gato picture! ${imageURL}`, Client)
          message.reply('Done <3')
        }
    }
}

async function globalRequest(a,b) {
  for(i=0;i<a.length;i++) {
    if(a[i].includes('-g')) {
      if(users.allStaff.includes(b)) return true
      else return false
    }

    if(i==a.length-1) {
      return false
    }
  }
}