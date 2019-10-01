import { Client } from "discord.js";
import { SenseiCommand } from "./command";
import recursive from "recursive-readdir";

interface AuthorInfo {
    name?: string,
    username?: string,
    email?: string
}

interface BotInfo {
    name?: string,
    version?: string,
    author?: AuthorInfo
}

interface Config {
    token?: string,
    prefixes?: string[],
    commandsDirectory?: string,
    info?: BotInfo
}

class SenseiClient extends Client {
    // Public
    public info : BotInfo;
    public prefixes : string[];
    public commands : any;

    public footerText : string;
    public primaryColor : string;
    public secondaryColor : string;
    public errorColor : string;
    public successColor: string;

    // Private
    private loginToken : string;
    private commandsDir : string;

    private commandPaths : string[];
    private possibleNames: string[];

    constructor() {
        super();
        this.info = {
            name: "SenseiBot",
            version: "1.0.0",
            author: {
                name: "Mudassar Islam",
                username: "Demonicious#9560",
                email: "demoncious@gmail.com"
            }
        }
        this.prefixes = [];
        this.commands = {};

        this.footerText = "SenseiBot";
        this.primaryColor = "#5f5ac6";
        this.secondaryColor = "#8e7878";
        this.errorColor = "#ef2e2e";
        this.successColor = "#68c73f";

        this.loginToken = "none";
        this.commandsDir = "none";

        this.commandPaths = [];
        this.possibleNames = [];
    }

    // Methods

    // Public
    configure(configObject : Config) : SenseiClient {
        let setting : string;
        for(setting in configObject) {
            switch(setting) {
                case "token":
                    if(configObject.token != undefined) this.loginToken = configObject.token;
                    break;
                case "prefixes":
                    if(configObject.prefixes != undefined && configObject.prefixes.length > 0) this.prefixes = configObject.prefixes;
                    break;
                case "commandsDirectory":
                    if(configObject.commandsDirectory != undefined) this.commandsDir = configObject.commandsDirectory;
                    break;
            }
        }
        return this;
    }
    public setToken(Token : string) : SenseiClient {
        this.loginToken = Token;
        return this;
    }
    public setPrefixes(PrefixesArray : string[]) : SenseiClient { 
        this.prefixes = PrefixesArray;
        return this;
    }
    public setCommandsDirectory(CommandsDirectory : string) : SenseiClient {
        this.commandsDir = CommandsDirectory;
        return this;
    }

    // Private
    private verifyToken() {
        if(this.loginToken != "none") return true;
        return false;
    }

    private registerCommands() : void {
        recursive(this.commandsDir, (err : Error, files : string[]) => {
            if(err) throw(err);
            this.commandPaths = files;
            this.commandPaths.forEach((commandPath, index) => {
                if(!commandPath.includes("_drafts")) {
                    let bot = this;
                    import(commandPath).then((command : any) => {
                        let cmd = new command.default;
                        cmd.names.forEach((name : string) => {
                            if(bot.possibleNames.includes(name)) {
                                console.log(`Name: '${name}' of Command: '${commandPath}' already in use by another Command. Names/Aliases can't be same and can't be repeated,`);
                                process.exit();
                            } else {
                                bot.possibleNames.push(name);
                            }
                            bot.commands[name] = command.default;
                        })
                    }).catch(e => {
                        console.error(e);
                        return;
                    })
                }
            })
        })
    }

    // Final Method
    public start() : void {
        if(!this.verifyToken()) { console.log(`Login Token hasn't been set properly. Please set the "token" property in the Configuration Object or use the setToken(token : string) method.`); process.exit(); }
        if(!(this.prefixes.length > 0)) { console.log(`Atleast one prefix is required for the bot to work. Please set the "prefixes" : string[] property in the Configuration Object or use the setPrefixes(prefixes : string[]) method.`); process.exit(); }
        if(this.commandsDir == "none") { console.log(`Commands Source Directory hasn't been set. Please set the "commandsDirectory" : string property in the Configuration Object or use the setCommandsDirectory(directory : string) method.`); process.exit(); }

        this.registerCommands();
        console.log(this.commands);

        this.on("message", (message) => {
            if(message.author.bot) return;
        })

        try { this.login(this.loginToken); }
        catch {
            console.log(`The specified bot login token is Invalid.`);
            process.exit();
        }
    }
}

export { SenseiClient };