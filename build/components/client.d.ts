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
    token: string;
    prefixes: string[];
    reportErrors?: boolean;
    cooldowns?: CooldownSettings;
    commandsDirectory: string;
    info?: BotInfo;
    custom?: any;
}
/**
 * Extends [Client](https://discord.js.org/#/docs/main/stable/class/Client).
 */
declare class SenseiClient extends Client {
    info: BotInfo;
    prefixes: string[];
    commands: any;
    sysMemory: any;
    cmdMemory: any;
    cooldowns: CooldownSettings;
    custom: any;
    private reportErrors;
    private loginToken;
    private commandsDir;
    private commandPaths;
    private possibleNames;
    protected log: Logger;
    /**
     * Creates a new SenseiClient Object.
     */
    constructor();
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
     * @typedef {Object} ConfigurationObject
     * @property {string} token  The Token of the Bot used to Login
     * @property {string[]} prefixes The Array of Prefixes the bot uses. The first item is considered the Main Prefix, others are considered alternative prefixes.
     * @property {boolean} reportErrors Whether even the smallest of errors should be reported to the Discord User or not.
     * @property {CooldownSettings} cooldowns Determines how cooldowns should be applied in the bot.
     * @property {string} commandsDirectory The Directory where the Bot should scan for Command Files.
     * @property {BotInfo} info Some Optional but Useful information about the bot.
     * @property {Object} custom Used to Declare Custom Properties that are held in the bot object.
     */
    /**
     * Configures the Bot for Usage.
     * @param {ConfigurationObject} config The Object that holds all Configuration Instructions.
     * @returns {SenseiClient}
     */
    configure(configObject: Config): SenseiClient;
    private verifyToken;
    private registerCommands;
    /**
     * Performs all of the Pre-Processing Tasks and Logs in the Bot.
     * @returns {Promise<Void>}
     */
    start(): Promise<void>;
}
export { SenseiClient };
//# sourceMappingURL=client.d.ts.map