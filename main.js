const Discord = require('discord.js');
const client = new Discord.Client()
const settings = require("./settings.json");
var keys = {}
var InvulsCode = false
var InvulsCodeChannel = null
var intervals = []
var prefix = "ib!"

client.on('ready',() => {
let statusArray = [
        `${settings.botPREFIX}help | ${client.guilds.size} serveurs!`,
        `${settings.botPREFIX}help | ${client.channels.size} channels!`,
        `${settings.botPREFIX}help | ${client.users.size} users!`
    ];

    setInterval(function() {
        client.user.setActivity(`${statusArray[~~(Math.random() * statusArray.length)]}`, { type: settings.statusTYPE });
    }, 2700);
});

function sleep(milliSeconds) {
  var startTime = new Date().getTime();
  while (new Date().getTime() < startTime + milliSeconds);
}



    client.on('ready', function () {
      console.log('Loading.')
      sleep(1000)
      console.log('Loading..')
      sleep(1000)
      console.log('Loading...')
      sleep(1000)
      console.log(`Le bot a bien démarré avec ${client.users.size} users, dans ${client.channels.size} channels de ${client.guilds.size} serveurs.`)
    });



    client.on("message", async message => {
            
 client.on('guildMemberAdd', member => {
      message.guild.channels.get('512076563831848993').send({embed: {
color: 3447003,
author: {
  name: member.user.username,
 icon_url: member.user.avatarURL
},
title: "Bienvenue à toi nouvel arrivant !",
description: `__**Le serveur contient actuellement ${message.guild.members.size} membres !**__`,
fields: [{
    name: "Passe un bon moment sur le serveur",
  value: "Si tu as des questions n'hésite pas !",
  },
],
timestamp: new Date(),
footer: {
  icon_url: client.user.avatarURL,
  text: "© InVulsBot"
}
}}); });
   if (message.content.includes("https://")) {
      if (message.channel.id ===  '481194800133963785') return
      if (message.channel.id ===  '481194647323017236') return
      if (message.channel.id === '481194913426440193') return
      if (message.channel.id === '504292270267432970') return
      if (message.channel.id === '510940943529148466') return
      if (message.channel.id === '446340864097386514') return
      if (message.channel.id === '453618776722898954') return
      if (message.channel.id === '453620293500665866') return
      if (message.channel.id === '506260233824501787') return
      if (message.channel.id === '453612425627828225') return
      if (message.channel.id === '506261189827887105') return
      if (message.channel.id === '496017240408326174') return
      if (message.channel.id === '476790468261445662') return
      if (message.channel.id === '496041349070585866') return
      if (message.channel.id === '496041391063957504') return
      if (message.channel.id === '496044995975839759') return
      if (message.channel.id === '502403143796260864') return
    console.log("Supprimé " + message.content + " par" + message.author)
      message.delete(1);
      message.channel.sendMessage("Aucun lien ici, " + message.author)
    }
    if (message.content.includes("http://")) {
           if (message.channel.id ===  '481194800133963785') return
      if (message.channel.id ===  '481194647323017236') return
      if (message.channel.id === '481194913426440193') return
      if (message.channel.id === '504292270267432970') return
      if (message.channel.id === '510940943529148466') return
      if (message.channel.id === '446340864097386514') return
      if (message.channel.id === '453618776722898954') return
      if (message.channel.id === '453620293500665866') return
      if (message.channel.id === '506260233824501787') return
      if (message.channel.id === '453612425627828225') return
      if (message.channel.id === '506261189827887105') return
      if (message.channel.id === '496017240408326174') return
      if (message.channel.id === '476790468261445662') return
      if (message.channel.id === '496041349070585866') return
      if (message.channel.id === '496041391063957504') return
      if (message.channel.id === '496044995975839759') return
      if (message.channel.id === '502403143796260864') return
     console.log("Supprimé" + message.content + " par " + message.author)
      message.delete(1);
      message.channel.sendMessage("Aucun lien ici, " + message.author)
    }
    if (message.content.includes("www.")) {
      if (message.channel.id ===  '481194800133963785') return
      if (message.channel.id ===  '481194647323017236') return
      if (message.channel.id === '481194913426440193') return
      if (message.channel.id === '504292270267432970') return
      if (message.channel.id === '510940943529148466') return
      if (message.channel.id === '446340864097386514') return
      if (message.channel.id === '453618776722898954') return
      if (message.channel.id === '453620293500665866') return
      if (message.channel.id === '506260233824501787') return
      if (message.channel.id === '453612425627828225') return
      if (message.channel.id === '506261189827887105') return
      if (message.channel.id === '496017240408326174') return
      if (message.channel.id === '476790468261445662') return
      if (message.channel.id === '496041349070585866') return
      if (message.channel.id === '496041391063957504') return
      if (message.channel.id === '496044995975839759') return
      if (message.channel.id === '502403143796260864') return
      console.log("Supprimé " + message.content + " par " + message.author)
      message.delete(1);
      message.channel.sendMessage("Aucun lien ici, " + message.author)
    }

      if(message.content.startsWith(prefix+"exit")){
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");
        for(var i=0; i<intervals.length; i++){
          clearInterval(intervals[i])
        }
        setTimeout(function(){
          console.log('Bot déconnecté.')
          client.destroy()
        },0*0*0)
      }
   
  var args = message.content.substring(prefix.length).split(" ");
  

      // début commande mod
 if(message.content.startsWith(prefix + "clear")) {
      message.delete();
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");

        let args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.send("Tu dois préciser un nombre de messages à supprimer !")
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`${args[0]} messages ont été supprimés !`);
              var clear_embed = new Discord.RichEmbed()
              .setColor("#40A497")
              .setTitle("Clear :")
              .addField("Messages supprimés:", `${args[0]}`)
              .addField("Dans le salon :", `${message.channel.name}`)
              .addField("Modérateur :", `${message.author.username}`)
              message.guild.channels.find('name', 'logs').send(clear_embed)
              console.log("Un modo a supprimé des messages !")
          });
    }

  if(message.content.startsWith(prefix + "ban")) {
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez mentionner un utilisateur");
        }

        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) {
            return message.channel.send("Je ne sais pas si l'utilisateur existe");
        }

        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permission pour ban");
        }
         ban.ban().then(member => {
          var ban_embed = new Discord.RichEmbed()
          .setColor("#e74c3c")
          .setTitle("Ban :")
          .addField("Membre banni:", `${member.user.username}`)
          .addField("ID :", `${member.user.id}`)
          .addField("Modérateur :", `${message.author.username}`)
          message.guild.channels.find('name', 'logs').send(ban_embed)
          console.log("Un utilisateur a été ban !")
      });
      
  }
