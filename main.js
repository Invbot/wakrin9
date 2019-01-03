const Discord = require('discord.js');
const Jimp = require("jimp");
const Fortnite = require('fortnite');
const fortnite = new Fortnite('d02f77e6-da71-413f-8608-bf7a317de9a0');
const bot = new Discord.Client
const ms = require('ms');
const settings = require("./settings.json");
const ytdl = require("ytdl-core");
const opus = require('opusscript');
const ftn = require('./fortnite');

var keys = {}
var InvulsCode = false
var intervals = []
var prefix = "*"
let queue = [];
  bot.login(process.env.TOKEN);


const antispam = require("discord-anti-spam");
 
antispam(bot, {
  warnBuffer: 4, //Maximum amount of messages allowed to send in the interval time before getting warned.
  maxBuffer: 6, // Maximum amount of messages allowed to send in the interval time before getting banned.
  interval: 4500, // Amount of time in ms users can send a maximum of the maxBuffer variable before getting banned.
  warningMessage: "Arrête de spam !", // Warning message send to the user indicating they are going to fast.
  banMessage: "A été ban pour spam. Quelqu'un d'autre ?", // Ban message, always tags the banned user in front of it.
  maxDuplicatesWarning: 6,// Maximum amount of duplicate messages a user can send in a timespan before getting warned
  maxDuplicatesBan: 8, // Maximum amount of duplicate messages a user can send in a timespan before getting banned
  deleteMessagesAfterBanForPastDays: 7, // Delete the spammed messages after banning for the past x days.
  exemptUsers: ["InVuls DojoGuigi#8893", "InVuls TxZ#0954", "🎄- [InVuls Dev]AŁع〤0754#0081"] // The Discord tags of the users who should not be spam-filtered
});
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
        .setDescription(`__**Bienvenue à ${member.user.username}**__`)
        .addField(`**Nous sommes ${member.guild.memberCount} grâce à toi !**`,`InVuls E-Sport / Communauté - :flag_fr:`)
        .setFooter(`© InVulsBot`, "https://images-ext-2.discordapp.net/external/QELomkRUVhZuLIDbQI6220WSAhRAwnD0Dg-igmd02to/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/493471628043354133/ab0970c55a68235387ab2695d825b6f9.png")
        .setTimestamp();
        if(member.guild.channels.get('351629980570091531')) member.guild.channels.get('351629980570091531').send(embed);
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
var adminID = "363762795801477120"

