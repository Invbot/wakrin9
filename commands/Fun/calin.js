const Discord = require("discord.js");

exports.run = (client, message, args) => {

        let hugs = [
            "`＼(^o^)／`",
            "`d=(´▽｀)=b`",
            "`⊂((・▽・))⊃`",
            "`⊂( ◜◒◝ )⊃`",
            "`⊂（♡⌂♡）⊃`",
            "`⊂(◉‿◉)つ`"
        ];
        message.reply(`${hugs[~~(Math.random() * hugs.length)]}`);

};

exports.info = {
    aliases: [],
    description: "Je te fais un calin",
    usage: "",
    category: "Fun",
    permissions: "",
    showHelp: true
};
