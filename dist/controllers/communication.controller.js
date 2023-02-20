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
exports.CommunicationController = void 0;
const communication_service_1 = require("../services/communication.service");
class CommunicationController {
    constructor() {
        this.findByMessage = (msg) => __awaiter(this, void 0, void 0, function* () {
            return yield this.commService.findByMessage(msg);
        });
        this.findByKey = (key) => __awaiter(this, void 0, void 0, function* () {
            return yield this.commService.findByKey(key);
        });
        this.commService = new communication_service_1.CommunicationService();
    }
}
exports.CommunicationController = CommunicationController;
