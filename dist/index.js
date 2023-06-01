"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");
const server = http.createServer(app_1.default);
server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
});
