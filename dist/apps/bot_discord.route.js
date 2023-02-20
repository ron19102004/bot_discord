"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatBotDiscordApp = void 0;
const dotenv = __importStar(require("dotenv"));
const bot_discord_controller_1 = require("../controllers/bot_discord.controller");
dotenv.config();
const Discord = require("discord.js");
class ChatBotDiscordApp {
    constructor() {
        this.setUp = () => {
            this.client.once('ready', () => {
                console.log("Discord bot online");
            });
            this.client.login(String(this.token_bot));
        };
        this.event = () => {
            this.client.on('message', (msg) => {
                this.chatBotDiscordController.handle_event(msg);
            });
        };
        this.client = new Discord.Client();
        this.chatBotDiscordController = new bot_discord_controller_1.ChatBotDiscordController();
        this.token_bot = process.env.TOKEN_BOT || "undefined";
        this.setUp();
        this.event();
    }
}
exports.ChatBotDiscordApp = ChatBotDiscordApp;
