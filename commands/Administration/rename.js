exports.run = (client, message, args) =>{
    if(args.length >= 1){
        if(client.config.byPassPermission.includes(message.author.id)){
            let text = args.join(" ");
            message.guild.me.setNickname(text).then((clientUser) => {
                message.channel.send(":gear: Le pseudo du bot est maintenant : `"+ message.guild.me.nickname +"`");
            });
        }else{
            message.channel.send(":no_entry: Seuls les administrateurs du bot peuvent effectuer cette action").then((value) => {
                message.delete(10000);
                value.delete(10000);
            });
        }
    }else{
        let help = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setTitle('❌')
            .setDescription(client.config.prefix+'rename [pseudo]');
        message.channel.send(help).then((value) => {
            message.delete(10000);
            value.delete(10000);
        });
    }
};

exports.info = {
    aliases: [],
    description: "Changer le pseudo du bot",
    usage: "[pseudo]",
    category: "Administration",
    permissions: "ADMINISTRATOR",
    showHelp: true
};
