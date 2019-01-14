const fs = require("fs");
const Discord = require('discord.js');
const Jimp = require("jimp");
const Fortnite = require('fortnite');


exports.run = (client, message, args) =>{
    const fortnite = new Fortnite(client.config.api["fortnite-api"]);
    if(args.length > 0){
        message.channel.startTyping();
        fortnite.user(args.join(' '), 'pc').then((fortniteResult) => {

            Jimp.read("./assets/fortnite.jpg").then(function (image) {

                Jimp.loadFont("./assets/font/burbank_30.fnt").then(function (font_30) {
                    Jimp.loadFont("./assets/font/burbank_26.fnt").then(function (font_26) {
                        Jimp.loadFont("./assets/font/burbank_21.fnt").then(function (font_21) {
                            Jimp.loadFont("./assets/font/burbank_30_blue.fnt").then(function (font_30_blue) {

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

                                image.print(font_26, 358, 82, {
                                    text: fortniteResult.stats.solo.kills+"",
                                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                }, 67, 28);


                                const winPSolo = (fortniteResult.stats.solo.matches)?((fortniteResult.stats.solo.wins/fortniteResult.stats.solo.matches)*100).toFixed(1)+"%":0+"%";

                                image.print(font_26, 426, 82, {
                                    text: winPSolo,
                                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                }, 67, 28);

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

                                image.print(font_26, 358, 190, {
                                    text: fortniteResult.stats.duo.kills+"",
                                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                }, 67, 28);

                                const winPDuo = (fortniteResult.stats.duo.matches)?((fortniteResult.stats.duo.wins/fortniteResult.stats.duo.matches)*100).toFixed(1)+"%":0+"%";

                                image.print(font_26, 426, 190, {
                                    text: winPDuo,
                                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                }, 67, 28);

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

                                image.print(font_26, 358, 300, {
                                    text: fortniteResult.stats.squad.kills+"",
                                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                }, 67, 28);

                                const winPSquad = (fortniteResult.stats.squad.matches)?((fortniteResult.stats.squad.wins/fortniteResult.stats.squad.matches)*100).toFixed(1)+"%":0+"%";

                                image.print(font_26, 426, 300, {
                                    text: winPSquad,
                                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                                }, 67, 28);

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

            }).catch((error) => {message.channel.stopTyping(); console.log(error.message)});
        }).catch((error) => {message.channel.send(":x: Le joueur est introuvable"); message.channel.stopTyping();});

    }else{
        message.channel.send("Vous devez spécifier un joueur : `"+prefix+"ftn [pseudo]`");
    }
};

function space(num){
    let str = num+"";
    return str.replace(".", "").replace(",", "").length * 16 + ((str.includes('.'))?5:0);
}


exports.info = {
    aliases: ["fortnite"],
    description: "Voir les statistiques fortnite d'un joueur",
    usage: "",
    category: "",
    permissions: "",
    showHelp: false
};
