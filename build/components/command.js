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
Object.defineProperty(exports, "__esModule", { value: true });
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
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`${this.info.name} command was executed`);
        });
    }
    reportError(bot, message) {
        message.reply(`Invalid Syntax. Please see ${bot.prefixes[0]}help ${this.names[0]}`);
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
            let errors = 0;
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
                                this.reportError(bot, message);
                                errors++;
                            }
                        case "user":
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
                                    this.reportError(bot, message);
                                    errors++;
                                }
                            }
                            else {
                                this.reportError(bot, message);
                                errors++;
                            }
                            break;
                        case "role":
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
                                    this.reportError(bot, message);
                                    errors++;
                                }
                            }
                            else {
                                this.reportError(bot, message);
                                errors++;
                            }
                            break;
                        case "channel":
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
                                    this.reportError(bot, message);
                                    errors++;
                                }
                            }
                            else {
                                this.reportError(bot, message);
                                errors++;
                            }
                            break;
                    }
                    index++;
                }
                if (errors == 0) {
                    yield this.run(bot, message, argObject);
                }
            }
            else {
                this.reportError(bot, message);
            }
        });
    }
}
exports.SenseiCommand = SenseiCommand;
