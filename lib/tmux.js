"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
/* The format prevents  */
var NAME_FORMAT = /^[^"';]+$/;
/**
 * An adapter class containing methods to execute common
 * tmux operations.
 */
var Tmux = /** @class */ (function () {
    function Tmux(options) {
        this.options = __assign({ command: "tmux" }, options);
    }
    /**
     * Create a new session of the given name
     *
     * @param name Session name
     * @param command Optional command to execute
     */
    Tmux.prototype.newSession = function (name, command) {
        return __awaiter(this, void 0, void 0, function () {
            var ext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this._validate(name) || name.length > 50)) return [3 /*break*/, 1];
                        throw new Error("Illegal session name");
                    case 1: return [4 /*yield*/, this.hasSession(name)];
                    case 2:
                        if (_a.sent()) {
                            throw new Error("Session '" + name + "' already exists");
                        }
                        _a.label = 3;
                    case 3:
                        ext = command ? " " + command : '';
                        return [4 /*yield*/, this._exec(this.options.command + " new -d -s \"" + name + "\"" + ext)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * List of sessions currently active
     */
    Tmux.prototype.listSessions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var out;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._exec(this.options.command + " ls -F \"#S\"", true)];
                    case 1:
                        out = _a.sent();
                        if (!out)
                            return [2 /*return*/, []];
                        return [2 /*return*/, out.split('\n').filter(function (s) { return !!s; })];
                }
            });
        });
    };
    /**
     * Returns whether a session with the given name exists
     *
     * @param name Session to check
     */
    Tmux.prototype.hasSession = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._validate(name) || name.length > 50) {
                            throw new Error("Illegal session name");
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._exec(this.options.command + " has-session -t \"" + name + "\"")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Kills the session with the given name
     *
     * @param name Session to kill
     */
    Tmux.prototype.killSession = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this._validate(name) || name.length > 50)) return [3 /*break*/, 1];
                        throw new Error("Illegal session name");
                    case 1: return [4 /*yield*/, this.hasSession(name)];
                    case 2:
                        if (!(_a.sent())) {
                            throw new Error("Session '" + name + "'does not exist");
                        }
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this._exec(this.options.command + " kill-session -t \"" + name + "\"")];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Rename the session with the given name
     *
     * @param name Session to kill
     */
    Tmux.prototype.renameSession = function (name, newName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this._validate(name) || name.length > 50)) return [3 /*break*/, 1];
                        throw new Error("Illegal session name");
                    case 1: return [4 /*yield*/, this.hasSession(name)];
                    case 2:
                        if (!(_a.sent())) {
                            throw new Error("Session '" + name + "'does not exist");
                        }
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this._exec(this.options.command + " rename-session -t \"" + name + "\" \"" + newName + "\"")];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Write text input to the given process
     *
     * @param name Session name
     * @param print Text to write
     * @param newline Whether the end with an eneter (Execute input). Defaults to false
     */
    Tmux.prototype.writeInput = function (name, print, newline) {
        if (newline === void 0) { newline = false; }
        return __awaiter(this, void 0, void 0, function () {
            var ext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this._validate(name) || name.length > 50)) return [3 /*break*/, 1];
                        throw new Error("Illegal session name");
                    case 1: return [4 /*yield*/, this.hasSession(name)];
                    case 2:
                        if (!(_a.sent())) {
                            throw new Error("Session '" + name + "'does not exist");
                        }
                        _a.label = 3;
                    case 3:
                        ext = newline ? ' Enter' : '';
                        return [4 /*yield*/, this._exec(this.options.command + " send-keys -t \"" + name + "\" \"" + print + "\"" + ext)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Command Execution utility method
     *
     * @param command Command to execute
     */
    Tmux.prototype._exec = function (command, ignoreError) {
        var _this = this;
        if (ignoreError === void 0) { ignoreError = false; }
        return new Promise(function (success, reject) {
            child_process_1.exec(command, _this.options, function (err, stdout) {
                if (err && !ignoreError) {
                    reject(err);
                }
                else {
                    success(stdout);
                }
            });
        });
    };
    ;
    /**
     * Validate the given session name
     *
     * @param name Session name
     */
    Tmux.prototype._validate = function (name) {
        return NAME_FORMAT.test(name);
    };
    return Tmux;
}());
exports.Tmux = Tmux;
/**
 * Create a new Tmux instance with the given options. Returns null when the tmux command
 * cannot be found or executed properly.
 */
function tmux(options) {
    if (options === void 0) { options = {}; }
    return new Promise(function (success, reject) {
        var cmd = (options.command || "tmux") + " -V";
        var process = child_process_1.exec(cmd, {
            shell: options.shell
        });
        process.on('exit', function (code) {
            if (code == 0) {
                success(new Tmux(options));
            }
            else {
                reject(new Error("Failed to locate tmux command (exit code " + code + ")"));
            }
        });
    });
}
exports.tmux = tmux;
