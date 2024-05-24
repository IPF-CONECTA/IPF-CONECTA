"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
require("dotenv/config");
const main_1 = require("./database/main");
const PORT = process.env.PORT || 4000;
(0, main_1.databaseConnection)();
server_1.default.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
