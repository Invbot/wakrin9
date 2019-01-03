const Jimp = require("jimp");
const Fortnite = require('fortnite');
const fortnite = new Fortnite('d02f77e6-da71-413f-8608-bf7a317de9a0');

exports.buildImageStats = function buildImageStats(pseudo){

    fortnite.user('Spileur', 'pc').then((fortniteResult) => {
        console.log(fortniteResult.stats.solo);

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
                            return output;
                        });
                    });
                });
            });

        });
    });
};

function space(num){
    let str = num+"";
    return str.replace(".", "").replace(",", "").length * 16 + ((str.includes('.'))?5:0);
}