const { SenseiClient } = require("../module");
const path = require("path");
const bot = new SenseiClient;

const configObject = {
    // Required Information
    token: "NjI3NjExOTU1NDY0NzY1NDUx.XZOsDQ.-mZ06AQ0kjN67PE_4xuEptKR74o",
    prefixes: [
        "r>",
        "r!",
        "rave>",
        "rave!"
    ],
    commandsDirectory: path.join(__dirname, "./commands"),

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