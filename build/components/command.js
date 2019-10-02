"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
class SenseiCommand {
    constructor() {
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
    async run(bot, message, args) { }
    reportError(bot, message, messages) {
        let rb = new discord_js_1.default.RichEmbed;
        rb.setColor(bot.errorColor);
        let errString = "";
        let index = 1;
        messages.forEach(message => {
            errString += `\n${index}.) ${message}`;
            index++;
        });
        errString += `\n\n\`${bot.prefixes[0]}${this.info.syntax}\``;
        rb.setTitle("The following errors occured:")
            .setDescription(errString)
            .setFooter(bot.footerText)
            .setTimestamp();
        message.channel.send(rb);
        return;
    }
    isNum(toTest) {
        return /^\d+$/.test(toTest);
    }
    async execute(bot, message, args) {
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
                    case "string":
                        argObject.push(this);
                        break;
                    case "number":
                        if (this.isNum(args[index])) {
                            argObject[this.arguments[index].name] = args[index];
                        }
                        else {
                            errors.push(`Argument must be a Number.`);
                        }
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
exports.SenseiCommand = SenseiCommand;
//# sourceMappingURL=command.js.map