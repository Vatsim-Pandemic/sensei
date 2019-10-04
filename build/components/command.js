"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    /**
     * Creates a new SenseiCommand Object that can be used by a [SenseiClient](SenseiClient.html). All of the Properties Above need to be Defined in the Constructor of a Class that Extends this class.
     */
    constructor() {
        this.log = new sensei_1.Logger();
        this.names = ["newcommand"];
        this.category = "SomeCategory";
        this.info = {
            name: "New Command",
            description: "An Un-edited SenseiCommand.",
            syntax: "newcommand"
        };
        this.cooldown = 5;
        this.arguments = [];
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
    async execute(bot, message, args) {
        if (this.duplicateArguments()) {
            this.log.warn(`Same name used for multiple arguments in '${this.names[0]}' command. Command cannot be used in the Bot until this error has been fixed.`);
        }
        else {
            let argObject = {};
            let errors = [];
            if (this.arguments.length > 0 && this.arguments.length <= args.length) {
                let index = 0;
                // Used for Sending the Mentioned Objects as Arguments.
                let userIndex = 0;
                let userMentions = message.mentions.users.array();
                let roleIndex = 0;
                let roleMentions = message.mentions.roles.array();
                let channelIndex = 0;
                let channelMentions = message.mentions.channels.array();
                for (let argType in this.arguments) {
                    switch (this.arguments[index].type) {
                        case "text":
                            argObject.push(this);
                            break;
                        case "number":
                            if (this.isNum(args[index])) {
                                argObject[this.arguments[index].name] = Number(args[index]);
                            }
                            else {
                                errors.push(`Argument must be a Number.`);
                            }
                            break;
                        case "user_mention":
                            if (args[index].length == 21) {
                                if (args[index].includes("<@") && args[index].includes(">")) {
                                    if (this.isNum(args[index].replace("<@", "").replace(">", ""))) {
                                        argObject[this.arguments[index].name] = userMentions[userIndex];
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
                        case "role_mention":
                            if (args[index].length == 22) {
                                if (args[index].includes("<@&") && args[index].includes(">")) {
                                    if (this.isNum(args[index].replace("<@&", "").replace(">", ""))) {
                                        argObject[this.arguments[index].name] = roleMentions[roleIndex];
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
                        case "channel_mention":
                            if (args[index].length == 21) {
                                if (args[index].includes("<#") && args[index].includes(">")) {
                                    if (this.isNum(args[index].replace("<#", "").replace(">", ""))) {
                                        argObject[this.arguments[index].name] = channelMentions[channelIndex];
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
                    index++;
                }
                if (args.length != index + 1) {
                    argObject.optional = {};
                    for (let i = index + 1; i < args.length; i++) {
                        argObject.optional[i] = args[i];
                    }
                }
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
    }
}
exports.SenseiCommand = SenseiCommand;
//# sourceMappingURL=command.js.map