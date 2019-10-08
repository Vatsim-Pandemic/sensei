![Discord-Sensei](https://discord-sensei.js.org/img/logo.27982581.png)

## Creating the First Command.

If your Working Directory doesn't have a `/commands` directory, then this would be the time to do so.

*Note: The name of this directory doesn't have to be 'commands', It can be anything as long as you set the `commandsDirectory` property to the path of this directory in `index.js`*

This bot framework uses a separate file for each command, and this `/commands` directory will be used to hold all of our Command Files.

## Creating our Command File.

We could just create a new file directly under `/commands` but imagine you have a large bot with a lot of commands, It will easily get extremely tedious if all commands are just directly under the `/commands` directory.

To Fix this issue, we can simply create a sub-directory under `/commands`.

*Sub-Directories can be created under the `/commands` directory. Creating sub-directories doesn't hold any significance other than organizing.*<br>
*If you want to disable a command, you can create a sub-directory named `/_drafts` under `/commands` which will simply be ignored by the bot.*

We're gonna make a new directory named `./Interaction` under `/commands`. The name of this directory doesn't matter, I just went for "Interaction" because it makes sense to the type of commands that will be in this directory.

In our `./Interaction` Directory we're gonna create a new file named `HiCommand.js`. This will be an extremely basic command that just says Hi to a User.

## Writing the Code for The Command

Open up our newly created file in your favorite Text Editor.

The first thing to do is to require the `SenseiCommand` class from `discord-sensei`

### Requiring Modules.

```javascript
const { SenseiCommand } = require("discord-sensei");
```

I want the Bot to say Hi in a nicer way then just a message, So i'm deciding to use RichEmbeds. For that I will have to require `RichEmbed` from `discord.js`

```javascript
const { RichEmbed } = require("discord.js");
```

### Creating our Class.

We will declare a class named `HiCommand` that extends `SenseiCommand`. We're gonna define the Constructor method, and the first thing in the constructor method should be the super() method as such:

#### Declaration

```javascript
class HiCommand extends SenseiCommand {
  constructor() {
    super();
  }
}
```

#### Setting of Properties.

We're gonna use the Methods provided by `SenseiCommand` in the constructor method to set all of the different properties for this command.<br>
*[SenseiCommand Methods](https://discord-sensei.js.org/#/docs/main/stable/class/SenseiCommand)*

```javascript
class HiCommand extends SenseiCommand {
  constructor() {
    super();

    // Set the Name and Aliases
    this.setNames([
      "hi",
      "hello"
    ]);
    
    // Set the Category
    this.setCategory("Interaction");
    
    // Set the Information
    this.setInfo({
      name: "Hi Command",
      description: "Says Hi to Someone",
      syntax: "hi [Optional User Mention]"
    });
    
    // Set the Arguments. We will only have 1 Optional Argument for this Command.
    this.setArguments([
      {
        name: "user",
        type: "USER_MENTION",
        optional: true,
        default: "MESSAGE_AUTHOR" // If the User doesn't pass this argument, the Message Author will be the default value.
      }
    ]);
  }
}
```

### Creating our Run Method.

After this we need to define our run() method in the Class. This is the actual code that will be executed by the Bot.
We need to follow a Specific Syntax for the run() method's definition; [run() Method](https://discord-sensei.js.org/#/docs/main/stable/class/SenseiCommand?scrollTo=run)

The run method is declared as such in the class:

```javascript
async run(bot, message, args) {}
```

Here, the `bot` is the [SenseiClient](https://discord-sensei.js.org/#/docs/main/stable/class/SenseiClient) Object. The `message` is the [Message](https://discord.js.org/#/docs/main/stable/class/Message) that triggered the command.<br>`args` is an Object containing the Arguments this command was executed with. We can access the values of the arguments we defined above using their `name` as such:
```javascript
console.log(args.user);
// Will log the value of the argument with the name 'user' we defined above.
```

The run() method definition for this command will be like this:

```javascript
async run(bot, message, args) {
  let rb = new RichEmbed;
  rb.setDescription(`Hi ${args.user.username}`)
  .setColor("#68c73f")
  .setFooter("My Awesome Bot")
  .setTimestamp();
  
  message.channel.send(rb);
  return;
}
```

### Exporting our Command Class.

To actually make it so that the Bot can use this command, we need to export our newly created class at the end of the file as such:

```javascript
module.exports = HiCommand;
```

## Full Code.

This is how our entire command file should look like (without comments)

```javascript
const { SenseiCommand } = require("discord-sensei");
const { RichEmbed } = require("discord.js");

class HiCommand extends SenseiCommand {
  constructor() {
    super();
    this.setNames([
      "hi",
      "hello"
    ]);
    this.setCategory("Interaction");
    this.setInfo({
      name: "Hi Command",
      description: "Says Hi to Someone",
      syntax: "hi [Optional User Mention]"
    });
    this.setArguments([
      {
        name: "user",
        type: "USER_MENTION",
        optional: true,
        default: "MESSAGE_AUTHOR"
      }
    ]);
  }
  
  async run(bot, message, args) {
    let rb = new RichEmbed;
    rb.setDescription(`Hi ${args.user.username}`)
    .setColor("#68c73f")
    .setFooter("My Awesome Bot")
    .setTimestamp();

    message.channel.send(rb);
    return;
  }
}

module.exports = HiCommand;
```

This should be the response of the Bot when you try to execute this command:

![Proof](https://discord-sensei.js.org/img/command1.jpeg)

You might wanna take a look at [this](https://discord-sensei.js.org/#/docs/main/stable/basic/directorystructure) to get an idea of how your directory structure might look when you're working with this.

After that, you can get right into creating Awesome Commands. You can find some snippets on the left sidebar of this page!
