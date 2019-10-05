import Discord, { PermissionResolvable } from "discord.js";
import { SenseiClient, Logger } from "../sensei";
import path from "path";

interface CommandInfo {
    name : string,
    description : string,
    syntax : string,
}

/**
 * @typedef {"USER_MENTION" | "ROLE_MENTION" | "CHANNEL_MENTION" | "string" | "number"} ArgumentTypeResolvable
 * @typedef {"MESSAGE_AUTHOR" | "MESSAGE_CHANNEL" | "MESSAGE_GUILD" | string | number} ArgumentDefaultResolvable
 */

type ArgumentTypeResolvable = "USER_MENTION" | "ROLE_MENTION" | "CHANNEL_MENTION" | "string" | "number";
type ArgumentDefaultResolvable = "MESSAGE_AUTHOR" | "MESSAGE_CHANNEL" | "MESSAGE_GUILD" | string | number;

interface ArgumentObject {
    name : string,
    type : ArgumentTypeResolvable,
    optional : boolean,
    default? : ArgumentDefaultResolvable,
}

/**
 * @typedef {Object} CommandInfo
 * @property {string} name The Extensive Name of the command.
 * @property {string} description Short Description of the command.
 * @property {string} syntax The Basic Usage of the Command.
 */

/**
 * @typedef {Object} ArgumentObject
 * @property {string} name The Name of the Argument. This is used to access this argument later in the run() method.
 * @property {ArgumentTypeResolvable} type The Type of the Argument.
 * @property {boolean} optional Whether the Argument is Optional or not.
 * @property {ArgumentDefaultResolvable} default The Default value (if set) of this Argument (Only Applicable if Argument is Optional)
 */

/**
 * Represents a Command that can be executed by [SenseiClient](SenseiClient.html).
 */
class SenseiCommand {
    // Properties
    
    // Public

    /**
     * Array of Names of the Command.
     * @type {string[]}
     */
    public names : string[] = ["newcommand"];

    /**
     * The Category which this Command Belongs To.
     * @type {string}
     */
    public category: string = "SomeCategory";

    /**
     * Information About the Command
     * @type {CommandInfo}
     */
    public info : CommandInfo = {
        name: "New Command",
        description: "An Un-edited SenseiCommand.",
        syntax: "newcommand"
    };

    /**
     * The Cooldown Duration of this Command (If Applicable)
     * @type {number}
     */
    public cooldown : number = 5;
    
    /**
     * The Array of Arguments this command requires.
     * @type {ArgumentObject[]}
     */
    protected arguments : ArgumentObject[] = [];

    /**
     * An Object of type Logger that is used to Log messages to the console.
     * @type {Logger}
     */
    protected log : Logger = new Logger();

    /**
     * The Permissions required to execute this command. By default no permission checks are applied.
     * @type {PermissionResolvable[]}
     */
    protected permissions : PermissionResolvable[] = [];

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

    /**
     * Used to set the Name(s) of the Command.
     * @param {string[]} namesArray The Array of Names.
     */
    protected setNames(namesArray : string[]) {
        if(namesArray.length > 0) {
            namesArray.forEach((name, index) => {
                namesArray[index] = name.toLowerCase();
            })
            this.names = namesArray;
        } else {
            this.log.error(`Array of Names cannot be Empty. ${__filename}`);
            process.exit();
        }
        return this;
    }

    /**
     * Used to set the Category of the Command.
     * @param {string} category Category Name.
     */
    protected setCategory(category : string) {
        if(category != "") {
            this.category = category;
        } else {
            this.log.error(`Category name can't be empty. ${__filename}`);
            process.exit();
        }
        return this;
    }

    /**
     * Used to set some Information about the Command
     * @param {CommandInfo} info 
     */
    protected setInfo(info : CommandInfo) {
        if(info != undefined) {
            this.info = info;
        } else {
            this.log.error(`Invalid Command Information Object provided. ${__filename}. https://discord-sensei.js.org/#/docs/main/stable/typedef/CommandInfo`);
            process.exit();
        }
        return this;
    }

