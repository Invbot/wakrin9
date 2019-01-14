exports.run = (client, message, args) =>{
    if (!message.channel.name.startsWith(`ticket-`)) return;

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
};

exports.info = {
    aliases: [],
    description: "Fermer un ticket",
    usage: "",
    category: "Utils",
    permissions: "",
    showHelp: false
};
