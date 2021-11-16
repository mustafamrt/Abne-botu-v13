const Discord = require("discord.js");
const db = require("nrc.db");
const ayarlar = require("../ayarlar.json")



module.exports = {
    calistir: async(client, message, args) => {


        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`   **Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.**`);





        let abonerol = message.mentions.roles.first()
        if (!abonerol) return message.channel.send('Lütfen Abone rolünü etiketlermisin?')
         
        db.set(`abonerolü_${message.guild.id}`, abonerol.id)
        message.channel.send(`Abone Rolü Başarıyla Ayarlandı; **${abonerol}**`)
},

name: "abone-rol",
description: "Abone Rolü Verirsin.",
aliases: ["a"],
kategori: "Abone",
usage: "",
}