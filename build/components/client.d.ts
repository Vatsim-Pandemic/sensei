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
interface Config {
    token?: string;
    prefixes?: string[];
    commandsDirectory?: string;
    info?: BotInfo;
}
declare class SenseiClient extends Client {
    info: BotInfo;
    prefixes: string[];
    commands: any;
    footerText: string;
    primaryColor: string;
    secondaryColor: string;
    errorColor: string;
    successColor: string;
    private loginToken;
    private commandsDir;
    private commandPaths;
    private possibleNames;
    constructor();
    configure(configObject: Config): SenseiClient;
    setToken(Token: string): SenseiClient;
    setPrefixes(PrefixesArray: string[]): SenseiClient;
    setCommandsDirectory(CommandsDirectory: string): SenseiClient;
    private verifyToken;
    private registerCommands;
    start(): void;
}
export { SenseiClient };
