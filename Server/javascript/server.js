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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const init_1 = require("./databases/initialisation/mongoDB/init");
function InitDatabases() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, init_1.initMongo)();
    });
}
function LaunchServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield InitDatabases();
        const app = (0, express_1.default)();
        app.use(routes_1.default);
        const port = 3000;
        app.listen(port, () => {
            console.log(`Le serveur tourne sur le port ${port}`);
        });
    });
}
LaunchServer();
