import Discord from "discord.js";
import { SenseiClient } from "./client";

interface CommandInfo {
    name : string,
    description : string,
    syntax : string,
}

interface Argument {
    name : string,
    type : string,
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

    protected async run(bot : SenseiClient, message : Discord.Message, args? : any) : Promise<void> {}

    protected reportError(bot : SenseiClient, message : Discord.Message, messages : string[]) : void {
        let rb : Discord.RichEmbed = new Discord.RichEmbed;
        rb.setColor(bot.errorColor);
        
        let errString : string = "";
        let index = 1;
        messages.forEach(message => {
            errString += `\n${index}.) ${message}`;
            index++;
        })
        
        errString += `\n\n\`${bot.prefixes[0]}${this.info.syntax}\``; 

        rb.setTitle("The following errors occured:")
        .setDescription(errString)
        .setFooter(bot.footerText)
        .setTimestamp();

        message.channel.send(rb);
        return;
    }

    public isNum(toTest : any) : boolean {
        return /^\d+$/.test(toTest);
    }
    public async execute(bot : SenseiClient, message : Discord.Message, args : string[]) : Promise<void> {
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
                    case "string":
                        argObject.push(this);
                        break;
                    case "number":
                        if(this.isNum(args[index])) {
                            argObject[this.arguments[index].name] = args[index];
                        } else {
                            errors.push(`Argument must be a Number.`);
                        }
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

export { SenseiCommand };