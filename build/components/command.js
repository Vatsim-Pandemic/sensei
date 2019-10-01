"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    run(bot, message, args) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    reportError(bot, message, messages) {
        let rb = new discord_js_1.default.RichEmbed;
        rb.setColor(bot.errorColor);
        let errString = "";
        let index = 1;
        messages.forEach(message => {
            errString += `\n${index}.) ${message}`;
            index++;
        });
        errString += `\n\nPlease see ${bot.prefixes[0]}help ${this.names[0]}`;
        rb.setTitle("The following errors occured:")
            .setDescription(errString)
            .setFooter(bot.footerText)
            .setTimestamp();
        message.reply(rb);
        return;
    }
    splitArgs(content) {
        return content.split(/\s+/g);
    }
    isNum(toTest) {
        return /^\d+$/.test(toTest);
    }
    execute(bot, message, content) {
        return __awaiter(this, void 0, void 0, function* () {
            let args = this.splitArgs(content);
            let argObject = [];
            let errors = [];
            if (this.arguments.length > 0 && this.arguments.length <= args.length) {
                let index = 0;
                for (let argType in this.arguments) {
                    switch (this.arguments[index].type) {
                        case "string":
                            argObject.push({
                                name: this.arguments[index].name,
                                type: this.arguments[index].type,
                                value: args[index],
                            });
                            break;
                        case "number":
                            if (this.isNum(args[index])) {
                                argObject.push({
                                    name: this.arguments[index].name,
                                    type: this.arguments[index].type,
                                    value: args[index],
                                });
                            }
                            else {
                                errors.push(`Argument No.${index + 1} should be a number.`);
                            }
                        case "user_mention":
                            if (args[index].length == 21) {
                                if (args[index].includes("<@") && args[index].includes(">")) {
                                    if (this.isNum(args[index].replace("<@", "").replace(">", ""))) {
                                        argObject.push({
                                            name: this.arguments[index].name,
                                            type: this.arguments[index].type,
                                            value: args[index],
                                        });
                                    }
                                }
                                else {
                                    errors.push(`Argument No.${index + 1} should be a Mentioned User.`);
                                }
                            }
                            else {
                                errors.push(`Argument No.${index + 1} should be a Mentioned User.`);
                            }
                            break;
                        case "role_mention":
                            if (args[index].length == 22) {
                                if (args[index].includes("<@&") && args[index].includes(">")) {
                                    if (this.isNum(args[index].replace("<@&", "").replace(">", ""))) {
                                        argObject.push({
                                            name: this.arguments[index].name,
                                            type: this.arguments[index].type,
                                            value: args[index],
                                        });
                                    }
                                }
                                else {
                                    errors.push(`Argument No.${index + 1} should be a Mentioned Role.`);
                                }
                            }
                            else {
                                errors.push(`Argument No.${index + 1} should be a Mentioned Role.`);
                            }
                            break;
                        case "channel_mention":
                            if (args[index].length == 21) {
                                if (args[index].includes("<#") && args[index].includes(">")) {
                                    if (this.isNum(args[index].replace("<#", "").replace(">", ""))) {
                                        argObject.push({
                                            name: this.arguments[index].name,
                                            type: this.arguments[index].type,
                                            value: args[index],
                                        });
                                    }
                                }
                                else {
                                    errors.push(`Argument No.${index + 1} should be a Mentioned Channel.`);
                                }
                            }
                            else {
                                errors.push(`Argument No.${index + 1} should be a Mentioned Channel.`);
                            }
                            break;
                    }
                    index++;
                }
                if (errors.length == 0) {
                    yield this.run(bot, message, argObject);
                }
                else {
                    this.reportError(bot, message, errors);
                }
            }
            else {
                this.reportError(bot, message, ["Insufficient arguments provided."]);
            }
        });
    }
}
exports.SenseiCommand = SenseiCommand;
