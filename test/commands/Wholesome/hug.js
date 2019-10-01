const { RichEmbed } = require("discord.js");
const { SenseiCommand } = require("./../../../build/sensei");

class HugCommand extends SenseiCommand {
    constructor() {
        super();
        this.names = [
            "hug",
            "embrace"
        ];
        this.category = "Wholesome";
        this.info = {
            name: "Hug Command",
            description: "Embraces someone warmly.",
            syntax: "hug @user"
        }
        this.cooldown = 5;
        this.arguments = [
            {
                name: "user",
                type: "user_mention"
            }
        ]
    }

    async run(bot, message, arguments) {
        let msgChannel = message.channel;
        let hugger = message.author.username;
        let hugged = message.mentions.users.first().username;

        let rb = new RichEmbed()
        .setDescription(`${hugged} was embraced warmly by ${hugger}!`)
        .setImage("http://i.imgur.com/Z8eQKOZ.gif")
        .setColor(bot.primaryColor)
        .setFooter(bot.footerText)
        .setTimestamp();

        msgChannel.send(rb);

        console.log(`${this.info.name} command was executed by ${hugger}.`);
        return;
    }
}

module.exports = HugCommand;