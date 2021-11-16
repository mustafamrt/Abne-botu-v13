const Discord = require("discord.js");
const db = require("nrc.db");
const ayarlar = require("../ayarlar.json")
const ms = require("ms")
const { MessageActionRow, MessageButton, MessageEmbed, ButtonInteraction } = require('discord.js');


module.exports = {
    calistir: async(client, message, args) => {




        let abone = db.fetch(`abonerolü_${message.guild.id}`)
        let yetkili = db.fetch(`aboneyetkilisi_${message.guild.id}`)
        if(!abone) return message.channel.send("Abone Rolü Ayarlanmamış.")
        if(!yetkili) return message.channel.send("Abone Yetkilisi Rolü Ayarlanmamış.")
        
       if(!message.member.roles.cache.has(db.fetch(`aboneyetkilisi_${message.guild.id}`))) {
          return message.channel.send("Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin!");
       }

      
        let user = message.mentions.members.first()
         if (!user) return message.channel.send('Kime Rol Verceğimi Yazmadın!').catch(console.error);

         if (user.roles.cache.has(db.fetch(`abonerolü_${message.guild.id}`))) return message.channel.send("Bu Kullanıcıda Zaten Abone Rolü Var!")
       
         if(db.has(`rolalmısmı${user.id}.${message.guild.id}`)) return message.channel.send("Bu kullanıcı Eskiden Rol Almış Tekrardan Veremem Ne Yazıkki.")




         const row = new MessageActionRow()
         .addComponents(
             new MessageButton()
                 .setCustomId('evet')
                 .setLabel('Onayla')
                 .setStyle('SUCCESS'),

                 new MessageButton()
                 .setCustomId('hayır')
                 .setLabel('İptal Et')
                 .setStyle('DANGER'),
         );

     await message.reply({ content: `${user}, isimli kişiye rol vermek istiyorsan onayla.`,ephemeral: true, components: [row]  }).then(async function(mesaj) {


         

 
         setTimeout(async () => {
             let ttest = db.fetch(`hesapsilt_${message.author.id}_${mesaj.id}`)

             if (ttest) { db.delete(`hesapsilt_${message.author.id}_${mesaj.id}`)}
             mesaj.delete()
         }, ms('1m'));

         db.set(`hesapsilt_${message.author.id}_${mesaj.id}`,true)

  mesaj.createMessageComponentCollector(user => user.clicker.user.id == message.author.id).on('collect', async (button, interaction) => {






let test = db.fetch(`hesapsilt_${button.user.id}_${mesaj.id}`)

if (!test) return button.reply({content: `${button.user}, Bu komudu sadece sahibi kullanabilir & Tek kullanımlık komut`,ephemeral: true})





if (!button.isButton()) return console.log(interaction);


if(button.customId === "evet") {
db.delete(`hesapsilt_${button.user.id}_${mesaj.id}`)
 

if(db.has(`aboneistatistik${message.author.id}.${message.guild.id}`))
 db.add(`aboneistatistik${message.author.id}.${message.guild.id}`, 1)
else db.set(`aboneistatistik${message.author.id}.${message.guild.id}`, 1)
db.set(`rolalmısmı${user.id}.${message.guild.id}`, true)

let sayı = db.fetch(`aboneistatistik${message.author.id}.${message.guild.id}`)

user.roles.add(db.fetch(`abonerolü_${message.guild.id}`))
const embed = new Discord.MessageEmbed()
.setColor('#ff0000')
.setTimestamp()
.setFooter('Narcos Beta Abone Sistemi')
.setDescription('**Abone Rolü Verildi!**')
.addField(`Abone Rolü Alan Kullanıcı;`, `${user}`,true)
.addField(`Abone Rolü Veren Yetkili;`,`${message.author}`,true)
.addField("Verdiği Rol Sayısı:", `${sayı}` , true)
.setImage("https://cdn.glitch.me/2f9a3bcc-456b-4787-9a0f-e65e286ea42e%2Fstandard_28.gif")
button.reply({embeds: [embed]})
}



if(button.customId === "hayır") {
    db.delete(`hesapsilt_${button.user.id}_${mesaj.id}`)
     button.reply("Rol Verme İşlemi İptal Edildi")
    
    
    
    }




  })})

        




      
},

name: "abone",
description: "Abone Rolü Verirsin.",
aliases: ["a"],
kategori: "Abone",
usage: "",
}