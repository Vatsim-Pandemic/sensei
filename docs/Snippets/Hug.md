![Discord-Sensei](https://discord-sensei.js.org/img/logo.27982581.png)

#### Example of a Hug Command.
Everyone likes a warm hug.

```javascript
const { SenseiClient, SenseiCommand } = require("discord-sensei");
const { RichEmbed, Message } = require("discord.js");

class HugCommand extends SenseiCommand {
    constructor() {
        super();
        this.setNames([
            "hug",
            "embrace"
        ]);
        this.setCategory("Wholesome");
        this.setInfo({
            name: "Hug Command",
            description: "Hugs Someone",
            syntax: `${this.names[0]} [User]`
        });
        this.setArguments([
            {
                name: "user",
                type: "USER_MENTION",
                optional: false,
            }
        ]);
    }

    // Setting these Args to SenseiClient, Discord.Message and {} will provide better auto-completion.
    async run(bot = new SenseiClient, message = new Message, args = {}) {
        let rb = new RichEmbed;
        rb.setDescription(`**${args.user.username}** was given a warm hug by **${message.author.username}**!`)
            .setColor("#5f5ac6")
            .setImage("http://i.imgur.com/Z8eQKOZ.gif")
            .setFooter("My Awesome Bot")
            .setTimestamp();
        message.channel.send(rb);
        return;
    }
}

module.exports = HugCommand;
```
