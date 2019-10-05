/**
 * A Class used for Logging Stuff to the Console. Can be used by Anyone, although its main usage is to Log Messages from the Other Classes.
 */
declare class Logger {
    /**
     * Used to log Errors to the console.
     * @param {string} message The Error Message to Log.
     * @returns {Void}
     */
    error(message: string): void;
    /**
     * Used to log Warnings to the console.
     * @param {string} message The Warning Message to Log.
     * @returns {Void}
     */
    warn(message: string): void;
    /**
     * Used to log Info Messages to the console.
     * @param {string} message The Information Message to Log.
     * @returns {Void}
     */
    info(message: string): void;
    /**
     * Used to log Success Messages to the console.
     * @param {string} message The Success Message to Log.
     * @returns {Void}
     */
    ok(message: string): void;
    /**
     * Used to log Progress Related Messages to the console.
     * @param {string} message The Progress Message to Log.
     * @returns {Void}
     */
    progress(message: string): void;
}
export = Logger;
//# sourceMappingURL=log.d.ts.map