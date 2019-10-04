import Discord from "discord.js";
import { SenseiClient, Logger } from "../sensei";

interface CommandInfo {
    name : string,
    description : string,
    syntax : string,
}

interface ArgumentObject {
    name : string,
    type : "user_mention" | "role_mention" | "channel_mention" | "text" | "number",
}

/**
 * @typedef {Object} CommandInfo
 * @property {string} name The Extensive Name of the command.
 * @property {string} description Short Description of the command.
 * @property {syntax} syntax The Basic Usage of the Command.
 */

/**
 * @typedef {Object} ArgumentObject
 * @property {string} name The Name of the Argument. This is used to access this argument later in the run() method.
 * @property {"user_mention" | "role_mention" | "channel_mention" | "text" | "number"} type The Type of the Argument.
 */

/**
 * Represents a Command that can be executed by [SenseiClient](SenseiClient.html).
 * @property {String[]} names An Array of the Names of this Command. The First item of the array is the main Name, others are aliases.
 * @property {String} category The Category which this Command belongs to.
 * @property {CommandInfo} info Information about the Command.
 * @property {number} cooldown Duration of the Cooldown. Only Applicable if cooldowns.type is set to "command" in SenseiClient.
 * @property {ArgumentObject[]} arguments The Arguments Required for this Command.
 */
class SenseiCommand {
    // Properties
    
    // Public
    public names : string[];
    public category: string;
    public info : CommandInfo;
    public cooldown : number;
    
    protected arguments : ArgumentObject[];
    protected log : Logger = new Logger();

    /**
     * Creates a new SenseiCommand Object that can be used by a [SenseiClient](SenseiClient.html). All of the Properties Above need to be Defined in the Constructor of a Class that Extends this class.
     */
    constructor() {
        this.names = ["newcommand"];
        this.category = "SomeCategory";
        this.info = {
            name: "New Command",
            description: "An Un-edited SenseiCommand.",
            syntax: "newcommand"
        }
        this.cooldown = 5;
        this.arguments = [];
    }

    // Methods

    protected duplicateArguments() : boolean {
        if(this.arguments.length > 0) {
            let arr : string[] = [];
            this.arguments.forEach(argument => {
                arr.push(argument.name);
            })
            return (new Set(arr)).size !== arr.length;
        } else {
            return false;
        }
    }

    /**
     * The Code to be Executed when this Command is called by a Discord User. This Method needs to be Defined by the User inside a Command Class that Extends this SenseiCommand class.
     * @param {SenseiClient} bot The SenseiClient Object.
     * @param {Message} message The [Message](https://discord.js.org/#/docs/main/stable/class/Message) Object 
     * @param {Object} args The Arguments this message was sent with.
     * @example
     * // Here's how this method may be defined in a Command:
     * async run(bot, message, args) {
     *      let sender = message.author.username;
     *      let channel = message.channe;
     * 
     *      channel.send(`Hello ${sender}!. How are you doing ?`);
     *      return;
     * }
     */
    protected async run(bot : SenseiClient, message : Discord.Message, args? : any) : Promise<void> {}

    /**
     * This Method is used for Error Reporting (To the Discord User)
     * @param {SenseiClient} bot The SenseiClient Object.
     * @param {Message} message The [Message](https://discord.js.org/#/docs/main/stable/class/Message) Object 
     * @param {String[]} messages An array of messages to be included in the error.
     */
    protected reportError(bot : SenseiClient, message : Discord.Message, messages : string[]) : void {
        let rb : Discord.RichEmbed = new Discord.RichEmbed;
        rb.setColor(bot.custom.errorColor);
        
        let errString : string = "";
        let index = 1;
        messages.forEach(message => {
            errString += `\n${index}.) ${message}`;
            index++;
        })
        
        errString += `\n\n\`${bot.prefixes[0]}${this.info.syntax}\``; 

        rb.setTitle("The following errors occured:")
        .setDescription(errString)
        .setFooter(bot.custom.footerText)
        .setTimestamp();

        message.channel.send(rb);
        return;
    }

