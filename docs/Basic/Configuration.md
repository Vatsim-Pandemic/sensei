![Discord-Sensei](https://discord-sensei.js.org/img/logo.27982581.png)

## Configuration

```javascript
const { SenseiClient } = require("discord-sensei");
const path = require("path");

const client = new SenseiClient({
  prefixes: ["p!"],
  commandsDirectory: path.join(__dirname, "/commands")
});

client.login("YOUR.BOT.TOKEN");
```

In the Basic Startup example above, the Constructor for SenseiClient
```javascript
const client = new SenseiClient();
```

Requires a [Configuration Object](https://discord-sensei.js.org/#/docs/main/stable/typedef/Config) to be passed.

Your configuration might look something like this:

```javascript
const { SenseiClient } = require("discord-sensei");
const path = require("path");

const client = new SenseiClient({
  // --- Required
  // Array of Prefixes the Bot uses.
  prefixes: [
    "r>",
    "r!",
    "rave>"
  ],
  commandsDirectory: path.join(__dirname, "/commands"),
  
  // --- Optional
  // Log Messages to the Console for Information or not ?
  logMessages: true,
  // Report All Sorts of Errors to the User or not ?
  reportErrors: true,

  // Some Information about the Bot (Not really used anywhere by the class, just there for..when you need it)
  info: {
      name: "My new Bot",
      version: "1.0.0",
      author: {
          name: "Demonicious",
          username: "Demonicious#9560",
          email: "demoncious@gmail.com",
        }
    }
});

client.login("YOUR.BOT.TOKEN");
```
