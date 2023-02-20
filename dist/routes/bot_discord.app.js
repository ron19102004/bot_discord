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
const communication_controller_1 = require("../controllers/communication.controller");
dotenv.config();
class ChatBotDiscordApp {
    constructor(client) {
        this.setUp = () => {
            this.client.once('ready', () => {
                console.log("Discord bot online");
            });
            this.client.login(String(this.token_bot));
        };
        this.do_event = () => {
            this.client.on('message', (msg) => {
                if (String(msg.author.id) !== process.env.ID_BOT) {
                    let message = this.handle_string_in(msg.content);
                    let communication = this.communicationController.findByMessage(message.toLowerCase());
                    if (communication) {
                        communication.then((data) => {
                            if (data.key === "Lời chào hỏi") {
                            }
                        });
                    }
                }
            });
        };
        this.handle_string_in = (str) => {
            let char_begin = (str.charAt(0) === "<") ? true : false;
            if (char_begin) {
                let char_close = (str.lastIndexOf(">") !== -1) ? (str.lastIndexOf(">") + 1) : 0;
                str = (char_close !== 0) ? str.slice(char_close, str.length) : str;
            }
            return str.trim();
        };
        this.client = client;
        this.communicationController = new communication_controller_1.CommunicationController();
        this.token_bot = process.env.TOKEN_BOT || "undefined";
        this.setUp();
        this.do_event();
    }
}
exports.ChatBotDiscordApp = ChatBotDiscordApp;
