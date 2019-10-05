"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = __importDefault(require("discord.js"));
const sensei_1 = require("../sensei");
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
    constructor() {
        // Properties
        // Public
        /**
         * Array of Names of the Command.
         * @type {string[]}
         */
        this.names = ["newcommand"];
        /**
         * The Category which this Command Belongs To.
         * @type {string}
         */
        this.category = "SomeCategory";
        /**
         * Information About the Command
         * @type {CommandInfo}
         */
        this.info = {
            name: "New Command",
            description: "An Un-edited SenseiCommand.",
            syntax: "newcommand"
        };
        /**
         * The Cooldown Duration of this Command (If Applicable)
         * @type {number}
         */
        this.cooldown = 5;
        /**
         * The Array of Arguments this command requires.
         * @type {ArgumentObject[]}
         */
        this.arguments = [];
        /**
         * An Object of type Logger that is used to Log messages to the console.
         * @type {Logger}
         */
        this.log = new sensei_1.Logger();
        /**
         * The Permissions required to execute this command. By default no permission checks are applied.
         * @type {PermissionResolvable[]}
         */
        this.permissions = [];
    }
    // Methods
    duplicateArguments() {
        if (this.arguments.length > 0) {
            let arr = [];
            this.arguments.forEach(argument => {
                arr.push(argument.name);
            });
            return (new Set(arr)).size !== arr.length;
        }
        else {
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
    setNames(namesArray) {
        if (namesArray.length > 0) {
            namesArray.forEach((name, index) => {
                namesArray[index] = name.toLowerCase();
            });
            this.names = namesArray;
        }
        else {
            this.log.error(`Array of Names cannot be Empty. ${__filename}`);
            process.exit();
        }
        return this;
    }
    /**
     * Used to set the Category of the Command.
     * @param {string} category Category Name.
     */
    setCategory(category) {
        if (category != "") {
            this.category = category;
        }
        else {
            this.log.error(`Category name can't be empty. ${__filename}`);
            process.exit();
        }
        return this;
    }
    /**
     * Used to set some Information about the Command
     * @param {CommandInfo} info
     */
    setInfo(info) {
        if (info != undefined) {
            this.info = info;
        }
        else {
            this.log.error(`Invalid Command Information Object provided. ${__filename}. https://discord-sensei.js.org/#/docs/main/stable/typedef/CommandInfo`);
            process.exit();
        }
        return this;
    }
    /**
     * Used to set the Cooldown Duration of the Command.
     * @param {number} duration The Duration in Seconds.
     */
    setCooldown(duration) {
        if (duration > 0) {
            this.cooldown = duration;
        }
        else {
            this.log.error(`Duration must be greater than 0. ${__filename}`);
            process.exit();
        }
        return this;
    }
    /**
     * Used to set the Arguments for the Command
     * @param {ArgumentObject[]} argumentsArray Array of Arguments
     */
    setArguments(argumentsArray) {
        if (argumentsArray.length > 0) {
            this.arguments = argumentsArray;
        }
        else {
            this.log.error(`Argument Array can't be empty. ${__filename}`);
            process.exit();
        }
        return this;
    }
    /**
     * Used to set the Permissions required to Execute this command;
     * @param {PermissionResolvable[]} permissionsArray Array of [PermissionResolvable](https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS)
     */
    setPermissions(permissionsArray) {
        if (permissionsArray.length > 0) {
            this.permissions = permissionsArray;
        }
        else {
            this.log.error(`Permissions Array can't be empty. ${__filename}`);
            process.exit();
        }
        return this;
    }
    async run(bot, message, args) { }
    /**
     * This Method is used for Error Reporting (To the Discord User)
     * @param {SenseiClient} bot The SenseiClient Object.
     * @param {Message} message The [Message](https://discord.js.org/#/docs/main/stable/class/Message) Object
     * @param {String[]} messages An array of messages to be included in the error.
     */
    reportError(bot, message, messages) {
        let rb = new discord_js_1.default.RichEmbed;
        rb.setColor(bot.custom.errorColor);
        let errString = "";
        let index = 1;
        messages.forEach(message => {
            errString += `\n${index}.) ${message}`;
            index++;
        });
        errString += `\n\n\`${bot.prefixes[0]}${this.info.syntax}\``;
        rb.setTitle("The following errors occured:")
            .setDescription(errString)
            .setFooter(bot.custom.footerText)
            .setTimestamp();
        message.channel.send(rb);
        return;
    }
    isNum(toTest) {
        return /^\d+$/.test(toTest);
    }
    /**
     * This Method is used to check if the User has the necessary permissions required to Execute this command.
     * @param {Discord.GuildMember} member The [GuildMember](https://discord.js.org/#/docs/main/stable/class/GuildMember) to Check.
     * @returns {Boolean}
     * @private
     */
    verifyPermissions(member) {
        let errors = 0;
        this.permissions.forEach(permission => {
            if (!member.hasPermission(permission)) {
                errors++;
            }
        });
        if (errors > 0)
            return false;
        else
            return true;
    }
    async execute(bot, message, args) {
        if (this.duplicateArguments()) {
            this.log.warn(`Same name used for multiple arguments in '${this.names[0]}' command. Command cannot be used in the Bot until this error has been fixed.`);
        }
        else {
            if (this.verifyPermissions(message.member)) {
                let argObject = {};
                let errors = [];
                let required = [];
                let optional = [];
                let contradictions = 0;
                this.arguments.forEach((argument, index) => {
                    if (!argument.optional)
                        required.push(argument);
                    else
                        optional.push(argument);
                    if (index + 1 != this.arguments.length) {
                        if (argument.optional && !this.arguments[index + 1].optional) {
                            this.log.error(`Optional Argument: '${argument.name}' comes before Required Argument: '${this.arguments[index + 1].name}'. Command: '${this.names[0]}'`);
                            contradictions++;
                            return;
                        }
                    }
                });
                let argumentsList = [];
                argumentsList.push(...required);
                argumentsList.push(...optional);
                if (contradictions != 0) {
                    console.log(this.arguments);
                    this.log.error("Required Arguments must come before Optional Arguments and Optional Arguments must come after Required Arguments");
                    this.log.error("Please Fix the Order of the Arguments");
                    if (this.reportError) {
                        this.reportError(bot, message, ["System Error."]);
                    }
                }
                else if (argumentsList.length > 0 && required.length <= args.length) {
                    let index = 0;
                    // Used for Sending the Mentioned Objects as Arguments.
                    let userIndex = 0;
                    let userMentions = message.mentions.users.array();
                    let roleIndex = 0;
                    let roleMentions = message.mentions.roles.array();
                    let channelIndex = 0;
                    let channelMentions = message.mentions.channels.array();
                    for (let arg in argumentsList) {
                        if (args[index] != undefined) {
                            switch (argumentsList[index].type) {
                                case "string":
                                    argObject.push(this);
                                    break;
                                case "number":
                                    if (this.isNum(args[index])) {
                                        argObject[argumentsList[index].name] = Number(args[index]);
                                    }
                                    else {
                                        errors.push(`Argument must be a Number.`);
                                    }
                                    break;
                                case "USER_MENTION":
                                    if (args[index].length == 21) {
                                        if (args[index].includes("<@") && args[index].includes(">")) {
                                            if (this.isNum(args[index].replace("<@", "").replace(">", ""))) {
                                                argObject[argumentsList[index].name] = userMentions[userIndex];
                                                userIndex++;
                                            }
                                        }
                                        else {
                                            errors.push(`Argument must be a Mentioned User.`);
                                        }
                                    }
                                    else {
                                        errors.push(`Argument must be a Mentioned User.`);
                                    }
                                    break;
                                case "ROLE_MENTION":
                                    if (args[index].length == 22) {
                                        if (args[index].includes("<@&") && args[index].includes(">")) {
                                            if (this.isNum(args[index].replace("<@&", "").replace(">", ""))) {
                                                argObject[argumentsList[index].name] = roleMentions[roleIndex];
                                                roleIndex++;
                                            }
                                        }
                                        else {
                                            errors.push(`Argument must be a Mentioned Role.`);
                                        }
                                    }
                                    else {
                                        errors.push(`Argument must be a Mentioned Role.`);
                                    }
                                    break;
                                case "CHANNEL_MENTION":
                                    if (args[index].length == 21) {
                                        if (args[index].includes("<#") && args[index].includes(">")) {
                                            if (this.isNum(args[index].replace("<#", "").replace(">", ""))) {
                                                argObject[argumentsList[index].name] = channelMentions[channelIndex];
                                                channelIndex++;
                                            }
                                        }
                                        else {
                                            errors.push(`Argument must be a Mentioned Channel.`);
                                        }
                                    }
                                    else {
                                        errors.push(`Argument must be a Mentioned Channel.`);
                                    }
                                    break;
                            }
                        }
                        else if (argumentsList[index].optional) {
                            if (argumentsList[index].default != undefined) {
                                let def = argumentsList[index].default;
                                if (def == "MESSAGE_AUTHOR") {
                                    argObject[argumentsList[index].name] = message.author;
                                }
                                else if (def == "MESSAGE_CHANNEL") {
                                    argObject[argumentsList[index].name] = message.channel;
                                }
                                else if (def == "MESSAGE_GUILD") {
                                    argObject[argumentsList[index].name] = message.guild;
                                }
                                else {
                                    argObject[argumentsList[index].name] = def;
                                }
                            }
                            else {
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
                    if (errors.length == 0) {
                        bot.cmdMemory.add(message.author.id + "<->" + this.names[0]);
                        bot.sysMemory.add(message.author.id);
                        setTimeout(() => {
                            bot.cmdMemory.delete(message.author.id + "<->" + this.names[0]);
                        }, this.cooldown * 1000);
                        setTimeout(() => {
                            bot.sysMemory.delete(message.author.id);
                        }, bot.cooldowns.systemCooldown * 1000);
                        this.run(bot, message, argObject);
                    }
                    else {
                        this.reportError(bot, message, errors);
                    }
                }
                else {
                    this.reportError(bot, message, ["Insufficient arguments provided."]);
                }
            }
            else {
                this.reportError(bot, message, [
                    "You aren't permitted to execute this command."
                ]);
            }
        }
    }
}
module.exports = SenseiCommand;
//# sourceMappingURL=command.js.map