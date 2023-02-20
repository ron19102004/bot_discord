import * as dotenv from "dotenv";
import { ChatBotDiscordController } from "../controllers/bot_discord.controller";
dotenv.config();
const Discord = require("discord.js");
export class ChatBotDiscordApp {
    private chatBotDiscordController: ChatBotDiscordController;
    private client:any;
    private token_bot:string;
    constructor(){
        this.client = new Discord.Client();
        this.chatBotDiscordController= new ChatBotDiscordController();
        this.token_bot = process.env.TOKEN_BOT || "undefined";
    }
    public run = ():void =>{
        this.setUp();
        this.client.on('message', (msg:any) => {
            this.chatBotDiscordController.handle_event(msg);
        });     
    }
     private setUp=():void =>{
        this.client.once('ready', () => {
            console.log("Discord bot online")
        });
        this.client.login(String(this.token_bot))
    }
}
