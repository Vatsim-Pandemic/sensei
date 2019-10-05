import colors from "colors/safe";

/**
 * A Class used for Logging Stuff to the Console. Can be used by Anyone, although its main usage is to Log Messages from the Other Classes.
 */
class Logger {
    // Methods;

    /**
     * Used to log Errors to the console.
     * @param {string} message The Error Message to Log.
     * @returns {Void}
     */
    public error(message : string) : void {
        console.log(colors.red(colors.bold(`[Error]: ${message}`)));
        return;
    }

    /**
     * Used to log Warnings to the console.
     * @param {string} message The Warning Message to Log.
     * @returns {Void}
     */
    public warn(message : string) : void {
        console.log(colors.yellow(colors.bold(`[Warning]: ${message}`)));
        return;
    }

    /**
     * Used to log Info Messages to the console.
     * @param {string} message The Information Message to Log.
     * @returns {Void}
     */
    public info(message : string) : void {
        console.log(colors.cyan(colors.bold(`[INFO]: ${message}`)));
        return;
    }

    /**
     * Used to log Success Messages to the console.
     * @param {string} message The Success Message to Log.
     * @returns {Void}
     */
    public ok(message : string) : void {
        console.log(colors.green(colors.bold(`[OK]: ${message}`)));
        return;
    }

    /**
     * Used to log Progress Related Messages to the console.
     * @param {string} message The Progress Message to Log.
     * @returns {Void}
     */
    public progress(message : string) : void {
        console.log(colors.blue(colors.bold(colors.black(`[Progress]: ${message}`))));
        return;
    }
}

export = Logger;