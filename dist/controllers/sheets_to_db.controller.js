"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertSheetToDatabase = void 0;
const gg_sheets_service_1 = require("../services/gg.sheets.service");
const reaction_service_1 = require("../services/reaction.service");
class ConvertSheetToDatabase {
    constructor() {
        this.reactionService = new reaction_service_1.ReactionService();
        this.ggSheetService = new gg_sheets_service_1.GoogleSheetService();
        this.convert();
    }
}
exports.ConvertSheetToDatabase = ConvertSheetToDatabase;
