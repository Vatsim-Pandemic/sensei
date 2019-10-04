import colors from "colors/safe";

class Logger {
    // Methods;

    public error(message : string) : void {
        console.log(colors.bgRed(colors.bold(`[Error]: ${message}`)));
        return;
    }

    public warn(message : string) : void {
        console.log(colors.bgYellow(colors.bold(`[Warning]: ${message}`)));
        return;
    }

    public info(message : string) : void {
        console.log(colors.bgBlue(colors.bold(`[INFO]: ${message}`)));
        return;
    }

    public ok(message : string) : void {
        console.log(colors.bgGreen(colors.bold(`[OK]: ${message}`)));
        return;
    }

    public progress(message : string) : void {
        console.log(colors.bgWhite(colors.bold(colors.black(`[Progress]: ${message}`))));
        return;
    }
}

export { Logger };