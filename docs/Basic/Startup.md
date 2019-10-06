![Discord-Sensei](https://discord-sensei.js.org/img/logo.27982581.png)

This guide assumes that you know the basics of how to work with [Node](https://nodejs.org/). Creating package.json files and Installing and using modules using [npm](https://npmjs.org/).

## Installation & Setup.

#### Init.

Create a New Directory and Initialize it with a `package.json`

Edit the `package.json` file and add a `"start": "node ."` script under the "test" script.

After adding the script, your `package.json` file should look similar to this:

```json
{
    "name": "my_bot",
    "description": "My new Awesome Bot.",
    "version": "1.0.0",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "start": "node ."
    },
    "keywords": ["discord", "bot"],
    "author": "me <me@myemail.com>",
    "license": "ISC"
}
```

After this we can create our `index.js` file next to our `package.json` file.

#### Installation.

Open up a Terminal Window in the working directory we created above.

Now we can install `discord.js` and `discord-sensei` as such:

```bash
npm install --save discord.js discord-sensei
```

#### Running The Bot.

If you haven't already, this would be the perfect time to Open up your Working Directory in a Text Editor of your Choice.

Edit your `index.js` file and fill it with:

```javascript
const { SenseiClient } = require("discord-sensei");
const path = require("path");

const client = new SenseiClient({
  prefixes: ["p!"],
  commandsDirectory: path.join(__dirname, "/commands")
});

client.login("YOUR.BOT.TOKEN");
```

Run the Bot using:

```npm start```

If everything goes well, you should see these logs:

```bash
[Progress]: Beginning Startup Process. [1/4]
[Progress]: Saving Configuration. [2/4]
[Progress]: Starting Registry of System Events. [3/4]
[Progress]: Bot Logged In & Ready! [4/4]
[OK]: Watching for command events..
```
