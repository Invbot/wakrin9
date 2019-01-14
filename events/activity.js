const activity = require('../assets/data/activity.json');

module.exports = (client) => {
    let i = 0;
    setActivity();
    let interval = setInterval(setActivity, 5000);

    function getActivityFile(i){
        return activity[i].replace("%prefix", client.config.prefix).replace("%guilds", client.guilds.size)
        .replace("%channels", client.channels.size).replace("%users", client.users.size);
    }

    function setActivity(){
        if(i >= activity.length) i = 0;
        client.user.setActivity(getActivityFile(i), {type: "WATCHING"});
        i++;
    }

};