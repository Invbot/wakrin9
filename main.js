const Discord = require('discord.js');
const bot = new Discord.Client()
const settings = require("./settings.json");
var keys = {}
var InvulsCode = false
var InvulsCodeChannel = null
var intervals = []
var prefix = "ib!"

bot.on('ready',() => {
let statusArray = [
        `${settings.botPREFIX}help | ${bot.guilds.size} serveurs!`,
        `${settings.botPREFIX}help | ${bot.channels.size} channels!`,
        `${settings.botPREFIX}help | ${bot.users.size} users!`
    ];

    setInterval(function() {
        bot.user.setActivity(`${statusArray[~~(Math.random() * statusArray.length)]}`, { type: settings.statusTYPE });
    }, 2700);
});

function sleep(milliSeconds) {
  var startTime = new Date().getTime();
  while (new Date().getTime() < startTime + milliSeconds);
}

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}


bot.on("guildMemberAdd", function(member) {
        const embed = new Discord.RichEmbed()
        .setTitle("Nouvel arrivant :")
        .setColor('RANDOM')
        .setDescription(`__Bienvenue à ${member.user.username}__\n**Grâce à toi, nous sommes actuellement ${member.guild.memberCount}**`)
        .addField(`InVuls E-Sport / Communauté - :flag_fr:`, "Passe un bon moment sur le serveur")
        .setFooter(`© InVulsBot`, "https://images-ext-2.discordapp.net/external/QELomkRUVhZuLIDbQI6220WSAhRAwnD0Dg-igmd02to/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/493471628043354133/ab0970c55a68235387ab2695d825b6f9.png")
        .setTimestamp();
        member.guild.channels.get('351629980570091531').send(embed);
        });

    bot.on('ready', function () {
  console.log("----------------------------------------")
  console.log("                BOT PAGE                ")
  console.log("             BOT MAINTENANT ACTIF             ")
  console.log("----------------------------------------")
  console.log("Bonne utilisation...               ")
  console.log("----------------------------------------")
      console.log(`Le bot a bien démarré avec ${bot.users.size} users, dans ${bot.channels.size} channels de ${bot.guilds.size} serveurs.`)
    });
        
    bot.on("message", (message) => {

            
 
 const args = message.content.substring(prefix.length).split(" ");
        
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
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Tu n'as pas la permission !");
        for(var i=0; i<intervals.length; i++){
          clearInterval(intervals[i])
        }
        setTimeout(function(){
          console.log('Bot déconnecté.')
          bot.destroy()
        },0*0*0)
      }
   

  

      // début commande mod
 if(message.content.startsWith(prefix + "clear")) {
      message.delete();
         if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send("Vous n'avez pas la permission !");

        let args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.send("Tu dois préciser un nombre de messages à supprimer !")
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`${args[0]} messages ont été supprimés !`);
              var clear_embed = new Discord.RichEmbed()
              .setColor("#0000FF")
              .setTitle("Clear :")
              .addField("Messages supprimés:", `${args[0]}`)
              .addField("Dans le salon :", `${message.channel.name}`)
              .addField("Modérateur :", `${message.author.username}`)
              message.guild.channels.get('513769366777495581').send(clear_embed);
              console.log("Un modo a supprimé des messages !")
          });
    }

  if(message.content.startsWith(prefix + "ban")) {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Tu n'as pas la permission !");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez mentionner un utilisateur");
        }

        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) {
            return message.channel.send("Je ne sais pas si l'utilisateur existe");
        }

        if(!message.guild.member(bot.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permission pour ban");
        }
         ban.ban().then(member => {
          var ban_embed = new Discord.RichEmbed()
          .setColor("#FF0000")
          .setTitle("Ban :")
          .addField("Membre banni:", `${member.user.username}`)
          .addField("ID :", `${member.user.id}`)
          .addField("Modérateur :", `${message.author.username}`)
          message.guild.channels.get('513769366777495581').send(ban_embed);
          console.log("Un utilisateur a été ban !")
      });
      
  }  
