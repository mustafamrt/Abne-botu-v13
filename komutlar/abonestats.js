const Discord = require(`discord.js`);
const db = require(`nrc.db`)
const { createBar } = require("nrc-bar");
const ayarlar = require("../ayarlar.json")


module.exports = {
    calistir: async(client, message, args) => {
      if(!message.member.roles.cache.has(db.fetch(`aboneyetkilisi_${message.guild.id}`))) {
        return message.channel.send("Bu Komutu Kullanabilmek İçin Abone Yetkilisi Rolüne Sahip Olman Gerekir!")
      }
        let kişi = message.mentions.users.first()
    if(!args[0]) {
        const abonestats = await db.fetch(`aboneistatistik${message.author.id}.${message.guild.id}`)
        const nrcembed = new Discord.MessageEmbed()
        .setThumbnail(message.author.avatarURL())
        .setTimestamp()
        .setFooter(`${message.author.tag} Tarafından İstendi.`)
        .setDescription(`**${message.author} İsimli Yetkilinin Toplam Kayıtı**
        **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
        **Toplam \`${abonestats ? abonestats : '0'}\` Abone Rolü Vermişsin.**
        **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
        message.channel.send({embeds: [nrcembed]})}
    if(kişi) {
        const abonestats2 = await db.fetch(`aboneistatistik${kişi.id}.${message.guild.id}`)
        const nrcembed1 = new Discord.MessageEmbed()
        .setAuthor(kişi.username, kişi.avatarURL)
        .setThumbnail(message.mentions.users.first().avatarURL())
        .setTimestamp()
        .setFooter(`${message.author.tag} Tarafından İstendi.`)
        .setDescription(`**Yetkilinin Bilgileri**
        **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
        **Toplam \`${abonestats2 ? abonestats2 : '0'}\` Abone Rolü Vermiş.**
        **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
        message.channel.send({embeds:[nrcembed1]})} 


 
 

},

name: "abonestats",
description: "Abone Coin Bilgilerine Bakarsın",
aliases: ["me"],
kategori: "abone",
usage: "",
}