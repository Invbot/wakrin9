const fs = require("fs");
const path = require("path");
const Enmap = require("enmap");
const Discord = require("discord.js");
const client = new Discord.Client();

client.config = require("./config.json");
client.commands = new Enmap();


console.log("Connnection au serveur discord...");
client.on('ready', async () => {

    fs.readdir(path.join(__dirname, "commands"), (err, files) => {
        if (err) return console.error(err);
        registerCommand(path.join(__dirname, "commands"), files);
    });

    fs.readdirSync(path.join(__dirname, "events")).forEach(function(file) {
        require('./events/' + file)(client);
    });

    console.log("Le bot est connecter");
});

function registerCommand(pathFile, files) {
    files.forEach(file => {
        if(fs.lstatSync(path.join(pathFile.toLocaleString(), file)).isDirectory()){
            fs.readdir(path.join(pathFile.toLocaleString(), file), (err, files) => {
                registerCommand(path.join(pathFile.toLocaleString(), file), files);
            });
        }else{
            if (!file.endsWith(".js")) return;
            let props = require(`${pathFile}/${file}`);
            let commandName = file.split(".")[0];
            props.command = commandName;
            client.commands.set(commandName, props);
        }
    });

}

client.connectDatabase = function connectDatabase(client, mongoose) {
    mongoose.connect("mongodb://"+client.config.bdd.user+":"+client.config.bdd.password+"@"+client.config.bdd.url+"/"+client.config.bdd.database, { useNewUrlParser: true }).then();
};

const token = process.env.TOKEN;//"NTI2NzY5MDU4MTE3NTgyODU5.Dw5QpQ.vLDte2wNB7fOCL3677belhFwzeA";

client.login(token);


