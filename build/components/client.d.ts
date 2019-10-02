import { Client } from "discord.js";
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
    token?: string;
    prefixes?: string[];
    reportErrors?: boolean;
    cooldowns?: CooldownSettings;
    commandsDirectory?: string;
    info?: BotInfo;
}
declare class SenseiClient extends Client {
    info: BotInfo;
    prefixes: string[];
    commands: any;
    sysMemory: any;
    cmdMemory: any;
    cooldowns: CooldownSettings;
    footerText: string;
    primaryColor: string;
    secondaryColor: string;
    errorColor: string;
    successColor: string;
    private reportErrors;
    private loginToken;
    private commandsDir;
    private commandPaths;
    private possibleNames;
    constructor();
    configure(configObject: Config): SenseiClient;
    setToken(Token: string): SenseiClient;
    setPrefixes(PrefixesArray: string[]): SenseiClient;
    setCommandsDirectory(CommandsDirectory: string): SenseiClient;
    setReportErrors(ReportErrors: boolean): SenseiClient;
    setCooldowns(CooldownSettings: CooldownSettings): this;
    private verifyToken;
    private registerCommands;
    start(): Promise<void>;
}
export { SenseiClient };
//# sourceMappingURL=client.d.ts.map