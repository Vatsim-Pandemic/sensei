import Discord, { PermissionResolvable } from "discord.js";
import { SenseiClient, Logger } from "../sensei";
interface CommandInfo {
    name: string;
    description: string;
    syntax: string;
}
/**
 * @typedef {"USER_MENTION" | "ROLE_MENTION" | "CHANNEL_MENTION" | "string" | "number"} ArgumentTypeResolvable
 * @typedef {"MESSAGE_AUTHOR" | "MESSAGE_CHANNEL" | "MESSAGE_GUILD"} ArgumentDefaultResolvable
 */
declare type ArgumentTypeResolvable = "USER_MENTION" | "ROLE_MENTION" | "CHANNEL_MENTION" | "string" | "number";
declare type ArgumentDefaultResolvable = "MESSAGE_AUTHOR" | "MESSAGE_CHANNEL" | "MESSAGE_GUILD";
interface ArgumentObject {
    name: string;
    type: ArgumentTypeResolvable;
    optional: boolean;
    default?: ArgumentDefaultResolvable | string | number;
}
/**
 * @typedef {Object} CommandInfo
 * @property {string} name The Extensive Name of the command.
 * @property {string} description Short Description of the command.
 * @property {string} syntax The Basic Usage of the Command.
 */
/**
 * @typedef {Object} ArgumentObject
 * @property {string} name The Name of the Argument. This is used to access this argument later in the run() method.
 * @property {ArgumentTypeResolvable} type The Type of the Argument.
 * @property {boolean} optional Whether the Argument is Optional or not.
 * @property {ArgumentDefaultResolvable} default The Default value (if set) of this Argument (Only Applicable if Argument is Optional)
 */
/**
 * Represents a Command that can be executed by [SenseiClient](SenseiClient.html).
 */
declare class SenseiCommand {
    /**
     * Array of Names of the Command.
     * @type {string[]}
     */
    names: string[];
    /**
     * The Category which this Command Belongs To.
     * @type {string}
     */
    category: string;
    /**
     * Information About the Command
     * @type {CommandInfo}
     */
    info: CommandInfo;
    /**
     * The Cooldown Duration of this Command (If Applicable)
     * @type {number}
     */
    cooldown: number;
    /**
     * The Array of Arguments this command requires.
     * @type {ArgumentObject[]}
     */
    protected arguments: ArgumentObject[];
    /**
     * An Object of type Logger that is used to Log messages to the console.
     * @type {Logger}
     */
    protected log: Logger;
    /**
     * The Permissions required to execute this command. By default no permission checks are applied.
     * @type {PermissionResolvable[]}
     */
    protected permissions: PermissionResolvable[];
    protected duplicateArguments(): boolean;
    /**
     * The Code to be Executed when this Command is called by a Discord User. This Method needs to be Defined by the User inside a Command Class that Extends this SenseiCommand class.
     * @param {SenseiClient} bot The SenseiClient Object.
     * @param {Message} message The [Message](https://discord.js.org/#/docs/main/stable/class/Message) Object
     * @param {Object} args The Arguments this message was sent with.
     * @example
     * // Here's how this method may be defined in a Command:
     * async run(bot, message, args) {
     *      let sender = message.author.username;
     *      let channel = message.channe;
     *
     *      channel.send(`Hello ${sender}!. How are you doing ?`);
     *      return;
     * }
     */
    protected run(bot: SenseiClient, message: Discord.Message, args?: any): Promise<void>;
    /**
     * This Method is used for Error Reporting (To the Discord User)
     * @param {SenseiClient} bot The SenseiClient Object.
     * @param {Message} message The [Message](https://discord.js.org/#/docs/main/stable/class/Message) Object
     * @param {String[]} messages An array of messages to be included in the error.
     */
    protected reportError(bot: SenseiClient, message: Discord.Message, messages: string[]): void;
    isNum(toTest: any): boolean;
    /**
     * This Method is used to check if the User has the necessary permissions required to Execute this command.
     * @param {Discord.GuildMember} member The [GuildMember](https://discord.js.org/#/docs/main/stable/class/GuildMember) to Check.
     * @returns {Boolean}
     * @private
     */
    protected verifyPermissions(member: Discord.GuildMember): boolean;
    execute(bot: SenseiClient, message: Discord.Message, args: string[]): Promise<void>;
}
export = SenseiCommand;
//# sourceMappingURL=command.d.ts.map