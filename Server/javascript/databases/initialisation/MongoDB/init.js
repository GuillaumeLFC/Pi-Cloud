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
exports.initMongo = exports.db = exports.databaseName = void 0;
const photos_1 = require("./photos");
const mongoDB_1 = require("../../connection/mongoDB");
exports.databaseName = "Pi-Cloud";
function initMongo(client) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("on est dans le inti mongo");
        if (!client) {
            client = mongoDB_1.defaultClient;
        }
        yield (0, mongoDB_1.connectoMongo)(client);
        exports.db = client.db(exports.databaseName);
        yield (0, photos_1.checkAndValidateMongoPhotosRequirement)(exports.db);
        yield (0, mongoDB_1.disconnectfromMongo)(client);
    });
}
exports.initMongo = initMongo;
