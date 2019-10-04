import Discord from "discord.js";
import { SenseiClient, Logger } from "../sensei";
interface CommandInfo {
    name: string;
    description: string;
    syntax: string;
}
interface ArgumentObject {
    name: string;
    type: "user_mention" | "role_mention" | "channel_mention" | "text" | "number";
}
/**
 * @typedef {Object} CommandInfo
 * @property {string} name The Extensive Name of the command.
 * @property {string} description Short Description of the command.
 * @property {syntax} syntax The Basic Usage of the Command.
 */
/**
 * @typedef {Object} ArgumentObject
 * @property {string} name The Name of the Argument. This is used to access this argument later in the run() method.
 * @property {"user_mention" | "role_mention" | "channel_mention" | "text" | "number"} type The Type of the Argument.
 */
/**
 * Represents a Command that can be executed by [SenseiClient](SenseiClient.html).
 * @property {String[]} names An Array of the Names of this Command. The First item of the array is the main Name, others are aliases.
 * @property {String} category The Category which this Command belongs to.
 * @property {CommandInfo} info Information about the Command.
 * @property {number} cooldown Duration of the Cooldown. Only Applicable if cooldowns.type is set to "command" in SenseiClient.
 * @property {ArgumentObject[]} arguments The Arguments Required for this Command.
 */
declare class SenseiCommand {
    names: string[];
    category: string;
    info: CommandInfo;
    cooldown: number;
    protected arguments: ArgumentObject[];
    protected log: Logger;
    /**
     * Creates a new SenseiCommand Object that can be used by a [SenseiClient](SenseiClient.html). All of the Properties Above need to be Defined in the Constructor of a Class that Extends this class.
     */
    constructor();
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
    execute(bot: SenseiClient, message: Discord.Message, args: string[]): Promise<void>;
}
export { SenseiCommand };
//# sourceMappingURL=command.d.ts.map