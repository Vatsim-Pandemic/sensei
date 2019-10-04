import { Client, RichEmbed } from "discord.js";
import recursive from "recursive-readdir";
import { SenseiCommand, Logger } from "../sensei";

interface AuthorInfo {
    name? : string,
    username? : string,
    email? : string
}

interface BotInfo {
    name? : string,
    version? : string,
    author? : AuthorInfo
}

interface CooldownSettings {
    type : "system" | "command",
    systemCooldown : number,
}

interface Config {
    token : string,
    prefixes : string[],
    reportErrors : boolean,
    cooldowns : CooldownSettings,
    commandsDirectory : string,
    info? : BotInfo,
    custom? : any,
}

class SenseiClient extends Client {
    // Public
    public info : BotInfo;
    public prefixes : string[];
    public commands : any;
    public sysMemory : any;
    public cmdMemory : any;
    public cooldowns : CooldownSettings;

    public custom : any;

    // Private
    private reportErrors : boolean;

    private loginToken : string;
    private commandsDir : string;

    private commandPaths : string[];
    private possibleNames: string[];

    protected log : Logger;

    constructor() {
        super();
        this.log = new Logger();
        this.info = {
            name: "SenseiBot",
            version: "1.0.0",
            author: {
                name: "Mudassar Islam",
                username: "Demonicious#9560",
                email: "demoncious@gmail.com"
            }
        }
        this.sysMemory = new Set();
        this.cmdMemory = new Set();
        this.cooldowns = {
            type: "command",
            systemCooldown: 5,
        }

        this.prefixes = [];
        this.commands = {};

        this.custom = {};
        this.custom.footerText = "SenseiBot";
        this.custom.primaryColor = "#5f5ac6";
        this.custom.secondaryColor = "#8e7878";
        this.custom.errorColor = "#ef2e2e";
        this.custom.successColor = "#68c73f";

        this.reportErrors = false;

        this.loginToken = "none";
        this.commandsDir = "none";

        this.commandPaths = [];
        this.possibleNames = [];
    }

    // Methods

    // Public
    public configure(configObject : Config) : SenseiClient {
        let setting : string;
        for(setting in configObject) {
            switch(setting) {
                case "token":
                    if(configObject.token != undefined && configObject.token != "") this.loginToken = configObject.token;
                    else {
                        this.log.error(`Bot token wasn't setup properly. Please see https://github.com/Demonicious/sensei/wiki/2.-Configuration`);
                        process.exit();
                    }
                    break;
                case "prefixes":
                    if(configObject.prefixes != undefined && configObject.prefixes.length > 0) this.prefixes = configObject.prefixes;
                    else {
                        this.log.error("Prefixes weren't setup properly. Please see https://github.com/Demonicious/sensei/wiki/2.-Configuration");
                        process.exit();
                    }
                    break;
                case "commandsDirectory":
                    if(configObject.commandsDirectory != undefined) this.commandsDir = configObject.commandsDirectory;
                    else {
                        this.log.error("The Commands directory hasn't been setup properly. Please see https://github.com/Demonicious/sensei/wiki/2.-Configuration");
                        process.exit();
                    }
                    break;
                case "reportErrors":
                    if(configObject.reportErrors != undefined) this.reportErrors = configObject.reportErrors;
                    break;
                case "cooldowns":
                    if(configObject.cooldowns != undefined && configObject.cooldowns.type != undefined && configObject.cooldowns.systemCooldown != undefined) this.cooldowns = configObject.cooldowns;
                    else {
                        this.log.error(`Cooldown settings haven't been setup properly. Please see https://github.com/Demonicious/sensei/wiki/2.-Configuration`);
                        process.exit();
                    }
                    break;
                case "info":
                    if(configObject.info != undefined) this.info = configObject.info;
                    else {
                        this.log.error(`'info' cannot be undefined. Please see https://github.com/Demonicious/sensei/wiki/2.-Configuration`);
                        process.exit();
                    }
                    break;
                case "custom":
                    if(configObject.custom != undefined) this.custom = configObject.custom;
                    else {
                        this.log.error(`'custom' cannot be undefined. Please see https://github.com/Demonicious/sensei/wiki/2.-Configuration`);
                        process.exit();
                    }
                    break;
            }
        }
        return this;
    }

