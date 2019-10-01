const { SenseiClient } = require("../build/sensei");

const bot = new SenseiClient;

const configObject = {
    // Required Information
    token: "",
    prefixes: [
        "r>",
        "r!",
        "rave>",
        "rave!"
    ],
    commandsDirectory: "./commands",

    // Optional Data that may come in Handy.
    info: {
        name:    "NameOfBot",
        version: "Version of Bot",
        author: {
            name:     "Mudassar Islam",
            username: "Demonicious#9560",
            email:    "demoncious@gmail.com"
        }
    }
}

bot.configure(configObject)
bot.start();
console.log(bot);