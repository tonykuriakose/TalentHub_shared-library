"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEnvVariables = checkEnvVariables;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
function checkEnvVariables(...requiredEnvVariables) {
    requiredEnvVariables.forEach((variable) => {
        if (!process.env[variable]) {
            console.error(`❌ Missing required environment variable: ${variable}`);
            process.exit(1); // stop the app if a critical env is missing
        }
    });
}