if(message.content.startsWith(prefix + "mute")) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous n'avez pas la permission !");

        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur !');
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
        }

        if(!message.guild.member(bot.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} est mute !`);
            var mute_embed = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setTitle("Mute :")
            .addField("Membre muté:", `${mute.user.username}`)
            .addField("ID :", `${mute.user.id}`)
            .addField("Modérateur :", `${message.author.username}`)
            message.guild.channels.get('513769366777495581').send(ban_embed);
            console.log("Un utilisateur a été mute !")
        });
    }

    if(message.content.startsWith(prefix + "unmute")) {
         if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Tu n'as pas la permission !");

        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur !');
        }

        var unmute = message.guild.member(message.mentions.users.first());
        if(!unmute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
        }

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(unmute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${unmute.user.username} n'est plus mute !`);
            var unmute_embed = new Discord.RichEmbed()
            .setColor("#00FF00")
            .setTitle("Unmute :")
            .addField("Membre unmute:", `${unmute.user.username}`)
            .addField("ID :", `${unmute.user.id}`)
            .addField("Modérateur :", `${message.author.username}`)
            message.guild.channels.find('name', 'logs').send(unmute_embed)
            console.log("Un utilisateur a été unmute !")
        });
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

      if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
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
     if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Tu n'as pas la permission !");
      message.delete();
      let reason = args.slice(2).join(' ');
    
      if(!reason) return message.channel.send("Tu dois poser une question !")
    
      var sond_embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle("Sondage, veuillez répondre qu'une seule fois !")
      .setDescription(`@everyone\nSondage de : ${message.author.username}`)
      .addField("Question :", `- ${reason}`)
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
          m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
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
          console.log("//////////////////////////////////////")
          console.log("La commande 'ib!help-ticket' a été éfféctué !")
          console.log("//////////////////////////////////////")
      
        }
            
         if (message.content === prefix + 'help-ticket') {
          let helpEmbed = new Discord.RichEmbed()
            .setDescription("Toutes les commandes")
            .setColor('RANDOM')
            .addField("ib!new", "**Cette commande permet de créer un channel pour votre ticket**.\n__suite à la création du channel, vous devez expliquer la raison du ticket.__")
            .addField("ib!close/ib!confirmer", "Quand votre ticket est résolu, faites la commande ```ib!close``` puis ```ib!confirmer``` ")
            .setFooter('InVuls Bot')
            .setTimestamp()
          message.channel.send(helpEmbed)
          console.log("//////////////////////////////////////")
          console.log("La commande 'ib!help' a été éfféctué !")
          console.log("//////////////////////////////////////")
      
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
  .addField("Nom :", `${bot.user.username}`, true)
  .addField("Mon discriminateur :", `#${bot.user.discriminator}`)
  .addField("ID :", `${bot.user.id}`)
  .addField("Mon language de programmtion avec lequel j'ai été créer :", "Javascript")
  .addField("Nombre de serveurs sur lesquels je suis :", bot.guilds.size)
  .addField("Nombre de personnes en ma compagnie :", bot.users.size)
  .setTimestamp();
  message.channel.send(bot_embed)
  console.log("Un utilisateur a effectué la commande d'info - bot !")
}
        if (message.content === 'ib!avatar') {
        message.reply(message.author.avatarURL)
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
        message.guild.channels.get("481590373156651008").send(sug_embed)
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
              icon_url: bot.user.avatarURL,
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
            
            if (message.content.toLowerCase().startsWith(prefix + `new`)) {
    const reason = message.content.split(" ").slice(1).join(" ");
    if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`:thinking: Le serveur n'a pas de rôle \`Support Team\` donc ton ticket ne pourras pas être ouvert.\nSi jamais un Administrateur créer le rôle avec le nom exacte, ton ticket pourras être ouvert.`);
    if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`:x: Tu as déja un ticket \`d'ouvert\`.`);
    message.guild.createChannel(`ticket-${message.author.id}`, "text").then(c => {
        let role = message.guild.roles.find("name", "Support Team");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send(`:white_check_mark: Ton ticket à bien été crée, #${c.name}.`);
        const embed = new Discord.RichEmbed()
        .setColor(0xCF40FA)
        .addField(`Hey ${message.author.username}!`, `Merci d'expliquer en détail la raison du ton ticket. Notre équipe de support sera la le plus vite possible.`)
        .setTimestamp();
        c.send({ embed: embed });
    }).catch(console.error);
}
if (message.content.toLowerCase().startsWith(prefix + `close`)) {
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`Tu ne peut pas utiliser cette commande à l'extérieur d'un channel de ticket.`);

    message.channel.send(`Tu es sûr? Une fois confirmée, tu ne pourras pas retourner en arrière !\nPour confirmer, écrivez \`ib!confirmer\`. Ce délai expire dans 20 secondes et est annulé.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === 'ib!confirmer', {
        max: 1,
        time: 20000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Commande expirée, le ticket n\'a pas été fermé.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}
            //Décompte snipe
            
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

  //if (message.content === prefix+"InvulsSnipe") {
    //console.log("Décompte lancé")
    //setInterval (function () {
     // message.channel.send(`La game commençe dans 3 min`)
  //  }, 10);
    //setInterval (function () {
     //// message.channel.send("La game commençe dans 1 min ")
    //}, 102000);
    //setInterval (function () {
    //  message.channel.send(`La game commençe dans 30 secondes `)
    ///}, 1038000); 
//setInterval (function () {
     // message.channel.send(`La game commençe dans 5 secondes `)
    //}, 1053000);
    //setInterval (function () {
      //message.channel.send(`La game commençe dans 4 secondes `)
    //}, 1053600); 
    //setInterval (function () {
      //message.channel.send(`La game commençe dans 3 secondes `)
    //}, 1054200);
    //setInterval (function () {
     // message.channel.send(`La game commençe dans 2 secondes `)
    //}, 1054800); 
    //setInterval (function () {
     // message.channel.send(`La game commençe dans 1 secondes `)
    //}, 1055400);
    //setInterval (function () {
    // message.channel.send(`La game commençe ! `)
   // }, 1080000);
if(message.content === prefix+'InvulsCode'){
    InvulsCode = !InvulsCode
    if(InvulsCode){
      InvulsCodeSalon = message.channel
      InvulsCodeSalon.send('L\'évent `InvulsCode` commence, balancer des codes à trois lettres/chiffres dans ce salon !')
    }else{
      let embed = new Discord.RichEmbed().setTitle('Vos codes :').setDescription('Voilà voilà...').addBlankField(false)
      for(code in keys){
        embed.addField(code +` (${keys[code].length})`,keys[code].map(m=>m.displayName).join('\n'),true)
      }
      message.channel.send(embed).then(keys={})
    }
  }
            if(message.content === prefix+"duel"){
               message.reply("en construction :construction:")
            }
        switch (args[0].toLowerCase()) {

      case "dueltest":
  let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!target) return message.channel.send('`Veuillez mettre le pseudo de votre adversaire.`')
           
   var dueltest = new Discord.RichEmbed()
      .setColor('#FF6600')
      .setThumbnail(target.user.avatarURL)
      .setAuthor('Duel', 'https://cdn.discordapp.com/emojis/465245981613621259.png?v=1')
      .setDescription(`Nouveau duel :`)
      .addField('⚠ - Membre qui a demandé le duel :', `${message.author.user}`, true)
      .addField('⚠ - Membre qui est demandé en duel', `${target.user.tag}`, true)
      .setFooter(`Message par InvulsBot `)
      .setTimestamp();
       message.channel.send(dueltest)
        break;       
    }
});

  bot.login(process.env.TOKEN);
