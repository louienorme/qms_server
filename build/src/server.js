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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var dotenv_1 = __importDefault(require("dotenv"));
var dbConnect_1 = __importDefault(require("./_config/dbConnect"));
// Routes
var routers_1 = __importDefault(require("./auth/routers"));
var routers_2 = __importDefault(require("./accounts/routers"));
var routers_3 = __importDefault(require("./queue/routers"));
var routers_4 = __importDefault(require("./pool/routers"));
var routers_5 = __importDefault(require("./archive/routers"));
// Require Env
dotenv_1.default.config();
// Create Server
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
// Limiters
if (process.env.NODE_ENV === 'production') {
    app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
}
// app.use(speedLimiter)
// app.use(rateLimiter)
// Enables to handle json requests
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('tiny'));
// APIs
app.use('/api/auth', routers_1.default);
app.use('/api/accounts', routers_2.default);
app.use('/api/queue', routers_3.default);
app.use('/api/pools', routers_4.default);
app.use('/api/archives', routers_5.default);
// Test apis for webhook
app.post('/webhook', function (req, res, next) {
    console.log({ 'This is test webhook endpoint': req });
});
// Run App
var port = process.env.PORT || 5000;
var runServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.clear();
                console.log('This is the Queue Management System Backend Server by Enorme, John Loui and Ang, Eric Geo \n');
                return [4 /*yield*/, (0, dbConnect_1.default)()];
            case 1:
                if (_a.sent()) {
                    server.listen(port, function () {
                        console.log("Now running and listening at \u001B[32m".concat(process.env.NODE_ENV === 'development' ? 'localhost:' : 'SERVER-IP').concat(port), '\x1b[0m');
                        console.log('Server logging starts now.');
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
runServer();
