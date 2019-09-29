const { Client } = require("discord.js");
const path = require("path");

class SenseiClient extends Client {
    constructor() {
        super();
        // - Properties - //
        // Public
        this.prefixes = null;
        this.commands = null;

        // Private
        this._token = null;
        this._commandsDir = null;
        this._commandGroups = null;
        this._steps = 0;
    }

    // Methods
    setToken(Token = new String) {
        this._token = Token;
        this._steps++;
        return this;
    }
    setPrefixes(PrefixesArray = new Array) { 
        this.prefixes = PrefixesArray;
        this._steps++;
        return this;
    }
    setCommandDirectory(CommandsDirectory = new String) {
        this._commandsDir = CommandsDirectory;
        this._steps++;
        return this;
    }
    registerGroups(Groups = new Array) {
        this._commandGroups = Groups;
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