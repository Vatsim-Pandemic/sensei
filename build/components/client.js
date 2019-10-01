"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const recursive_readdir_1 = __importDefault(require("recursive-readdir"));
class SenseiClient extends discord_js_1.Client {
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
        };
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
    configure(configObject) {
        let setting;
        for (setting in configObject) {
            switch (setting) {
                case "token":
                    if (configObject.token != undefined)
                        this.loginToken = configObject.token;
                    break;
                case "prefixes":
                    if (configObject.prefixes != undefined && configObject.prefixes.length > 0)
                        this.prefixes = configObject.prefixes;
                    break;
                case "commandsDirectory":
                    if (configObject.commandsDirectory != undefined)
                        this.commandsDir = configObject.commandsDirectory;
                    break;
            }
        }
        return this;
    }
    setToken(Token) {
        this.loginToken = Token;
        return this;
    }
    setPrefixes(PrefixesArray) {
        this.prefixes = PrefixesArray;
        return this;
    }
    setCommandsDirectory(CommandsDirectory) {
        this.commandsDir = CommandsDirectory;
        return this;
    }
    // Private
    verifyToken() {
        if (this.loginToken != "none")
            return true;
        return false;
    }
    registerCommands() {
        recursive_readdir_1.default(this.commandsDir, (err, files) => {
            if (err)
                throw (err);
            this.commandPaths = files;
            this.commandPaths.forEach((commandPath, index) => {
                if (!commandPath.includes("_drafts")) {
                    let bot = this;
                    Promise.resolve().then(() => __importStar(require(commandPath))).then((command) => {
                        let cmd = new command.default;
                        cmd.names.forEach((name) => {
                            if (bot.possibleNames.includes(name)) {
                                console.log(`Name: '${name}' of Command: '${commandPath}' already in use by another Command. Names/Aliases can't be same and can't be repeated,`);
                                process.exit();
                            }
                            else {
                                bot.possibleNames.push(name);
                            }
                            bot.commands[name] = command.default;
                        });
                    }).catch(e => {
                        console.error(e);
                        return;
                    });
                }
            });
        });
    }
    // Final Method
    start() {
        if (!this.verifyToken()) {
            console.log(`Login Token hasn't been set properly. Please set the "token" property in the Configuration Object or use the setToken(token : string) method.`);
            process.exit();
        }
        if (!(this.prefixes.length > 0)) {
            console.log(`Atleast one prefix is required for the bot to work. Please set the "prefixes" : string[] property in the Configuration Object or use the setPrefixes(prefixes : string[]) method.`);
            process.exit();
        }
        if (this.commandsDir == "none") {
            console.log(`Commands Source Directory hasn't been set. Please set the "commandsDirectory" : string property in the Configuration Object or use the setCommandsDirectory(directory : string) method.`);
            process.exit();
        }
        this.registerCommands();
        console.log(this.commands);
        this.on("message", (message) => {
            if (message.author.bot)
                return;
        });
        try {
            this.login(this.loginToken);
        }
        catch (_a) {
            console.log(`The specified bot login token is Invalid.`);
            process.exit();
        }
    }
}
exports.SenseiClient = SenseiClient;
//# sourceMappingURL=client.js.map