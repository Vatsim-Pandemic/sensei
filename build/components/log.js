"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const safe_1 = __importDefault(require("colors/safe"));
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
    error(message) {
        console.log(safe_1.default.red(safe_1.default.bold(`[Error]: ${message}`)));
        return;
    }
    /**
     * Used to log Warnings to the console.
     * @param {string} message The Warning Message to Log.
     * @returns {Void}
     */
    warn(message) {
        console.log(safe_1.default.yellow(safe_1.default.bold(`[Warning]: ${message}`)));
        return;
    }
    /**
     * Used to log Info Messages to the console.
     * @param {string} message The Information Message to Log.
     * @returns {Void}
     */
    info(message) {
        console.log(safe_1.default.cyan(safe_1.default.bold(`[INFO]: ${message}`)));
        return;
    }
    /**
     * Used to log Success Messages to the console.
     * @param {string} message The Success Message to Log.
     * @returns {Void}
     */
    ok(message) {
        console.log(safe_1.default.green(safe_1.default.bold(`[OK]: ${message}`)));
        return;
    }
    /**
     * Used to log Progress Related Messages to the console.
     * @param {string} message The Progress Message to Log.
     * @returns {Void}
     */
    progress(message) {
        console.log(safe_1.default.blue(safe_1.default.bold(safe_1.default.black(`[Progress]: ${message}`))));
        return;
    }
}
exports.Logger = Logger;
//# sourceMappingURL=log.js.map