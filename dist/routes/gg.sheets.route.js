"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleSheetRoute = void 0;
const express_1 = require("express");
const gg_sheets_controller_1 = require("../controllers/gg.sheets.controller");
class GoogleSheetRoute {
    constructor() {
        this.init = () => {
            this.route.get(`${this.path}`, this.ggSheetController.getDoc);
        };
        this.ggSheetController = new gg_sheets_controller_1.GoogleSheetController();
        this.route = (0, express_1.Router)();
        this.path = "/my-sheets";
        this.init();
    }
    ;
}
exports.GoogleSheetRoute = GoogleSheetRoute;
