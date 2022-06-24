"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Server_1 = require("./Server");
var Launcher = /** @class */ (function () {
    function Launcher() {
        this.server = new Server_1.Server();
    }
    Launcher.prototype.launchApp = function () {
        console.log('app launched');
        this.server.createServer();
    };
    return Launcher;
}());
new Launcher().launchApp();
//# sourceMappingURL=Launcher.js.map