    /**
     * Used to set the Cooldown Duration of the Command.
     * @param {number} duration The Duration in Seconds.
     */
    protected setCooldown(duration : number) {
        if(duration > 0) {
            this.cooldown = duration;
        } else {
            this.log.error(`Duration must be greater than 0. ${__filename}`);
            process.exit();
        }
        return this;
    }

    /**
     * Used to set the Arguments for the Command
     * @param {ArgumentObject[]} argumentsArray Array of Arguments
     */
    protected setArguments(argumentsArray : ArgumentObject[]) {
        if(argumentsArray.length > 0) {
            this.arguments = argumentsArray;
        } else {
            this.log.error(`Argument Array can't be empty. ${__filename}`);
            process.exit();
        }
        return this;
    }

    /**
     * Used to set the Permissions required to Execute this command;
     * @param {PermissionResolvable[]} permissionsArray Array of [PermissionResolvable](https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS)
     */
    protected setPermissions(permissionsArray : PermissionResolvable[]) {
        if(permissionsArray.length > 0) {
            this.permissions = permissionsArray;
        } else {
            this.log.error(`Permissions Array can't be empty. ${__filename}`);
            process.exit();
        }
        return this;
    }
     
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

    /**
     * This Method is used to check if the User has the necessary permissions required to Execute this command.
     * @param {Discord.GuildMember} member The [GuildMember](https://discord.js.org/#/docs/main/stable/class/GuildMember) to Check. 
     * @returns {Boolean}
     * @private
     */
    protected verifyPermissions(member : Discord.GuildMember) : boolean {
        let errors : number = 0;
        this.permissions.forEach(permission => {
            if(!member.hasPermission(permission)) {
                errors++;
            }
        })
        if(errors > 0) return false;
        else return true;
    }

