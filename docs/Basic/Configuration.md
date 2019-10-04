### Configuration Object
The object that is passed as an Argument to the "configure()" method has a few properties that need to be Specified for it to work properly.

These are the properties that are required to be in this Object.
#### 1.) Token
These properties are:
```javascript
token: "the.bot.token" // The Bot Token that is required to Login as the Bot.
```
This property is the Token of the Bot that is used to Login into Discord.

#### 2.) Prefixes Array
```javascript
prefixes: [
    "prefix1",
    "prefix2",
    "p!"
]
```
An array of the Prefixes that the bot understands. A Bot may have atleast 1 Prefix to Work but alternative prefixes can be specified.

#### 3.) Error Reporting
```javascript
reportErrors: true // Dictates whether All Errors should be reported to the Discord User or not.
```
This property determines If even the smallest of errors should be reported to the user or not.<br>Note that If the user attempts to use a command with incorrect syntax, Those types of errors will be reported but If the user tries to execute a command that doesn't exist then those types of errors will not be reported if this is set to false.<br>

This is an optional property. Its value is set to "false" by default.

#### 4.) Cooldown Settings
```javascript
cooldowns: {
    type: "command" // Cooldowns Type. "command" or "system".
    systemCooldown: 10 // Duration of the Cooldown if the type is set to "system"
}
```
This property is an object which determines how Cooldowns should work in the bot.<br>

If `cooldowns.type` is set to "command", Then the cooldowns will be applied on a command basis (User can execute other commands but cannot execute the same command for a certain amount of seconds).<br>
If `cooldowns.type` is set to "system", Then the User will not be able to execute *any* command until the cooldown duration is over.
<br>

`cooldowns.systemCooldown` determines the duration of the Cooldown *IF* `cooldowns.type` is set to "system". If the `cooldowns.type` is set to "command" then the Duration specified in the Command will be used instead.

#### 5.) Commands Directory
```javascript
commandsDirectory: path.join(__dirname, "/commands") // The Full Path to the Directory where Command Files are saved.
```
This property is the path of the Commands Source Directory. The Commands Directory is the folder where all the command files are saved. The bot assumes that the command files are saved in this Directory and only reads from here.<br>

Additional directories may be created under the Commands directory for keeping everything organized e.g. Moderation commands under their own specific directory. You can read more about this [here](https://github.com/Demonicious/sensei/wiki/commands).

#### 6.) Information
```javascript
info: {
    name: "The Name of the Bot",
    version: "The Current Version of the Bot",
    author: {
        name: "The Real/Online Name of the Author",
        username: "The Discord Username of the Author",
        email: "The Support E-Mail of the Author".
    }
}
```
This property holds some information about the bot that may be used for Logging or providing Information to the users.<br>
The Framework doesn't use this information for anything. So this is optional but it may be useful to someone who's using this Framework.

#### 7.) Setting Custom Properties
```javascript
custom: {
   myCustomProperty: "The Value of my Custom Property",
}
```
This is another Optional Property that can be used to set Custom Properties in the bot that can later be used later as such: ```bot.custom.myCustomProperty``` inside your code anywhere. This is useful for Declaring some useful information such as.. You may want to declare some kind of custom "primaryColor" property that holds color codes which you may then use inside your RichEmbeds as such ```richEmbed.setColor(bot.custom.primaryColor)```.<br>

Some custom properties are pre-declared. These are:
```
custom.footerText = "SenseiBot";
custom.primaryColor = "#5f5ac6";
custom.secondaryColor = "#8e7878";
custom.errorColor = "#ef2e2e";
custom.successColor = "#68c73f";
```
These are used by the Bot for Showing Errors to the User. To edit these properties you must specify their values in the "custom" propertie.<br>

I'd let the user think of more use cases :)

#### 8.) Full Example of a "main.js" file.

```javascript
const { SenseiClient } = require("sensei.djs");
const path = require("path");

const bot = new SenseiClient;
bot.configure({
    // The Login Token of My Bot.
    token: "BOT.TOKEN.HERE",
    // The Prefixes I want this bot to understand.
    prefixes: [
        "r>",
        "rave>"
    ],
    // Whether even the smallest of errors should be reported to the User or Not.
    reportErrors: true,
    // How should the Cooldowns work in the bot.
    cooldowns: {
        type: "command",
        systemCooldown: 10
    },
    // Where all my commands are stored.
    commandsDirectory: path.join(__dirname, "/commands"),
    // Some Information about the Bot (Optional Property)
    info: {
        name: "RAVE",
        version: "1.0.0",
        author: {
            name: "Mudassar Islam",
            username: "Demonicious#9560",
            email: "demoncious@gmail.com",
        }
    },
    // Some Custom Properties that I want to be held in the "bot" object.
    custom: {
        // I declared this footerText property so that I can use it in my RichEmbeds without typing out everything manually.
        footerText: "Footer Text",
    }
});

bot.start();
```
