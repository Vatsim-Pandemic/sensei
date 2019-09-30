import { Client } from "discord.js";

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
    public commands : string[];

    // Private
    private loginToken : string;
    private commandsDir : string;

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
        this.commands = [];
        this.loginToken = "none";
        this.commandsDir = "none";
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
    public setCommandDirectory(CommandsDirectory : string) : SenseiClient {
        this.commandsDir = CommandsDirectory;
        return this;
    }

    // Private
    verifyToken() {
        if(this.loginToken != "none") return true;
        return false;
    }

    start() : void {
        if(!this.verifyToken()) { console.error(new Error(`Login Token hasn't been set properly. Please set the "token" property in the Configuration Object or use the setToken(token : string) method.`)); return }
        if(!(this.prefixes.length > 0)) { console.error(new Error(`Atleast one prefix is required for the bot to work. Please set the "prefixes" : string[] property in the Configuration Object or use the setPrefixes(prefixes : string[]) method.`)); return }

        this.on("message", (message) => {
            
        })

        try { this.login(this.loginToken); }
        catch {
            console.error(`The specified bot login token is Invalid.`);
            return;
        }
    }
}

export { SenseiClient };