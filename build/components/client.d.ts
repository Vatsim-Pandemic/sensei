import { Client } from "discord.js";
import { Logger } from "../sensei";
interface AuthorInfo {
    name?: string;
    username?: string;
    email?: string;
}
interface BotInfo {
    name?: string;
    version?: string;
    author?: AuthorInfo;
}
interface CooldownSettings {
    type: "system" | "command";
    systemCooldown: number;
}
interface Config {
    prefixes: string[];
    commandsDirectory: string;
    logMessages?: boolean;
    reportErrors?: boolean;
    cooldowns?: CooldownSettings;
    info?: BotInfo;
    custom?: any;
}
/**
 * Extends [Client](https://discord.js.org/#/docs/main/stable/class/Client).
 * @param {Config} configObject An Object containing all of the Configuration Instructions.
 */
declare class SenseiClient extends Client {
    /**
     * Stores the Name, Version, and Author Information of the Bot.
     * @type {BotInfo}
     */
    info: BotInfo;
    /**
     * Array of prefixes that the Bot Uses. A Bot may have atleast 1 Prefix to work.
     * @type {string[]}
     */
    prefixes: string[];
    /**
     * An Object that holds all of the Registered Commands.
     * @type {Object}
     */
    commands: any;
    sysMemory: any;
    cmdMemory: any;
    /**
     * The Cooldown Settings of the Bot. Determines how cooldowns should be applied.
     * @type {CooldownSettings}
     */
    cooldowns: CooldownSettings;
    /**
     * An object that allows you to declare custom properties under the Bot. Some custom.properties are pre-declared in this object.
     * @type {Object}
     */
    custom: any;
    /**
     * Determines whether insignificant errors should be reported to the user or not. Major errors are reported regardless.
     * @type {Boolean}
     * @private
     */
    private reportErrors;
    /**
     * Determines whether the Bot should Log information messages to the Console. Errors and Warnings are logged regardless.
     * @type {Boolean}
     */
    private logMessages;
    /**
     * The path of the directory where the commands are saved.
     * @type {string}
     */
    private commandsDir;
    private commandPaths;
    private possibleNames;
    /**
     * An Object that is used for Logging messages to the console
     * @type {Logger}
     */
    protected log: Logger;
    /**
     * Creates a new SenseiClient Object.
     */
    constructor(configObject: Config);
    /**
     * @typedef {Object} AuthorInfo
     * @property {string} name The Real/Online name of the Author.
     * @property {string} username The Discord Username of the Author.
     * @property {string} email The E-Mail address of the Author.
     */
    /**
     * @typedef {Object} BotInfo
     * @property {string} name The Name of the Bot.
     * @property {string} version The Current Version of the Bot.
     * @property {AuthorInfo} author Information about the Author.
     */
    /**
     * @typedef {Object} CooldownSettings
     * @property {"command" | "system"} type Whether the Cooldowns should be applied per command or not.
     * @property {number} systemCooldown If cooldowns.type is "system" then, this is the duration of the cooldown.
     */
    /**
     * @typedef {Object} Config
     * @property {string[]} prefixes The Array of Prefixes the bot uses. The first item is considered the Main Prefix, others are considered alternative prefixes.
     * @property {string} commandsDirectory The Directory where the Bot should scan for Command Files.
     * @property {boolean} logMessages Whether the Bot should Log Information Messages to the Console or not.
     * @property {boolean} reportErrors Whether even the smallest of errors should be reported to the Discord User or not.
     * @property {CooldownSettings} cooldowns Determines how cooldowns should be applied in the bot.
     * @property {BotInfo} info Some Optional but Useful information about the bot.
     * @property {Object} custom Used to Declare Custom Properties that are held in the bot object.
     */
    private registerCommands;
}
export = SenseiClient;
//# sourceMappingURL=client.d.ts.map