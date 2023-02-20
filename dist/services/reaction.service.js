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
exports.ReactionService = void 0;
const bot_discord_app_1 = require("../apps/bot_discord.app");
const reaction_model_1 = require("../models/reaction.model");
class ReactionService {
    constructor() {
        this.findAll = () => __awaiter(this, void 0, void 0, function* () {
            return this.repository ? yield this.repository.find() : [];
        });
        this.findByMessage = (message) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            let reaction = yield ((_a = this.repository) === null || _a === void 0 ? void 0 : _a.findOneBy({ message: message }));
            if (!reaction)
                return null;
            return reaction;
        });
        this.create = (reaction) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            yield ((_b = this.repository) === null || _b === void 0 ? void 0 : _b.save(reaction));
        });
        if (bot_discord_app_1.dataSource)
            this.repository = bot_discord_app_1.dataSource.getRepository(reaction_model_1.ReactionModel);
    }
}
exports.ReactionService = ReactionService;
