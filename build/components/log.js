"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const safe_1 = __importDefault(require("colors/safe"));
class Logger {
    // Methods;
    error(message) {
        console.log(safe_1.default.red(safe_1.default.bold(`[Error]: ${message}`)));
        return;
    }
    warn(message) {
        console.log(safe_1.default.yellow(safe_1.default.bold(`[Warning]: ${message}`)));
        return;
    }
    info(message) {
        console.log(safe_1.default.cyan(safe_1.default.bold(`[INFO]: ${message}`)));
        return;
    }
    ok(message) {
        console.log(safe_1.default.green(safe_1.default.bold(`[OK]: ${message}`)));
        return;
    }
    progress(message) {
        console.log(safe_1.default.blue(safe_1.default.bold(safe_1.default.black(`[Progress]: ${message}`))));
        return;
    }
}
exports.Logger = Logger;
//# sourceMappingURL=log.js.map