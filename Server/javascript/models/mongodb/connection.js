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
exports.disconnectMongo = exports.connectoMongo = exports.client = void 0;
const mongodb_1 = require("mongodb");
// Replace the placeholder with your Atlas connection string
const uri = "mongodb://mongo";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
exports.client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    family: 4,
});
function connectoMongo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect the client to the server (optional starting in v4.7)
            yield exports.client.connect();
            // Send a ping to confirm a successful connection
            yield exports.client.db("admin").command({ ping: 1 });
            console.log("Connexion à mongoDB réussie !");
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
}
exports.connectoMongo = connectoMongo;
function disconnectMongo() {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.client.close();
        console.log('Déconnexion de MongoDB réussie ');
    });
}
exports.disconnectMongo = disconnectMongo;