    // Private
    private verifyToken() {
        if(this.loginToken != "none") return true;
        return false;
    }

    private async registerCommands() : Promise<void> {
        return await recursive(this.commandsDir, (err : Error, files : string[]) => {
            if(err) throw(err);
            this.commandPaths = files;
            this.commandPaths.forEach((commandPath, index) => {
                if(!commandPath.includes("_drafts")) {
                    import(commandPath).then((command : any) => {
                        let cmd = new command.default;
                        cmd.names.forEach((name : string) => {
                            if(this.possibleNames.includes(name)) {
                                this.log.error(`Name: '${name}' of Command: '${commandPath}' already in use by another Command. Names/Aliases can't be same and can't be repeated,`);
                                process.exit();
                            } else {
                                this.possibleNames.push(name);
                            }
                            this.commands[name] = command.default;
                        })
                    }).catch(e => {
                        console.error(e);
                    })
                }
            })
        })
    }

    // Final Method
    public async start() : Promise<void> {
        if(!this.verifyToken()) { this.log.error(`Login Token hasn't been set properly. Please see https://github.com/Demonicious/sensei/wiki/2.-Configuration`); process.exit(); }
        if(!(this.prefixes.length > 0)) { this.log.error(`Atleast one prefix is required for the bot to work. Please see https://github.com/Demonicious/sensei/wiki/2.-Configuration`); process.exit(); }
        if(this.commandsDir == "none") { this.log.error(`Commands Source Directory hasn't been set. Please see https://github.com/Demonicious/sensei/wiki/2.-Configuration`); process.exit(); }

        await this.registerCommands().then(() => {
            this.on("ready", () => {
                this.log.progress("Beginning Startup Process. [1/4]");
                this.log.progress("Saving Configuration. [2/4]");
                this.log.progress("Starting Registry of System Events. [3/4]");
                this.on("message", (message) => {
                    let content = message.content;
                    let isCommand = false;
                    this.prefixes.map((prefix : string) => {
                        // Check if a message starts with a prefix.
                        if(content.startsWith(prefix)) {
                            content = content.replace(prefix, "");
                            isCommand = true;
                        }
                    })
                    if(isCommand && content.trim() != "") {
                        let commandKeys = Object.keys(this.commands);
                        // Determine Which command it is.
                        let split = content.split(/\s+/g);
                        if(split.length > 0) {
                            if(commandKeys.includes(split[0])) {
                                let cmd = split[0];
                                let callArgs = split.slice(1);

                                let shouldRun = false;
                                let attempt : SenseiCommand = new this.commands[cmd];
                                let seconds : number = 0;
                                if(this.cooldowns.type == "command") {
                                    if(!this.cmdMemory.has(message.author.id + "<->" + attempt.names[0])) {
                                        shouldRun = true;
                                    } else {
                                        seconds = attempt.cooldown;
                                    }
                                } else {
                                    if(!this.sysMemory.has(message.author.id)) {
                                        shouldRun = true;
                                    } else {
                                        seconds = this.cooldowns.systemCooldown;
                                    }
                                }
                                if(shouldRun) attempt.execute(this, message, callArgs);
                                else {
                                    let rb = new RichEmbed()
                                    .setColor(this.custom.errorColor)
                                    .setDescription(`Please wait **${seconds} seconds** before executing this command.`)
                                    .setFooter(this.custom.footerText)
                                    .setTimestamp();

                                    message.channel.send(rb);
                                }
                                return;
                            } else {
                                if(this.reportErrors) {
                                    let rb = new RichEmbed()
                                    .setColor(this.custom.errorColor)
                                    .setDescription("Invalid Command.")
                                    .setFooter(this.custom.footerText)
                                    .setTimestamp();

                                    message.channel.send(rb);
                                }
                            }
                        }
                    }
                })
                this.log.progress("Bot Logged In & Ready! [4/4]");
                this.log.ok("Watching for command events..");
            })

            try { this.login(this.loginToken); }
            catch {
                this.log.error(`The specified bot login token is Invalid.`);
                process.exit();
            }
        });        
    }
}

export { SenseiClient };