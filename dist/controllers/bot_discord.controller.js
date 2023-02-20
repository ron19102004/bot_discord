"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatBotDiscordController = void 0;
const communication_model_1 = require("../models/communication.model");
const gg_sheets_service_1 = require("../services/gg.sheets.service");
class ChatBotDiscordController {
    constructor() {
        this.handle_event = (msg) => {
            if (String(msg.author.id) !== process.env.ID_BOT) {
                let message = this.handle_string_in(msg.content).toLowerCase().trim();
                this.ggSheetService.getCommunication().then((response) => __awaiter(this, void 0, void 0, function* () {
                    let check = false;
                    for (let i = 0; i < response.length; i++) {
                        if (message.indexOf(response[i].message.trim()) !== -1) {
                            msg.reply(`${response[i].reply}`);
                            check = true;
                            break;
                        }
                    }
                    if (message.indexOf("|") !== -1) {
                        let res = message.split("|");
                        if (res[2].indexOf("nhớ chưa") !== -1) {
                            let communication = new communication_model_1.CommunicationModel(res[0], res[1]);
                            yield this.ggSheetService.addCommunication(communication);
                            msg.reply(`Tôi đã nhớ rồi. Cảm ơn bạn đã chỉ bảo 😀😀😀`);
                        }
                        else {
                            msg.reply(`Có vẻ bạn đã dạy tôi sai cách rồi hjx. Thử lại i 😰😰😰`);
                        }
                    }
                    else {
                        if (!check) {
                            msg.reply(`Xin lỗi. Tớ đã ghi nhận câu hỏi và sẽ trả lời câu này cậu sau 😉😉😉.Nếu bạn biết câu trả lời hãy dạy tôi bằng cú pháp "Từ khóa | Câu trả lời | nhớ chưa"`);
                            let communication = new communication_model_1.CommunicationModel(`${message}`, "Chưa trả lời !!!");
                            yield this.ggSheetService.addCommunication(communication);
                        }
                    }
                }));
            }
        };
        this.handle_string_in = (str) => {
            let char_begin = (str.charAt(0) === "<") ? true : false;
            if (char_begin) {
                let char_close = (str.lastIndexOf(">") !== -1) ? (str.lastIndexOf(">") + 1) : 0;
                str = (char_close !== 0) ? str.slice(char_close, str.length) : str;
            }
            return str;
        };
        this.ggSheetService = new gg_sheets_service_1.GoogleSheetService();
    }
}
exports.ChatBotDiscordController = ChatBotDiscordController;
