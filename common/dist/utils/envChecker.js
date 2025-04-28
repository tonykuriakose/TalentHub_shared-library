"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEnvVariables = checkEnvVariables;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function checkEnvVariables(...requiredEnvVariables) {
    requiredEnvVariables.forEach((variable) => {
        if (!process.env[variable]) {
            console.error(`Error: Missing required environment variable: '${variable}'`);
            process.exit(1);
        }
    });
}
//# sourceMappingURL=envChecker.js.map