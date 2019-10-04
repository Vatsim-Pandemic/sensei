import colors from "colors/safe";

class Logger {
    // Methods;

    public error(message : string) : void {
        console.log(colors.red(colors.bold(`[Error]: ${message}`)));
        return;
    }

    public warn(message : string) : void {
        console.log(colors.yellow(colors.bold(`[Warning]: ${message}`)));
        return;
    }

    public info(message : string) : void {
        console.log(colors.cyan(colors.bold(`[INFO]: ${message}`)));
        return;
    }

    public ok(message : string) : void {
        console.log(colors.green(colors.bold(`[OK]: ${message}`)));
        return;
    }

    public progress(message : string) : void {
        console.log(colors.blue(colors.bold(colors.black(`[Progress]: ${message}`))));
        return;
    }
}

export { Logger };