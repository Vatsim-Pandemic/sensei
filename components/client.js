const { Client } = require("discord.js");
const path = require("path");

class SenseiClient extends Client {
    constructor() {
        super();
        // - Properties - //
        // Public

        this.info = {
            name: "SenseiBot",
            version: "1.0.0",
            author: {
                name: "Mudassar Islam",
                username: "Demonicious#9560",
                email: "demoncious@gmail.com"
            }
        }

        this.prefixes = null;
        this.commands = null;

        // Private
        this._token = null;
        this._commandsDir = null;
        this._commandGroups = null;
    }

    // Methods
    setToken(Token = new String) {
        this._token = Token;
        return this;
    }
    setPrefixes(PrefixesArray = new Array) { 
        this.prefixes = PrefixesArray;
        return this;
    }
    setCommandDirectory(CommandsDirectory = new String) {
        this._commandsDir = CommandsDirectory;
        return this;
    }
    registerGroups(Groups = new Array) {
        this._commandGroups = Groups;
        return this;
    }

    configure(config = new Object) {
        let setting;
        for(setting in config) {
            switch(setting) {
                case "token":
                    this._token = config[setting];
                    break;
                case "prefixes":
                    if(config[setting].length > 0) {
                        this.prefixes = config[setting];
                    }
                    break;
                case "commandsDirectory":
                    this._commandsDir = config[setting];
                    break;
                case "registerCommands":
                    this.commands = config[setting];
                    break;
            }
        }
        return this;
    }

    start() {
        if(this._steps >= 3) {
            // Register All of the Commands.

            // Register Events.

            this.login(this._token);
        }
    }
}

module.exports = SenseiClient;