if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");

        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur !');
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} est mute !`);
            var mute_embed = new Discord.RichEmbed()
            .setColor("#ff6600")
            .setTitle("Mute :")
            .addField("Membre muté:", `${mute.user.username}`)
            .addField("ID :", `${mute.user.id}`)
            .addField("Modérateur :", `${message.author.username}`)
            message.guild.channels.find('name', 'logs').send(mute_embed)
            console.log("Un utilisateur a été mute !")
        });
    }

    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");

        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur !');
        }

        var unmute = message.guild.member(message.mentions.users.first());
        if(!unmute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(unmute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${unmute.user.username} n'est plus mute !`);
            var unmute_embed = new Discord.RichEmbed()
            .setColor("#1CFF1C")
            .setTitle("Unmute :")
            .addField("Membre unmute:", `${unmute.user.username}`)
            .addField("ID :", `${unmute.user.id}`)
            .addField("Modérateur :", `${message.author.username}`)
            message.guild.channels.find('name', 'logs').send(unmute_embed)
            console.log("Un utilisateur a été unmute !")
        });
    }


      if(message.content === prefix + "8ball") {
      if (!args[0]) return message.reply("Usage: -8ball [question]");
      let question = args.slice(22).join(' '); 
      let color = ""
      let replies = ['Oui', 'Non', 'Demandez la moi plus tard'];
      let result = Math.floor((Math.random() * replies.length));
  
      if (replies[result] === 'Oui') color = "#00FF00";
      if (replies[result] === 'Non') color = "#FF0000";
      if (replies[result] === 'Demandez la moi plus tard') color = "#0000FF";
  
      let newembed = new Discord.RichEmbed()
          .setAuthor(question)
          .setColor(color)
          .setDescription(`Demandé par: ${message.author}\nRésultat: ${replies[result]}`);
  
      message.delete().catch(O_o => {});
      message.channel.send({
          embed: newembed
      })
    }

  var fs = require('fs');
 
let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));
 
