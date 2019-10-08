![Discord-Sensei](https://discord-sensei.js.org/img/logo.27982581.png)

### Simple Ping Command.

```javascript
const { SenseiClient, SenseiCommand } = require("../../../build/sensei");
const { Message } = require("discord.js");

class PingCommand extends SenseiCommand {
    constructor() {
        super();
        this.setNames([
            "ping",
            "latency"
        ]);
        this.setCategory("Benchmarking");
        this.setInfo({
            name: "Ping Command",
            description: "Shows the Latency of the Bot.",
            syntax: `${this.names[0]}`
        });
    }

    // Setting these Args to SenseiClient, Discord.Message and {} will provide better auto-completion.
    async run(bot = new SenseiClient, message = new Message, args = {}) {
        message.channel.send("Pinging...").then(sentMessage => {
            let ping = sentMessage.createdTimestamp - message.createdTimestamp;
            sentMessage.edit(`PONG!\nBot Latency: **${ping}**\nDiscord API Latency: **${bot.ping}**`);
            return;
        });
    }
}

module.exports = PingCommand;
```
