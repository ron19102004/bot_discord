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
exports.SheetDatabaseController = void 0;
const gg_sheets_service_1 = require("../services/gg.sheets.service");
class SheetDatabaseController {
    constructor() {
        this.convertS_DB = () => __awaiter(this, void 0, void 0, function* () {
            let list_reaction = yield this.ggSheetService.getReaction();
            if (list_reaction.length === 0)
                return;
            list_reaction.map((reaction) => __awaiter(this, void 0, void 0, function* () {
                yield this.CommunicationService.create(reaction);
            }));
        });
        this.ggSheetService = new gg_sheets_service_1.GoogleSheetService();
    }
}
exports.SheetDatabaseController = SheetDatabaseController;