const Discord = require('discord.js');

module.exports = (client) => {

//Reaction roles

let messageID = "524631671241179137";

let pcID = "524296129677099010";
let ps4ID = "524296163684253696";
let xboxID = "524296086685483019";
let twitchID = "524294510826749953";
let notifID = "524293790966743051";

let pcRoleID = "485762459056078849";
let ps4RoleID = "485762459601207296";
let xboxRoleID = "485762515402358805";
let twitchRoleID = "477759219039207441";
let notifRoleID = "518403585361313799";

client.on('raw', async event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t === "MESSAGE_REACTION_REMOVE"){
        let emojiId = event.d.emoji.id;
        let channel = client.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg => {
            let member = msg.guild.members.get(event.d.user_id);
            if (msg.id === messageID){
                switch (emojiId) {
                    case pcID:
                        let pcRole = member.guild.roles.get(pcRoleID);
                        addOrRemoveRole(event.t, member, pcRole);
                        break;
                    case ps4ID:
                        let ps4Role = member.guild.roles.get(ps4RoleID);
                        addOrRemoveRole(event.t, member, ps4Role);
                        break;
                    case xboxID:
                        let xboxRole = member.guild.roles.get(xboxRoleID);
                        addOrRemoveRole(event.t, member, xboxRole);
                        break;

                    case twitchID:
                        let twitchRole = member.guild.roles.get(twitchRoleID);
                        addOrRemoveRole(event.t, member, twitchRole);
                        break;
                    case notifID:
                        let notifRole = member.guild.roles.get(notifRoleID);
                        addOrRemoveRole(event.t, member, notifRole);
                        break;
                }
            }
        })
    }
});

function addOrRemoveRole(t, member, role) {
    if(t === 'MESSAGE_REACTION_ADD'){
        member.addRole(role);
    }else if(t === 'MESSAGE_REACTION_REMOVE'){
        member.removeRole(role);
    }
}

client.on("guildMemberAdd", function(member) {
        const embed = new Discord.RichEmbed()
        .setTitle("Nouvel arrivant :")
        .setColor('RANDOM')
        .setDescription(`__**Bienvenue à ${member.user.username}**__`)
        .addField(`**Nous sommes ${member.guild.memberCount} grâce à toi !**`,`InVuls E-Sport / Communauté - :flag_fr:`)
        .setFooter(`© InVulsclient`, "https://images-ext-2.discordapp.net/external/QELomkRUVhZuLIDbQI6220WSAhRAwnD0Dg-igmd02to/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/493471628043354133/ab0970c55a68235387ab2695d825b6f9.png")
        .setTimestamp();
        if(member.guild.channels.get('351629980570091531')) member.guild.channels.get('351629980570091531').send(embed);
        });
};