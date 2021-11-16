const Discord = require("discord.js");
const db = require("nrc.db")
const ayarlar = require("../ayarlar.json")


module.exports = {
    calistir: async(client, message, args) => {



        const embed = new Discord.MessageEmbed()

        .setColor("BLUE")
        .setThumbnail('https://cdn.discordapp.com/attachments/875119709002023004/902569874080018432/narcos_beta_logo.png')
        .setFooter( "Narcos Beta V13", client.user.avatarURL())
        .setAuthor('Abone Sistemi', 'https://cdn.discordapp.com/attachments/875119709002023004/902569874080018432/narcos_beta_logo.png')
       
        .setDescription(`
       
       ╔═══════╣Narcos Beta╠══════════
       ║
       ${client.commands
       
         .filter(cmds => cmds.kategori == "abone")
       
         .map(komut => `║ <:880072774041878609:881951010057240626> **${ayarlar.prefix}${komut.name}** = ${komut.description || "**Açıklama Eklenmemiş**"}`)
       
         .join('\n')}
       ║
       ╠═══════════════════════════
       ║
       ║⎾[Davet Linki](https://discord.com/oauth2/authorize?client_id=645226005144797184&scope=bot&permissions=8)⏌ ⎾[Destek Sunucusu](https://discord.gg/kbwQU6gJCF)⏌
       ║
       ╚══════════════════════════`)
       .setImage(ayarlar.banner)
       .setTimestamp()
         
        
       
       message.channel.send({embeds: [embed]}) 
       

},

name: "aboneyardım",
description: "",
aliases: [],
kategori: "yardım",
usage: "",
}