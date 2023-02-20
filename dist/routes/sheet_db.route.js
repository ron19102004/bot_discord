"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SheetDatabaseRoute = void 0;
const express_1 = require("express");
const sheet_db_controller_1 = require("../controllers/sheet_db.controller");
class SheetDatabaseRoute {
    constructor() {
        this.init = () => {
            this.route.get(`${this.path}/convert-s-db`, this.sheetDatabaseController.convertS_DB);
        };
        this.sheetDatabaseController = new sheet_db_controller_1.SheetDatabaseController();
        this.route = (0, express_1.Router)();
        this.path = "/handle-sheet-database";
        this.init();
    }
}
exports.SheetDatabaseRoute = SheetDatabaseRoute;
