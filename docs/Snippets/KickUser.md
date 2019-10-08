![Discord-Sensei](https://discord-sensei.js.org/img/logo.27982581.png)

### Kick User Command.
They need to be taught a lesson sometimes.

```javascript
const { SenseiClient, SenseiCommand } = require("discord-sensei");
const { Message } = require("discord.js");

class KickCommand extends SenseiCommand {
    constructor() {
        super();
        this.setNames([
            "kick",
        ]);
        this.setCategory("Moderation");
        this.setInfo({
            name: "Kick Command",
            description: "Kicks a User from the Server.",
            syntax: `${this.names[0]} [User]`
        });
        this.setArguments([
            {
                name: "user",
                type: "USER_MENTION",
                optional: false
            }
        ]);
    }

    // Setting these Args to SenseiClient, Discord.Message and {} will provide better auto-completion.
    async run(bot = new SenseiClient, message = new Message, args = {}) {
        let guildmember = message.guild.member(args.user);
        guildmember.kick().then(_ => {
            this.log.info(`${args.user.username} has been kicked from the server.`);
            return;
        }).catch(e => {
            message.channel.send("Insufficient Permissions to Kick the given user.");
            return;
        }) 
    }
}

module.exports = KickCommand;
```