    public async execute(bot : SenseiClient, message : Discord.Message, args : string[]) : Promise<void> {
        if(this.duplicateArguments()) {
            this.log.warn(`Same name used for multiple arguments in '${this.names[0]}' command. Command cannot be used in the Bot until this error has been fixed.`);
        } else {
            if(this.verifyPermissions(message.member)) {
                let argObject : any = {};
                let errors : string[] = [];
        
                let required : ArgumentObject[] = [];
                let optional : ArgumentObject[] = [];
                let contradictions = 0;
                this.arguments.forEach((argument, index) => {
                    if(!argument.optional) required.push(argument);
                    else optional.push(argument);
                    if(index + 1 != this.arguments.length) {
                        if(argument.optional && !this.arguments[index + 1].optional) {
                            this.log.error(`Optional Argument: '${argument.name}' comes before Required Argument: '${this.arguments[index + 1].name}'. Command: '${this.names[0]}'`);
                            contradictions++;
                            return;
                        }
                    }
                })

                let argumentsList : ArgumentObject[] = [];
                argumentsList.push(...required);
                argumentsList.push(...optional);

                if(contradictions != 0) {
                    console.log(this.arguments);
                    this.log.error("Required Arguments must come before Optional Arguments and Optional Arguments must come after Required Arguments");
                    this.log.error("Please Fix the Order of the Arguments");

                    if(this.reportError) {
                        this.reportError(bot, message, ["System Error."]);
                    }
                } else if(argumentsList.length > 0 && required.length <= args.length) {
                    let index : number = 0;
        
                    // Used for Sending the Mentioned Objects as Arguments.
                    let userIndex : number = 0;
                    let userMentions : Discord.User[] = message.mentions.users.array();
                    let roleIndex : number = 0;
                    let roleMentions : Discord.Role[] = message.mentions.roles.array();
                    let channelIndex : number = 0;
                    let channelMentions : Discord.GuildChannel[] = message.mentions.channels.array();
        
                    for(let arg in argumentsList) {
                        if(args[index] != undefined) {
                            switch(argumentsList[index].type) {
                                case "string":
                                    argObject.push(this);
                                    break;
                                case "number":
                                    if(this.isNum(args[index])) {
                                        argObject[argumentsList[index].name] = Number(args[index]);
                                    } else {
                                        errors.push(`Argument must be a Number.`);
                                    }
                                    break;
                                case "USER_MENTION":
                                    if(args[index].length == 21) {
                                        if(args[index].includes("<@") && args[index].includes(">")) {
                                            if(this.isNum(args[index].replace("<@", "").replace(">", ""))) {
                                                argObject[argumentsList[index].name] = userMentions[userIndex];
                                                userIndex++;
                                            }
                                        } else {
                                            errors.push(`Argument must be a Mentioned User.`);
                                        }
                                    } else {
                                        errors.push(`Argument must be a Mentioned User.`);
                                    }
                                    break;
                                case "ROLE_MENTION":
                                    if(args[index].length == 22) {
                                        if(args[index].includes("<@&") && args[index].includes(">")) {
                                            if(this.isNum(args[index].replace("<@&", "").replace(">", ""))) {
                                                argObject[argumentsList[index].name] = roleMentions[roleIndex];
                                                roleIndex++;
                                            }
                                        } else {
                                            errors.push(`Argument must be a Mentioned Role.`);
                                        }
                                    } else {
                                        errors.push(`Argument must be a Mentioned Role.`);
                                    }
                                    break;
                                case "CHANNEL_MENTION":
                                    if(args[index].length == 21) {
                                        if(args[index].includes("<#") && args[index].includes(">")) {
                                            if(this.isNum(args[index].replace("<#", "").replace(">", ""))) {
                                                argObject[argumentsList[index].name] = channelMentions[channelIndex];
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
                        } else if(argumentsList[index].optional) {
                            if(argumentsList[index].default != undefined) {
                                let def = argumentsList[index].default;
                                if(def == "MESSAGE_AUTHOR") {
                                    argObject[argumentsList[index].name] = message.author;
                                } else if(def == "MESSAGE_CHANNEL") {
                                    argObject[argumentsList[index].name] = message.channel;
                                } else if(def == "MESSAGE_GUILD") {
                                    argObject[argumentsList[index].name] = message.guild;
                                } else {
                                    argObject[argumentsList[index].name] = def;
                                }
                            } else {
                                argObject[argumentsList[index].name] = "unset";
                            }
                        }
                        index++;
                    }

                    /* for(let argType in args) {
                        switch(argumentsList[index].type) {
                            case "string":
                                argObject.push(this);
                                break;
                            case "number":
                                if(this.isNum(args[index])) {
                                    argObject[argumentsList[index].name] = Number(args[index]);
                                } else {
                                    errors.push(`Argument must be a Number.`);
                                }
                                break;
                            case "USER_MENTION":
                                if(args[index].length == 21) {
                                    if(args[index].includes("<@") && args[index].includes(">")) {
                                        if(this.isNum(args[index].replace("<@", "").replace(">", ""))) {
                                            argObject[argumentsList[index].name] = userMentions[userIndex];
                                            userIndex++;
                                        }
                                    } else {
                                        errors.push(`Argument must be a Mentioned User.`);
                                    }
                                } else {
                                    errors.push(`Argument must be a Mentioned User.`);
                                }
                                break;
                            case "ROLE_MENTION":
                                if(args[index].length == 22) {
                                    if(args[index].includes("<@&") && args[index].includes(">")) {
                                        if(this.isNum(args[index].replace("<@&", "").replace(">", ""))) {
                                            argObject[argumentsList[index].name] = roleMentions[roleIndex];
                                            roleIndex++;
                                        }
                                    } else {
                                        errors.push(`Argument must be a Mentioned Role.`);
                                    }
                                } else {
                                    errors.push(`Argument must be a Mentioned Role.`);
                                }
                                break;
                            case "CHANNEL_MENTION":
                                if(args[index].length == 21) {
                                    if(args[index].includes("<#") && args[index].includes(">")) {
                                        if(this.isNum(args[index].replace("<#", "").replace(">", ""))) {
                                            argObject[argumentsList[index].name] = channelMentions[channelIndex];
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
                    } */
        
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
            } else {
                this.reportError(bot, message, [
                    "You aren't permitted to execute this command."
                ]);
            }
        }
    }
}

export = SenseiCommand;