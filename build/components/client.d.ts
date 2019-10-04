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
    reportErrors: boolean;
    cooldowns: CooldownSettings;
    commandsDirectory: string;
    info?: BotInfo;
    custom?: any;
}
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
    constructor();
    configure(configObject: Config): SenseiClient;
    private verifyToken;
    private registerCommands;
    start(): Promise<void>;
}
export { SenseiClient };
//# sourceMappingURL=client.d.ts.map