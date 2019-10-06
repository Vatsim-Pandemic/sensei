![Discord-Sensei](https://discord-sensei.js.org/img/logo.27982581.png)

### About.
discord-sensei is a [node.js](https://nodejs.org/) module that makes the development of [Discord](https://discordapp.com/) Bots extremely easy. It serves as a wrapper around [discord.js](https://discord.js.org/#/) with a workflow thats easy to get used to and is well organized.

[discord.js](https://discord.js.org/#/) is a great library for interacting with the [Discord API](https://discordapp.com/developers/docs) and it covers nearly 100% of the Entire API.

Simplicity, and Being Straightforward to use while having a clean workflow was the inspiration behind this project.

### Some of the Features.
* Built on [discord.js](https://discord.js.org/#/), Same Coding Practices!
* Keeps things Simple, Clean and Organized.
* Automated Message and Argument Parsing.
* Flexible Command Class.
* Arguments with Data types including Strings, Numbers, Discord.js Classes.
* Convient Permissions Setup
* Written in TypeScript.
* Many many more features to come.

### Who is this for ?
If you want a Framework that lets users do all the fun stuff without letting them worry about the Management/Boilerplate work underneath all while keeping everything clean and organized, then you'd definitely be interested in checking this out!

### Installation.
```npm
npm install --save discord-sensei discord.js
```

### Basic Setup.

```javascript
const { SenseiClient } = require("discord-sensei");
const path = require("path");

const client = new SenseiClient({
  prefixes: ["p!", "p>"],
  commandsDirectory: path.join(__dirname, "/commands")
});

client.login("YOUR.BOT.TOKEN");
```

#### Links.

[Documentation](https://discord-sensei.js.org/#/docs)<br>
[Discord Server](https://discord.gg/8hxuRZn)<br>
[GitHub Repository](https://github.com/demonicious/sensei)
