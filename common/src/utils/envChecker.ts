import { config } from "dotenv";
config();

export function checkEnvVariables(...requiredEnvVariables: string[]): void {
  requiredEnvVariables.forEach((variable) => {
    if (!process.env[variable]) {
      console.error(`❌ Missing required environment variable: ${variable}`);
      process.exit(1); // stop the app if a critical env is missing
    }
  });
}