const commands = {
  'play': (msg) => {
    if (queue[msg.guild.id] === undefined) return msg.channel.sendMessage(`Ajoutez d'abord des chansons à la file d'attente avec * add`);
    if (!msg.guild.voiceConnection) return commands.join(msg).then(() => commands.play(msg));
    if (queue[msg.guild.id].playing) return msg.channel.sendMessage('Already Playing');
    let dispatcher;
    queue[msg.guild.id].playing = true;

    console.log(queue);
    (function play(song) {
      console.log(song);
      if (song === undefined) return msg.channel.sendMessage('La file d\'attente est vide').then(() => {
        queue[msg.guild.id].playing = false;
        msg.member.voiceChannel.leave();
      });
      msg.channel.sendMessage(`Je joue: **${song.title}** comme demandé par: **${song.requester}**`);
      dispatcher = msg.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes : 1 });
      let collector = msg.channel.createCollector(m => m);
      collector.on('message', m => {
        if (m.content.startsWith(prefix + 'pause')) {
          msg.channel.sendMessage('paused').then(() => {dispatcher.pause();});
        } else if (m.content.startsWith(prefix + 'resume')){
          msg.channel.sendMessage('resumed').then(() => {dispatcher.resume();});
        } else if (m.content.startsWith(prefix + 'skip')){
          msg.channel.sendMessage('skipped').then(() => {dispatcher.end();});
        } else if (m.content.startsWith('volume+')){
          if (Math.round(dispatcher.volume*50) >= 100) return msg.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
          dispatcher.setVolume(Math.min((dispatcher.volume*50 + (2*(m.content.split('+').length-1)))/50,2));
          msg.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
        } else if (m.content.startsWith('volume-')){
          if (Math.round(dispatcher.volume*50) <= 0) return msg.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
          dispatcher.setVolume(Math.max((dispatcher.volume*50 - (2*(m.content.split('-').length-1)))/50,0));
          msg.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
        } else if (m.content.startsWith(prefix + 'time')){
          msg.channel.sendMessage(`time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}`);
        }
      });
      dispatcher.on('end', () => {
        collector.stop();
        play(queue[msg.guild.id].songs.shift());
      });
      dispatcher.on('error', (err) => {
        return msg.channel.sendMessage('error: ' + err).then(() => {
          collector.stop();
          play(queue[msg.guild.id].songs.shift());
        });
      });
    })(queue[msg.guild.id].songs.shift());
  },
  'join': (msg) => {
    return new Promise((resolve, reject) => {
      const voiceChannel = msg.member.voiceChannel;
      if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('Je ne pouvais pas me connecter à votre canal vocal ...');
      voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
    });
  },
  'add': (msg) => {
    let url = msg.content.split(' ')[1];
    if (url == '' || url === undefined) return msg.channel.sendMessage(`Vous devez ajouter une URL de vidéo YouTube ou un identifiant après * add`);
    yt.getInfo(url, (err, info) => {
      if(err) return msg.channel.sendMessage('Lien YouTube invalide: ' + err);
      if (!queue.hasOwnProperty(msg.guild.id)) queue[msg.guild.id] = {}, queue[msg.guild.id].playing = false, queue[msg.guild.id].songs = [];
      queue[msg.guild.id].songs.push({url: url, title: info.title, requester: msg.author.username});
      msg.channel.sendMessage(`J'ai ajouté **${info.title}** à la file d'attente`);
    });
  },
  'queue': (msg) => {
    if (queue[msg.guild.id] === undefined) return msg.channel.sendMessage(`Ajoutez d'abord des chansons à la file d'attente avec * add`);
    let tosend = [];
    queue[msg.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ${song.title} - Demandé par: ${song.requester}`);});
    msg.channel.sendMessage(`__**${msg.guild.name} Playlist:**__ Présentement, il  y a **${tosend.length}** musique dans ma playlist ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);
  },
  'help-music': (msg) => {
    let tosend = ['```xl','*join : "Rejoindre le canal vocal de l\'expéditeur du message"', '*add : "Ajoute un lien YouTube valide à la file d\'attente"', '*queue : "Affiche la file d\'attente actuelle, jusqu\'à 15 chansons affichées."', '*play : "Lire la liste musicale si elle est déjà jointe à un channel vocal"', '', 'les commandes suivantes ne fonctionnent que lorsque la commande de lecture est en cours d\'exécution:'.toUpperCase(), '*pause : "Mets en pause la musique"', '*resume : "Resume la musique"', '*skip : "Skip la musique"', '*time : "Affiche la durée de lecture de la chanson."',  'volume + (+++): "augmente le volume de 2% / +"',  'volume-(---) : "Baisse le volume de 2%/-"',  '```'];
    msg.channel.sendMessage(tosend.join('\n'));
  },
  'reboot': (msg) => {
    if (msg.author.id == adminID) process.exit(); 
  }
};

    bot.on("message", async (message) => {
      if (commands.hasOwnProperty(message.content.toLowerCase().slice(prefix.length).split(' ')[0])) commands[message.content.toLowerCase().slice(prefix.length).split(' ')[0]](message);
       if (message.channel.type === "dm") return;
      const args = message.content.substring(prefix.length).split(" ");
      
       let command = message.content.split(" ")[0]
  command = command.slice(prefix.length)
      
      //système de sécurité
 if (command === "lockdown") {
  if (message.member.hasPermission("ADMINISTRATOR")) {
   if (!bot.lockit) bot.lockit = [];
  let time = args.join(' ');
  let validUnlocks = ['release', 'unlock'];
  if (!time) return message.reply('You must set a duration for the lockdown in either hours, minutes or seconds');
  if (validUnlocks.includes(time)) {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null
    }).then(() => {
      
      message.channel.sendMessage('Lockdown lifted.');
      clearTimeout(bot.lockit[message.channel.id]);
      delete bot.lockit[message.channel.id];
    }).catch(error => {
      console.log(error);
    });
  } else {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: false
    }).then(() => {
   message.channel.sendMessage(`Channel bloqué pour ${ms(ms(time), { long:true })}`).then(() => {
     
        bot.lockit[message.channel.id] = setTimeout(() => {
          message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
          }).then(message.channel.sendMessage('Lockdown lifted.')).catch(console.error);
          delete bot.lockit[message.channel.id];
        }, ms(time));
 
      }).catch(error => {
        console.log(error);
   });
    });
  }
  }
}
        
   if (message.content.includes("https://")) {
    if(message.author.id === '363762795801477120') return
    if (message.author.id === '282209791265472512') return
    if(message.author.id === '269944035999875082') return
     if (message.channel.id === '528654747612479498') return
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
     if (message.channel.id === '494229725246390272') return
      if (message.channel.id === '493133388572524584') return
      if (message.channel.id === '508715065197723651') return
      if (message.channel.id === '494230013072113694') return
      if (message.channel.id === '493133624468701184') return
      if (message.channel.id === '508715053642416131') return
      if (message.channel.id === '494230348264112163') return
      if (message.channel.id === '493156795854880788') return
      if (message.channel.id === '508715036831907860') return
      if (message.channel.id === '503653111605362728') return
      if (message.channel.id === '510560102466584583') return
      if (message.channel.id === '507273900917260288') return
      if (message.channel.id === '513418097462345731') return
      if (message.channel.id === '513418126231339015') return
      if (message.channel.id === '513418152625963320') return
    console.log("Supprimé " + message.content + " par" + message.author)
      message.delete(1);
      message.channel.send("Aucun lien ici, " + message.author)
    }
    if (message.content.includes("http://")) {
       if(message.author.id === '363762795801477120') return
   
    if (message.author.id === '282209791265472512') return
    if(message.author.id === '269944035999875082') return
      if (message.channel.id ===  '481194800133963785') return
      if (message.channel.id === '528654747612479498') return
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
      if (message.channel.id === '494229725246390272') return
      if (message.channel.id === '493133388572524584') return
      if (message.channel.id === '508715065197723651') return
      if (message.channel.id === '494230013072113694') return
      if (message.channel.id === '493133624468701184') return
      if (message.channel.id === '508715053642416131') return
      if (message.channel.id === '494230348264112163') return
      if (message.channel.id === '493156795854880788') return
      if (message.channel.id === '508715036831907860') return
      if (message.channel.id === '503653111605362728') return
      if (message.channel.id === '510560102466584583') return
      if (message.channel.id === '507273900917260288') return
      if (message.channel.id === '513418097462345731') return
      if (message.channel.id === '513418126231339015') return
      if (message.channel.id === '513418152625963320') return
     console.log("Supprimé" + message.content + " par " + message.author)
      message.delete(1);
      message.channel.send("Aucun lien ici, " + message.author)
    }
    if (message.content.includes("www.")) {
       if(message.author.id === '363762795801477120') return
    if (message.author.id === '282209791265472512') return
    if(message.author.id === '269944035999875082') return
      if (message.channel.id ===  '481194800133963785') return
      if (message.channel.id ===  '481194647323017236') return
      if (message.channel.id === '481194913426440193') return
      if (message.channel.id === '504292270267432970') return
      if (message.channel.id === '528654747612479498') return
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
      if (message.channel.id === '494229725246390272') return
      if (message.channel.id === '493133388572524584') return
      if (message.channel.id === '508715065197723651') return
      if (message.channel.id === '494230013072113694') return
      if (message.channel.id === '493133624468701184') return
      if (message.channel.id === '508715053642416131') return
      if (message.channel.id === '494230348264112163') return
      if (message.channel.id === '493156795854880788') return
      if (message.channel.id === '508715036831907860') return
      if (message.channel.id === '503653111605362728') return
      if (message.channel.id === '510560102466584583') return
      if (message.channel.id === '507273900917260288') return
      if (message.channel.id === '513418097462345731') return
      if (message.channel.id === '513418126231339015') return
      if (message.channel.id === '513418152625963320') return
      console.log("Supprimé " + message.content + " par " + message.author)
      message.delete(1);
      message.channel.send("Aucun lien ici, " + message.author)
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
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send("Tu n'as pas la permission !");

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
       switch (args[0].toLowerCase()) {
      case "rename":
        if(message.member.hasPermission("ADMINISTRATOR")) {
          console.log(`${message.author.username}` + " " + "Used The Command " + prefix + "rename");

          if(!args.slice(1).join(" ")){
            return message.channel.send(":x: " + "| Veuillez donner un nouveau nom au bot.");
          }
          message.guild.member(bot.user).setNickname(args.slice(1).join(" ")).then(user => message.channel.send("Mon nouveau nom est " + args.slice(1).join(" ") + "!")).catch(console.error);
        } else {
          console.log(`${message.author.username}` + " " + "Was Denied Use of the command " + prefix + "rename");
          return message.reply(":x: " + "| Vous devez avoir la permission \"ADMINISTRATOR\".")
        }

          break;
       }
if(message.content.startsWith(prefix + "mute")) {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send("Vous n'avez pas la permission !");

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
         if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send("Tu n'as pas la permission !");

        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur !');
        }

        var unmute = message.guild.member(message.mentions.users.first());
        if(!unmute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
        }

        if (!message.member.hasPermission('SEND_MESSAGES')) return message.channel.send("Je n'ai pas la permission !");
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
 
if(!message.guild.member(message.author).hasPermission("MANAGE_CHANNELS")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
if(message.mentions.users.size === 0) {
 
  return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");
 
}else{
 
    const args = message.content.split(' ').slice(1);
 
    const mentioned = message.mentions.users.first();
 
    if (message.member.hasPermission('MANAGE_CHANNELS')){
 
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
 
if(!message.guild.member(message.author).hasPermission("SEND_MESSAGES")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
    const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    if (message.member.hasPermission('SEND_MESSAGES')){
 
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
      if(!message.guild.member(message.author).hasPermission("MANAGE_CHANNELS")) return message.channel.send("Vous n'avez pas la permission");
  
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
     if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send("Vous n'avez pas la permission !");
    let args = message.content.slice(prefix.length).trim().split(/ +/g).slice(1).join(" ")
    message.delete();
  
    if(!args) return message.channel.send("Tu dois me dire quelque chose !")
    if(message.mentions.everyone || message.mentions.users.size === 1) return message.channel.send('Ne mentionne pas via cette commande ! :rage:')
  
    message.channel.send(`${args}`);
  }
   
        

      if (command === "roll") {
  message.channel.sendMessage(Math.floor(Math.random() * 100));
}
        if (message.content === prefix + 'help') {
          let helpEmbed = new Discord.RichEmbed()
            .setDescription("Toutes les commandes")
            .setColor('RANDOM')
            .addField("*help", "Affiche ce message")
            .addField("*help-mod", "Affiche les commandes d'administration/modération")
            .addField("*server", "Affiche quelques informations sur le serveur")
            .addField("*avatar", "Affiche votre avatar")
            .addField("*bot", "Crédits du bot")
            .addField("*report", "Sert à report un membre du serveur")
            .addField("*say (message)", "Fait parler le bot")
            .addField("*aide", "Sert à créer une demande d'aide au staff")
            .addField("*userstats", "Affiche les informations de votre compte")
            .addField("*suggestion", "Avec cette commande, vous pouvez donné une suggestion au staff")
            .addField("*coinflip (votre choix)", "Pile ou face ?")
            .addField("*calin", "Le bot vous donne un calin")
            .addField("*ftn", "Voir les statistiques fortnite d'un joueur")
            .setFooter('InVuls Bot')
            .setTimestamp()
          message.channel.send(helpEmbed)
          console.log("//////////////////////////////////////")
          console.log("La commande '*help-ticket' a été éfféctué !")
          console.log("//////////////////////////////////////")
      
        }
            
         if (message.content === prefix + 'help-ticket') {
          let helpEmbed = new Discord.RichEmbed()
            .setDescription("Toutes les commandes")
            .setColor('RANDOM')
            .addField("*new", "**Cette commande permet de créer un channel pour votre ticket**.\n__suite à la création du channel, vous devez expliquer la raison du ticket.__")
            .addField("*close/*confirmer", "Quand votre ticket est résolu, faites la commande ```*close``` puis ```*confirmer``` ")
            .setFooter('InVuls Bot')
            .setTimestamp()
          message.channel.send(helpEmbed)
          console.log("//////////////////////////////////////")
          console.log("La commande '*help' a été éfféctué !")
          console.log("//////////////////////////////////////")
      
        }
            
        if (message.content === prefix + 'help-mod') {
          let helpmodEmbed = new Discord.RichEmbed()
            .setColor("#6999FF", "#FFFFFF","#ff6600")
            .setDescription("__**Commande pour le staff**__", ':shield:')
            .addField("*warn (utilisateur + raison)", "Permet d'avertir un utilisateur")
            .addField("*seewarns(utilisateur)", "Permet de voir combien d'avertissements a la personne mentionnée")
            .addField("*deletewarns(utilisateur + numero du warn)", "Permet d'enlever l'avertissement correspondant au numéro indiqué.")
            .addField("*kick (utilisateur)", "Permet de kick un utilisateur")
            .addField("*ban (utilisateur)", "Permet de ban un utilisateur")
            .addField("*mute (utilisateur)", "Permet de mute un utilisateur")
            .addField("*unmute (utilisateur)", "Permet d'unmute un utilisateur")
            .addField("*clear (nombre de message que vous voulez enlever)", "Permet de clear un certain nombre de message")
            .addField("*sondage", "Sert à créer un sondage")
            .setTimestamp()
          message.channel.send(helpmodEmbed)
          console.log("////////////////////////////////////")
          console.log("La commande '*help-mod' a été éfféctué !")
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

        if(message.content.startsWith(prefix + "ftn")) {
            let args = message.content.split(" ");
            args.shift();
            if(args.length > 0){
                message.channel.startTyping();
                fortnite.user(args.join(' '), 'pc').then((fortniteResult) => {

                    Jimp.read("./fortnite.jpg").then(function (image) {

                        Jimp.loadFont("./font/burbank_30.fnt").then(function (font_30) {
                            Jimp.loadFont("./font/burbank_26.fnt").then(function (font_26) {
                                Jimp.loadFont("./font/burbank_21.fnt").then(function (font_21) {
                                    Jimp.loadFont("./font/burbank_30_blue.fnt").then(function (font_30_blue) {

                                        //PSEUDO

                                        image.print(font_30, 10, 79, {
                                            text: fortniteResult.username,
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 220, 52);

                                        //GLOBAL

                                        image.print(font_26, 14, 139, {
                                            text: fortniteResult.stats.lifetime[8].Wins,
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 64, 17);

                                        image.print(font_26, 87, 139, {
                                            text: fortniteResult.stats.lifetime[11]['K/d'],
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 64, 17);

                                        image.print(font_26, 156, 139, {
                                            text: fortniteResult.stats.lifetime[9]['Win%'],
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 64, 17);


                                        const kills = fortniteResult.stats.lifetime[10]['Kills'];

                                        image.print(font_30, 25, 212, {
                                            text: kills.toString(),
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 150, 17);

                                        image.print(font_30_blue, 25 + space(kills), 212, {
                                            text: 'Kills',
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 150, 17);

                                        const matches = fortniteResult.stats.lifetime[7]['Matches Played'];

                                        image.print(font_30, 25, 249, {
                                            text: matches,
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 150, 17);

                                        image.print(font_30_blue, 25 + space(matches), 249, {
                                            text: 'Matches',
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 150, 17);

                                        const avg_kills = (matches != 0)?(kills/matches).toFixed(2):0;

                                        image.print(font_30, 25, 286, {
                                            text: avg_kills.toString(),
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 150, 17);

                                        image.print(font_30_blue, 25 + space(avg_kills), 286, {
                                            text: 'Avg. Kills',
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 150, 17);

                                        const score = fortniteResult.stats.lifetime[6]['Score'];

                                        image.print(font_30, 25, 323, {
                                            text: score,
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 150, 17);

                                        image.print(font_30_blue, 25 + space(score), 323, {
                                            text: 'Score',
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 150, 17);


                                        //SOLO

                                        image.print(font_26, 246, 82, {
                                            text: fortniteResult.stats.solo.kd+"",
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 52, 28);

                                        image.print(font_26, 305, 82, {
                                            text: fortniteResult.stats.solo.wins+"",
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 52, 28);

                                        image.print(font_26, 370, 82, {
                                            text: fortniteResult.stats.solo.kills+"",
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 52, 28);


                                        const winPSolo = (fortniteResult.stats.solo.matches)?((fortniteResult.stats.solo.wins/fortniteResult.stats.solo.matches)*100).toFixed(1)+"%":0+"%";

                                        image.print(font_26, 436, 82, {
                                            text: winPSolo,
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 52, 28);

                                        image.print(font_26, 509, 82, {
                                            text: fortniteResult.stats.solo.matches+"",
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 59, 28);

                                        //DUO

                                        image.print(font_26, 246, 190, {
                                            text: fortniteResult.stats.duo.kd+"",
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 52, 28);

                                        image.print(font_26, 305, 190, {
                                            text: fortniteResult.stats.duo.wins+"",
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 52, 28);

                                        image.print(font_26, 370, 190, {
                                            text: fortniteResult.stats.duo.kills+"",
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 52, 28);

                                        const winPDuo = (fortniteResult.stats.duo.matches)?((fortniteResult.stats.duo.wins/fortniteResult.stats.duo.matches)*100).toFixed(1)+"%":0+"%";

                                        image.print(font_26, 436, 190, {
                                            text: winPDuo,
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 52, 28);

                                        image.print(font_26, 509, 190, {
                                            text: fortniteResult.stats.duo.matches+"",
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 59, 28);

                                        //SQUAD

                                        image.print(font_26, 246, 300, {
                                            text: fortniteResult.stats.squad.kd+"",
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 52, 28);

                                        image.print(font_26, 305, 300, {
                                            text: fortniteResult.stats.squad.wins+"",
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 52, 28);

                                        image.print(font_26, 370, 300, {
                                            text: fortniteResult.stats.squad.kills+"",
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 52, 28);

                                        const winPSquad = (fortniteResult.stats.squad.matches)?((fortniteResult.stats.squad.wins/fortniteResult.stats.squad.matches)*100).toFixed(1)+"%":0+"%";

                                        image.print(font_26, 436, 300, {
                                            text: winPSquad,
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 52, 28);

                                        image.print(font_26, 509, 300, {
                                            text: fortniteResult.stats.squad.matches+"",
                                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                        }, 59, 28);

                                        let output = "./output/" + Math.random().toString(36).substr(2, 5) + "ftn." + image.getExtension();
                                        image.write(output);
                                        message.channel.send(new Discord.Attachment(output)).then((msg) =>{
                                            message.channel.stopTyping();
                                            fs.unlink(output, function () {

                                            });
                                        });
                                    });
                                });
                            });
                        });

                    });
                }).catch((error) => {message.channel.send(":x: Le joueur est introuvable"); message.channel.stopTyping();});

            }else{
                message.channel.send("Vous devez spécifier un joueur : `"+prefix+"ftn [pseudo]`");
            }
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
        if (!message.member.hasPermission('ADMINISTRATOR')) return;
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

    message.channel.send(`Tu es sûr? Une fois confirmée, tu ne pourras pas retourner en arrière !\nPour confirmer, écrivez \`*confirmer\`. Ce délai expire dans 20 secondes et est annulé.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '*confirmer', {
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
  if(!message.member.hasPermission('ADMINISTRATOR')) return;
    InvulsCode = !InvulsCode
    if(InvulsCode){
      InvulsCodeSalon = message.channel
      InvulsCodeSalon.send('L\'évent `InvulsCode` commence, balancer des codes à trois lettres/chiffres dans ce sallon !')
    }else{
      let embed = new Discord.RichEmbed().setTitle('Vos codes :').setDescription('Voilà voilà...').addBlankField(false)
      for(code in keys){
        embed.addField(code +` (${keys[code].length})`,keys[code].map(m=>m.displayName).join('\n'),true)
      }
      message.channel.send(embed).then(keys={})
    }
  }
            // Nouveau projet
      
    if(message.content === prefix+"create"){
              message.member.addRole(message.guild.roles.find(role => role.name === "Solo duel"));
               message.reply("Voilà tu as le rôle !")
       }
            
            if(message.content === prefix+"duel"){
               message.reply("en construction :construction:")
            }
        switch (args[0].toLowerCase()) {

      case "dueltest":
  let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!target) return message.channel.send('`Veuillez mettre le pseudo de votre adversaire...`')
           
   var dueltest = new Discord.RichEmbed()
      .setColor('#FF6600')
      .setThumbnail(target.user.avatarURL)
      .setAuthor('Duel', 'https://cdn.discordapp.com/emojis/465245981613621259.png?v=1')
      .setDescription(`Nouveau duel :`)
      .addField('⚠ - Membre qui a demandé le duel :', `${message.author.tag}`, true)
      .addField('⚠ - Membre qui est demandé en duel', `${target.user.tag}`, true)
      .setFooter(`Message par InvulsBot `)
      .setTimestamp();
      message.react('👍').then(() => message.react('👎'));

    const filter = (reaction, user) => {
      return ['👍', '👎'].includes(reaction.emoji.name) && user.id === target.id;
    };

    message.awaitReactions(filter, { max: 1, time: 1000000, errors: ['time'] })
      .then(collected => {
        const reaction = collected.first();

        if (reaction.emoji.name === '👍') {
          message.reply('duel lancé.');
        }
        else {
          message.reply('duel non-lancé');
        }
      })
      .catch(collected => {
        console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
        message.reply('tu n\'a pas réagis assez vite.');
    
  });
             
       message.channel.send(dueltest)
        break;       
  }
const yourID = "363762795801477120"; //Instructions on how to get this: https://redd.it/40zgse
const yourID2 = "282209791265472512";
const yourID3 = "269944035999875082";
const setupCMD = "*role"
let initialMessage = `**Réagissez avec les réactions pour avoir le rôle. Si vous ne voulez plus le rôle, vous devez juste enlever votre réaction !**`;
const roles = ["Snipe", "Support Team", "testeur", "Solo duel"];
const reactions = ["💻", "🖌", "😃", "🆕"];
      
//If there isn't a reaction for every role, scold the user!
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

//Function to generate the role messages, based on your settings
function generateMessages(){
    var messages = [];
    messages.push(initialMessage);
    for (let role of roles) messages.push(`Réagissez ci-dessous pour vous attribuez le rôle **"${role}"** !`); //DONT CHANGE THIS
    return messages;
}


    if (message.author.id == yourID && yourID2 && yourID3 && message.content.toLowerCase() == setupCMD){
        var toSend = generateMessages();
        let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];
        for (let mapObj of mappedArray){
            message.channel.send(mapObj[0]).then( sent => {
                if (mapObj[1]){
                  sent.react(mapObj[1]);  
                } 
            });
        }
    }


bot.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
        
        let channel = bot.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg=> {
        let user = msg.guild.members.get(event.d.user_id);
        
        if (msg.author.id == bot.user.id && msg.content != initialMessage){
       
            var re = `\\*\\*"(.+)?(?="\\*\\*)`;
            var role = msg.content.match(re)[1];
        
            if (user.id != bot.user.id){
                var roleObj = msg.guild.roles.find(r => r.name === role);
                var memberObj = msg.guild.members.get(user.id);
                
                if (event.t === "MESSAGE_REACTION_ADD"){
                    memberObj.addRole(roleObj)
                } else {
                    memberObj.removeRole(roleObj);
                }
            }
        }
        })
 
    }
});
      if (message.content === prefix  + "smoke")

    message.channel.send('**BISSSSHES IM SMOKING**').then(async message => {
        setTimeout(() => {
            message.edit('🚬');
        }, 500);
        setTimeout(() => {
            message.edit('🚬 ☁ ');
        }, 1000);
        setTimeout(() => {
            message.edit('🚬 ☁☁ ');
        }, 1500);
        setTimeout(() => {
            message.edit('🚬 ☁☁☁ ');
        }, 2000);
        setTimeout(() => {
            message.edit('🚬 ☁☁');
        }, 2500);
        setTimeout(() => {
            message.edit('🚬 ☁');
        }, 3000);
        setTimeout(() => {
            message.edit('🚬 ');
        }, 3500);
        setTimeout(() => {
            message.edit(`J'ai fini !`);
        }, 4000);
    });

    });


function space(num){
    let str = num+"";
    return str.replace(".", "").replace(",", "").length * 16 + ((str.includes('.'))?5:0);
}
