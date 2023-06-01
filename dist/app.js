"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// TODO: Delete unneeded requires
// require('express-async-errors') // Eliminates try-catch blocks completely with the use of implied next()'s
// Import utilities
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require('./utils/middleware');
// Import controllers
const citiesRouter = require("./controllers/cities.js");
const app = (0, express_1.default)();
app.use(cors_1.default);
app.use(express_1.default.json());
app.use(middleware.requestLogger);
app.use("/api/cities", citiesRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
exports.default = app;