    public isNum(toTest : any) : boolean {
        return /^\d+$/.test(toTest);
    }
    public async execute(bot : SenseiClient, message : Discord.Message, args : string[]) : Promise<void> {
        if(this.duplicateArguments()) {
            this.log.warn(`Same name used for multiple arguments in '${this.names[0]}' command. Command cannot be used in the Bot until this error has been fixed.`);
        } else {
            let argObject : any = {};

            let errors : string[] = [];
    
            if(this.arguments.length > 0 && this.arguments.length <= args.length) {
                let index : number = 0;
    
                // Used for Sending the Mentioned Objects as Arguments.
                let userIndex : number = 0;
                let userMentions : Discord.User[] = message.mentions.users.array();
                let roleIndex : number = 0;
                let roleMentions : Discord.Role[] = message.mentions.roles.array();
                let channelIndex : number = 0;
                let channelMentions : Discord.GuildChannel[] = message.mentions.channels.array();
    
                for(let argType in this.arguments) {
                    switch(this.arguments[index].type) {
                        case "text":
                            argObject.push(this);
                            break;
                        case "number":
                            if(this.isNum(args[index])) {
                                argObject[this.arguments[index].name] = Number(args[index]);
                            } else {
                                errors.push(`Argument must be a Number.`);
                            }
                            break;
                        case "user_mention":
                            if(args[index].length == 21) {
                                if(args[index].includes("<@") && args[index].includes(">")) {
                                    if(this.isNum(args[index].replace("<@", "").replace(">", ""))) {
                                        argObject[this.arguments[index].name] = userMentions[userIndex];
                                        userIndex++;
                                    }
                                } else {
                                    errors.push(`Argument must be a Mentioned User.`);
                                }
                            } else {
                                errors.push(`Argument must be a Mentioned User.`);
                            }
                            break;
                        case "role_mention":
                            if(args[index].length == 22) {
                                if(args[index].includes("<@&") && args[index].includes(">")) {
                                    if(this.isNum(args[index].replace("<@&", "").replace(">", ""))) {
                                        argObject[this.arguments[index].name] = roleMentions[roleIndex];
                                        roleIndex++;
                                    }
                                } else {
                                    errors.push(`Argument must be a Mentioned Role.`);
                                }
                            } else {
                                errors.push(`Argument must be a Mentioned Role.`);
                            }
                            break;
                        case "channel_mention":
                            if(args[index].length == 21) {
                                if(args[index].includes("<#") && args[index].includes(">")) {
                                    if(this.isNum(args[index].replace("<#", "").replace(">", ""))) {
                                        argObject[this.arguments[index].name] = channelMentions[channelIndex];
                                        channelIndex++;
                                   }
                                } else {
                                    errors.push(`Argument must be a Mentioned Channel.`);
                                }
                            } else {
                                errors.push(`Argument must be a Mentioned Channel.`);
                            }
                            break;
                    }
                    index++;
                }

                if(args.length != index + 1) {
                    argObject.optional = {};
                    for(let i = index + 1; i < args.length; i++) {
                        argObject.optional[i] = args[i];
                    }
                }
    
                if(errors.length == 0) {
                    bot.cmdMemory.add(message.author.id + "<->" + this.names[0]);
                    bot.sysMemory.add(message.author.id);
                    setTimeout(() => {
                        bot.cmdMemory.delete(message.author.id + "<->" + this.names[0]);
                    }, this.cooldown * 1000);
                    setTimeout(() => {
                        bot.sysMemory.delete(message.author.id);
                    }, bot.cooldowns.systemCooldown * 1000);
                    this.run(bot, message, argObject);
                } else {
                    this.reportError(bot, message, errors);
                }
            } else {
                this.reportError(bot, message, ["Insufficient arguments provided."]);
            }   
        }
    }
}

export { SenseiCommand };