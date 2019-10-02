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
        this.sysMemory = new Set();
        this.cmdMemory = new Set();
        this.cooldowns = {
            type: "command",
            systemCooldown: 5,
        };
        this.prefixes = [];
        this.commands = {};
        this.footerText = "SenseiBot";
        this.primaryColor = "#5f5ac6";
        this.secondaryColor = "#8e7878";
        this.errorColor = "#ef2e2e";
        this.successColor = "#68c73f";
        this.reportErrors = false;
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
                    else {
                        console.log("Prefixes array can't be empty in the configuration object.");
                        process.exit();
                    }
                    break;
                case "commandsDirectory":
                    if (configObject.commandsDirectory != undefined)
                        this.commandsDir = configObject.commandsDirectory;
                    break;
                case "reportErrors":
                    if (configObject.reportErrors != undefined)
                        this.reportErrors = configObject.reportErrors;
                    break;
                case "cooldowns":
                    if (configObject.cooldowns != undefined && configObject.cooldowns.type != undefined && configObject.cooldowns.systemCooldown != undefined)
                        this.cooldowns = configObject.cooldowns;
                    else {
                        console.log("'cooldowns must be an object with properties 'type' = \"command\" | \"system\" and 'systemCooldown' = seconds");
                        process.exit();
                    }
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
    setReportErrors(ReportErrors) {
        this.reportErrors = ReportErrors;
        return this;
    }
    setCooldowns(CooldownSettings) {
        if (CooldownSettings.systemCooldown != undefined && CooldownSettings.type != undefined) {
            this.cooldowns = CooldownSettings;
        }
        return this;
    }
    // Private
    verifyToken() {
        if (this.loginToken != "none")
            return true;
        return false;
    }
    async registerCommands() {
        return await recursive_readdir_1.default(this.commandsDir, (err, files) => {
            if (err)
                throw (err);
            this.commandPaths = files;
            this.commandPaths.forEach((commandPath, index) => {
                if (!commandPath.includes("_drafts")) {
                    Promise.resolve().then(() => __importStar(require(commandPath))).then((command) => {
                        let cmd = new command.default;
                        cmd.names.forEach((name) => {
                            if (this.possibleNames.includes(name)) {
                                console.log(`Name: '${name}' of Command: '${commandPath}' already in use by another Command. Names/Aliases can't be same and can't be repeated,`);
                                process.exit();
                            }
                            else {
                                this.possibleNames.push(name);
                            }
                            this.commands[name] = command.default;
                        });
                    }).catch(e => {
                        console.error(e);
                    });
                }
            });
        });
    }
    // Final Method
    async start() {
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
        this.registerCommands().then(() => {
            this.on("ready", () => {
                console.log("(1/5) Beginning Startup Process.");
                console.log("(2/5) Saving Configuration.");
                console.log("(3/5) Starting Registry of System Events.");
                this.on("message", (message) => {
                    let content = message.content;
                    let isCommand = false;
                    this.prefixes.map((prefix) => {
                        // Check if a message starts with a prefix.
                        if (content.startsWith(prefix)) {
                            content = content.replace(prefix, "");
                            isCommand = true;
                        }
                    });
                    if (isCommand && content.trim() != "") {
                        let commandKeys = Object.keys(this.commands);
                        // Determine Which command it is.
                        let split = content.split(/\s+/g);
                        if (split.length > 0) {
                            if (commandKeys.includes(split[0])) {
                                let cmd = split[0];
                                let callArgs = split.slice(1);
                                let shouldRun = false;
                                let attempt = new this.commands[cmd];
                                let seconds = 0;
                                if (this.cooldowns.type == "command") {
                                    if (!this.cmdMemory.has(message.author.id + "<->" + attempt.names[0])) {
                                        shouldRun = true;
                                    }
                                    else {
                                        seconds = attempt.cooldown;
                                    }
                                }
                                else {
                                    if (!this.sysMemory.has(message.author.id)) {
                                        shouldRun = true;
                                    }
                                    else {
                                        seconds = this.cooldowns.systemCooldown;
                                    }
                                }
                                if (shouldRun)
                                    attempt.execute(this, message, callArgs);
                                else {
                                    let rb = new discord_js_1.RichEmbed()
                                        .setColor(this.errorColor)
                                        .setDescription(`Please wait **${seconds} seconds** before executing this command.`)
                                        .setFooter(this.footerText)
                                        .setTimestamp();
                                    message.channel.send(rb);
                                }
                                return;
                            }
                            else {
                                if (this.reportErrors) {
                                    let rb = new discord_js_1.RichEmbed()
                                        .setColor(this.errorColor)
                                        .setDescription("Invalid Command")
                                        .setFooter(this.footerText)
                                        .setTimestamp();
                                    message.channel.send(rb);
                                }
                            }
                        }
                    }
                });
                console.log("(4/5) Bot Logged In & Ready!");
                console.log("(5/5) Watching for command events..");
            });
            try {
                this.login(this.loginToken);
            }
            catch {
                console.log(`The specified bot login token is Invalid.`);
                process.exit();
            }
        });
    }
}
exports.SenseiClient = SenseiClient;
//# sourceMappingURL=client.js.map