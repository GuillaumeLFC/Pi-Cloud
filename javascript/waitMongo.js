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
exports.waitForMongoDB = void 0;
const Docker = require('dockerode');
function waitForMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const docker = new Docker({ host: 'tcp://localhost', port: 2375 });
            const container = docker.getContainer('mongo');
            while (true) {
                const { State } = yield container.inspect();
                if (State.Health && State.Health.Status === 'healthy') {
                    console.log('Mongo pret ! ');
                    break;
                }
                yield new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
            }
        }
        catch (error) {
            console.error(error);
        }
        ;
    });
}
exports.waitForMongoDB = waitForMongoDB;
;
