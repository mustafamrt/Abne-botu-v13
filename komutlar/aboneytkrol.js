const Discord = require("discord.js");
const db = require("nrc.db")


module.exports = {
    calistir: async(client, message, args) => {


        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`   **Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.**`);


        let aboneyetkilisi = message.mentions.roles.first()
        if (!aboneyetkilisi) return message.channel.send('Lütfen Abone Yetkili rolünü etiketlermisin?')
         
        db.set(`aboneyetkilisi_${message.guild.id}`, aboneyetkilisi.id)
        message.channel.send(`Abone Yetkili Rolü Başarıyla Ayarlandı; **${aboneyetkilisi}**`)

},

name: "abone-ytk-rol",
description: "",
aliases: [],
kategori: "",
usage: "",
}