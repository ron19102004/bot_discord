import bodyParser from "body-parser";
import express from "express";
import * as dotenv from "dotenv";
import { ChatBotDiscordApp } from "./bot_discord.app";
dotenv.config();
export class App {
    private app:express.Application;
    private port:number;
    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT || "3000");
        this.init();
    };
    private init=():void=>{
        this.setUp();
        this.route();
        this.run();
    }
    private route =():void=>{
    }
    private setUp=():void => {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    };
    private run = ():void =>{
        new ChatBotDiscordApp().run();
        this.app.listen(this.port, ():void => {
            console.log(`listening on http://localhost:${this.port}`)
        })
    }
}
