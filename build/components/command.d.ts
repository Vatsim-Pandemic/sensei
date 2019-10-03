import Discord from "discord.js";
import { SenseiClient } from "./client";
interface CommandInfo {
    name: string;
    description: string;
    syntax: string;
}
interface ArgumentObject {
    name: string;
    type: string;
}
declare class SenseiCommand {
    names: string[];
    category: string;
    info: CommandInfo;
    protected cooldown: number;
    protected arguments: ArgumentObject[];
    constructor();
    protected duplicateArguments(): boolean;
    protected run(bot: SenseiClient, message: Discord.Message, args?: any): Promise<void>;
    protected reportError(bot: SenseiClient, message: Discord.Message, messages: string[]): void;
    isNum(toTest: any): boolean;
    execute(bot: SenseiClient, message: Discord.Message, args: string[]): Promise<void>;
}
export { SenseiCommand };
//# sourceMappingURL=command.d.ts.map