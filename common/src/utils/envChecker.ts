import { config } from "dotenv";
config();

export function checkEnvVariables(...requiredEnvVariables:string[]){
    requiredEnvVariables.forEach((variable)=>{

        if(!process.env[variable]){

            console.error(`Error: Missing requied environment variable ${variable}`)

        }

    });

}


