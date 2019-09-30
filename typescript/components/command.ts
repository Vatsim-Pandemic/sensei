import Discord from "discord.js";
import { SenseiClient } from "./client";
import path from "path";

interface CommandInfo {
    name : string,
    description : string,
    syntax : string,
}

interface Argument {
    name : string,
    type : string,
}

interface ArgumentObject {
    name : string,
    type : string,
    value : string
}

class SenseiCommand {
    // Properties
    
    // Public
    public names : string[];
    public category: string;
    public info : CommandInfo;

    protected cooldown : number;
    protected arguments : Argument[];

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

    protected async run(bot : SenseiClient, message : Discord.Message, args? : ArgumentObject[]) : Promise<void> {
        console.log(`${this.info.name} command was executed`);
    }

    protected reportError(bot : SenseiClient, message : Discord.Message) {
        message.reply(`Invalid Syntax. Please see ${bot.prefixes[0]}help ${this.names[0]}`);
    }

    private splitArgs(content : string) {
        return content.split(/\s+/g);
    }

    public isNum(toTest : any) : boolean {
        return /^\d+$/.test(toTest);
    }
    public async execute(bot : SenseiClient, message : Discord.Message, content : string) : Promise<void> {
        let args : string[] = this.splitArgs(content);
        let argObject : ArgumentObject[] = [];

        let errors : number = 0;

        if(this.arguments.length > 0 && this.arguments.length <= args.length) {
            let index : number = 0;
            for(let argType in this.arguments) {
                switch(this.arguments[index].type) {
                    case "string":
                        argObject.push({
                            name: this.arguments[index].name,
                            type: this.arguments[index].type,
                            value: args[index],
                        });
                        break;
                    case "number":
                        if(this.isNum(args[index])) {
                            argObject.push({
                                name: this.arguments[index].name,
                                type: this.arguments[index].type,
                                value: args[index],
                            });
                        } else {
                            this.reportError(bot, message);
                            errors++;
                        }
                    case "user":
                        if(args[index].length == 21) {
                            if(args[index].includes("<@") && args[index].includes(">")) {
                                if(this.isNum(args[index].replace("<@", "").replace(">", ""))) {
                                    argObject.push({
                                        name: this.arguments[index].name,
                                        type: this.arguments[index].type,
                                        value: args[index],
                                    });
                                }
                            } else {
                                this.reportError(bot, message);
                                errors++;
                            }
                        } else {
                            this.reportError(bot, message);
                            errors++;
                        }
                        break;
                    case "role":
                        if(args[index].length == 22) {
                            if(args[index].includes("<@&") && args[index].includes(">")) {
                                if(this.isNum(args[index].replace("<@&", "").replace(">", ""))) {
                                    argObject.push({
                                        name: this.arguments[index].name,
                                        type: this.arguments[index].type,
                                        value: args[index],
                                    });
                                }
                            } else {
                                this.reportError(bot, message);
                                errors++;
                            }
                        } else {
                            this.reportError(bot, message);
                            errors++;
                        }
                        break;
                    case "channel":
                        if(args[index].length == 21) {
                            if(args[index].includes("<#") && args[index].includes(">")) {
                                if(this.isNum(args[index].replace("<#", "").replace(">", ""))) {
                                    argObject.push({
                                        name: this.arguments[index].name,
                                        type: this.arguments[index].type,
                                        value: args[index],
                                    });
                               }
                            } else {
                                this.reportError(bot, message);
                                errors++;
                            }
                        } else {
                            this.reportError(bot, message);
                            errors++;
                        }
                        break;
                }
                index++;
            }

            if(errors == 0) {
                await this.run(bot, message, argObject);
            }
        } else {
            this.reportError(bot, message);
        }
    }
}

export { SenseiCommand };