if (message.content.startsWith(prefix + "warn")){
 
if (message.channel.type === "dm") return;
 
var mentionned = message.mentions.users.first();
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
if(message.mentions.users.size === 0) {
 
  return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");
 
}else{
 
    const args = message.content.split(' ').slice(1);
 
    const mentioned = message.mentions.users.first();
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          if (args.slice(1).length != 0) {
 
            const date = new Date().toUTCString();
 
            if (warns[message.guild.id] === undefined)
 
              warns[message.guild.id] = {};
 
            if (warns[message.guild.id][mentioned.id] === undefined)
 
              warns[message.guild.id][mentioned.id] = {};
 
            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;
 
            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){
 
              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};
 
            } else {
 
              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
 
                time: date,
 
                user: message.author.id};
 
            }
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            message.delete();
            let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            let reason = args.slice(2).join(' ');
 
            message.channel.send(':warning: | **'+mentionned.tag+' a été averti**');

 
            message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))
 
          } else {
 
            message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
        }
 
      } else {
 
        message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
 
}
 
 
 
  if (message.content.startsWith(prefix+"seewarns")||message.content===prefix+"seewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
    const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size !== 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          try {
 
            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
              return;
 
            }
 
          } catch (err) {
 
            message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
            return;
 
          }
 
          let arr = [];
 
          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");
 
          for (var warn in warns[message.guild.id][mentioned.id]) {
 
            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+
 
            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");
 
          }
 
          message.channel.send(arr.join('\n'));
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
 
          console.log(args);
 
        }
 
      } else {
 
        message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
 
 
 
 
 
  if (message.content.startsWith(prefix+"deletewarns")||message.content===prefix+"deletewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
   const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    const arg2 = Number(args[1]);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
 
          if (!isNaN(arg2)) {
 
            if (warns[message.guild.id][mentioned.id] === undefined) {
 
              message.channel.send(mentioned.tag+" n'a aucun warn");
 
              return;
 
            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
 
              message.channel.send("**:x: Ce warn n'existe pas**");
 
              return;
 
            }
 
            delete warns[message.guild.id][mentioned.id][arg2];
 
            var i = 1;
 
            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){
 
              var val=warns[message.guild.id][mentioned.id][key];
 
              delete warns[message.guild.id][mentioned.id][key];
 
              key = i;
 
              warns[message.guild.id][mentioned.id][key]=val;
 
              i++;
 
            });
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              delete warns[message.guild.id][mentioned.id];
 
            }
 
            message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès!`);
 
            return;
 
          } if (args[1] === "tout") {
 
            delete warns[message.guild.id][mentioned.id];
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès!`);
 
            return;
 
          } else {
 
            message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
 
        }
 
      } else {
 
       message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }   

  if(message.content.startsWith(prefix + "kick")) {
      if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas la permission");
  
      if(message.mentions.users.size === 0) {
          return message.channel.send("Vous devez mentionner un utilisateur");
      }

      if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
          return message.channel.send("Je n'ai pas la permission pour kick !");
      }
      var kick = message.guild.member(message.mentions.users.first());
      kick.kick().then(member => {
          var kick_embed = new Discord.RichEmbed()
          .setColor("#40A497")
          .setTitle("Kick :")
          .addField("Membre kick:", `${member.user.username}`)
          .addField("ID :", `${member.user.id}`)
          .addField("Modérateur :", `${message.author.username}`)
          message.guild.channels.find('name', 'logs').send(kick_embed)
          console.log("Un utilisateur a été kick !")
      });
    }
    if (message.content.startsWith(prefix + "sondage")) {
      if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Tu n'as pas la permission !")
      message.delete();
      
      let args = message.content.split(" ").slice(1);
    
      if(!args) return message.channel.send("Tu dois poser une question !")
    
      var sond_embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle("Sondage, veuillez répondre qu'une seule fois !")
      .setDescription(`Sondage de : ${message.author.username}`)
      .addField('Question :', `${args}`)
      .setThumbnail("https://cdn.discordapp.com/attachments/482179956743602197/486860823055302657/Sondage4.png")
      message.guild.channels.get("506163112043479050").send(sond_embed).then(function(message){
        message.react("✅")
          message.react("❌")
          console.log("Un admin veut l'avis des membres !");
      })
    }

    
 //fin commande mod

  switch (args[0].toLowerCase()) {

  case "report":


  let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let reason = args.slice(2).join(' ');
  let reports = message.guild.channels.find('name', 'reports');

  if (!target) return message.channel.send('`Veuillez spécifier un membre.`');
  if (!reason) return message.channel.send('`Veuillez spécifiez un raison de votre report.`');
  if (!reports) return message.channel.send('`Veuillez créer un channel nommé reports.`');

  let reportembed = new Discord.RichEmbed()
      .setColor('#FF6600')
      .setThumbnail(target.user.avatarURL)
      .setAuthor('Report', 'https://cdn.discordapp.com/emojis/465245981613621259.png?v=1')
      .setDescription(`Nouveau report par ${message.author.username}`)
      .addField('⚠ - Membre report', `${target.user.tag}\n(${target.user.id})`, true)
      .addField('⚠ - Personne qui a fait le report', `${message.author.tag}\n(${message.author.id})`, true)
      .addField('⚙ - Channel', `${message.channel}`)
      .addField('🔨 - Raison', `${reason}`)
      .addField(`Heure :`, message.createdAt.toLocaleTimeString())
      .setFooter(`message par LaikiaBot `)
      .setTimestamp();

  reports.send(reportembed);

  message.channel.send(`**${target}** a été report par **${message.author}** [ ${reason} ]`).then(message => message.delete(5000));
  break;
  }

  if (message.content.startsWith(prefix + "say")) {
      
    let args = message.content.slice(prefix.length).trim().split(/ +/g).slice(1).join(" ")
    message.delete();
  
    if(!args) return message.channel.send("Tu dois me dire quelque chose !")
    if(message.mentions.everyone || message.mentions.users.size === 1) return message.channel.send('Ne mentionne pas via cette commande ! :rage:')
  
    message.channel.send(`${args}`);
  }
   
        if(message.content === prefix + "ping") {
          const m = message.channel.send("Ping?");
          m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
        }
        if (message.content === prefix + 'help') {
          let helpEmbed = new Discord.RichEmbed()
            .setDescription("Toutes les commandes")
            .setColor('RANDOM')
            .addField("ib!help", "Affiche ce message")
            .addField("ib!help-mod", "Affiche les commandes d'administration/modération")
            .addField("ib!server", "Affiche quelques informations sur le serveur")
            .addField("ib!avatar", "Affiche votre avatar")
            .addField("ib!bot", "Crédits du bot")
            .addField("ib!report", "Sert à report un membre du serveur")
            .addField("ib!say (message)", "Fait parler le bot")
            .addField("ib!aide", "Sert à créer une demande d'aide au staff")
            .addField("ib!userstats", "Affiche les informations de votre compte")
            .addField("ib!suggestion", "Avec cette commande, vous pouvez donné une suggestion au staff")
            .addField("ib!coinflip (votre choix)", "Pile ou face ?")
            .addField("ib!calin", "Le bot vous donne un calin")
            .setFooter('InVuls Bot')
            .setTimestamp()
          message.channel.send(helpEmbed)
          console.log("////////////////////////////////////")
          console.log("La commande 'ib!help' a été éfféctué !")
          console.log("////////////////////////////////////")
      
        }
        if (message.content === prefix + 'help-mod') {
          let helpmodEmbed = new Discord.RichEmbed()
            .setColor("#6999FF", "#FFFFFF","#ff6600")
            .setDescription("__**Commande pour le staff**__", ':shield:')
            .addField("ib!warn (utilisateur + raison)", "Permet d'avertir un utilisateur")
            .addField("ib!seewarns(utilisateur)", "Permet de voir combien d'avertissements a la personne mentionnée")
            .addField("ib!deletewarns(utilisateur + numero du warn)", "Permet d'enlever l'avertissement correspondant au numéro indiqué.")
            .addField("ib!kick (utilisateur)", "Permet de kick un utilisateur")
            .addField("ib!ban (utilisateur)", "Permet de ban un utilisateur")
            .addField("ib!mute (utilisateur)", "Permet de mute un utilisateur")
            .addField("ib!unmute (utilisateur)", "Permet d'unmute un utilisateur")
            .addField("ib!clear (nombre de message que vous voulez enlever)", "Permet de clear un certain nombre de message")
            .addField("ib!sondage", "Sert à créer un sondage")
            .addField("ib!annonce", "Sert à passer une annonce via le bot dans le channel annonce")
            .setTimestamp()
          message.channel.send(helpmodEmbed)
          console.log("////////////////////////////////////")
          console.log("La commande 'ib!help-mod' a été éfféctué !")
          console.log("////////////////////////////////////")
      
        }
        if(message.content === prefix + "server") {

          var info_embed = new Discord.RichEmbed()
          .setColor('RANDOM')
          .setTitle(`Voici les informations sur le serveur !`)
          .addField("Nom :", message.guild.name)
          .addField("Acronyme :", message.guild.nameAcronym)
          .addField("Nombre de membres", message.guild.members.size)
          .addField("Nombre de catégories et de salons", message.guild.channels.size)
          .addField("Date de création du serveur :", message.guild.createdAt.toDateString())
          .addField(`Date de venue sur ${message.guild.name} :`, message.guild.member(message.author).joinedAt.toDateString()) 
          .setThumbnail(message.guild.iconURL)
          .setFooter("Infos - serveur")
          message.channel.send(info_embed)
          console.log("Un utilisateur a effectué la commande d'info - serveur !")
        }

       
if(message.content === prefix + "bot") {

  var bot_embed = new Discord.RichEmbed()
  .setColor("#666666")
  .setTitle("Voici les informations sur moi !")
  .addField("Mon créateur :", "[Dev]Alex0754#0081")
  .addField("Nom :", `${client.user.username}`, true)
  .addField("Mon discriminateur :", `#${client.user.discriminator}`)
  .addField("ID :", `${client.user.id}`)
  .addField("Mon language de programmtion avec lequel j'ai été créer :", "Javascript")
  .addField("Nombre de serveurs sur lesquels je suis :", client.guilds.size)
  .addField("Nombre de personnes en ma compagnie :", client.users.size)
  .setTimestamp();
  message.channel.send(bot_embed)
  console.log("Un utilisateur a effectué la commande d'info - bot !")
}
        if (message.content === 'ib!avatar') {
          let avatarEmbed = new Discord.RichEmbed()
            .setAuthor("**Votre avatar**")
            .setColor("#00FFFF")
            .addField("Votre avatar")
            .setFooter("Invuls Bot")
            .setTimestamp()

          message.channel.send(avatarEmbed)
        }
        switch (args[0].toLowerCase()) {
          
          case "aide":
          let aide = message.guild.channels.find('name', 'aide');
          if (!aide) return message.channel.send('`Veuillez créer un channel nommé aide.`')
          let aideembed = new Discord.RichEmbed()
          .setColor('#ff6600')
          .addField(`${message.author.tag}`, "a besoin d'aide")
          .addField('⚙ - Channel', `${message.channel}`)
          aide.send(aideembed);
          message.channel.send("Votre demande d'aide a été envoyée aux membres du staff ! Merci de patientez...")
          break;
        }
        
   switch (args[0].toLowerCase()) { 

    case "userstats":

    var userCreateDate = message.author.createdAt.toString().split(" ");
    var msgauthor = message.author.id;

    var stats_embed = new Discord.RichEmbed()
    .setColor("#6699FF")
    .setTitle(`**Statistiques du joueur** :`, "** **")
    .addField("Pseudo :", message.author.username)
    .addField("Tag du joueur :", `#${message.author.discriminator}`)
    .addField(`ID du joueur :`, msgauthor, true)
    .addField(`Date d'inscription sur Discord :`, userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
    .setThumbnail(message.author.avatarURL)
    message.reply("Tu peux regarder tes messages privés !")
    message.author.send(stats_embed);

    break;
}

   if (message.content.startsWith(prefix + "suggestion")) {
        message.delete();
            
       let args = message.content.split(" ").slice(1);
      
        if(!args) return message.channel.send("Tu dois ajouter une suggestion !")
      
        var sug_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`Suggestion de : ${message.author.username}`)
        .addField('Suggestion :',`- ${args}`)
        .setTimestamp()
        message.guild.channels.get("506163112043479050").send(sug_embed)
        message.channel.send("Ta suggestion a bien été prise en compte !");
      }

     

      if(InvulsCode){
        let capté = message.content.trim().replace(' ','')
        if(capté.length === 3){
          if(keys.hasOwnProperty(capté)){
            keys[capté].push(message.member)
          }else{
            keys[capté] = [message.member] 
          }
        }
      }

       switch (args[0].toLowerCase()) { 

       case "coinflip":
        console.log(`${message.author.tag} à utilisé la commande ${settings.botPREFIX}coinflip !`);

        let answers = [
            'Pile',
            'Face'
        ];

        message.channel.send({embed: {
            color: 3447003,
            title: "Coinflip:",
            fields: [{
                name: "Résultat",
                value: `\`${answers[~~(Math.random() * answers.length)]}\``
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© InVulsBot"
            }
          }
        });
        break;
   
    }
     switch (args[0].toLowerCase()) { 
    case "calin":
        console.log(`${message.author.tag} à utilisé la commande ${settings.botPREFIX}calin !`);
            

        var hugs = [
            "`＼(^o^)／`",
            "`d=(´▽｀)=b`",
            "`⊂((・▽・))⊃`",
            "`⊂( ◜◒◝ )⊃`",
            "`⊂（♡⌂♡）⊃`",
            "`⊂(◉‿◉)つ`"
        ];
        message.reply(`${hugs[~~(Math.random() * hugs.length)]}`);
        break;

        }

  });

  client.login(process.env.TOKEN);
