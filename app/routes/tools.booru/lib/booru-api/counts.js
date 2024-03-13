"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counts = void 0;
var https = __importStar(require("https"));
var qs = __importStar(require("qs"));
/*
GET    /counts/posts(.:format)                                      counts#posts
GET    /counts(.:format)                                            counts#index
GET    /counts/new(.:format)                                        counts#new
GET    /counts/:id/edit(.:format)                                   counts#edit
GET    /counts/:id(.:format)                                        counts#show
POST   /counts(.:format)                                            counts#create
PATCH  /counts/:id(.:format)                                        counts#update
PUT    /counts/:id(.:format)                                        counts#update
DELETE /counts/:id(.:format)                                        counts#destroy
 */
var Counts = /** @class */ (function () {
    function Counts(_a) {
        var _b = _a === void 0 ? { server: "testbooru" } : _a, server = _b.server;
        this._server = server;
        return this;
    }
    Counts.prototype.tags = function (tags) {
        if (typeof tags == 'string') {
            this._tags = tags;
        }
        else {
            this._tags = '';
            for (var _i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
                var tag = tags_1[_i];
                this._tags = this._tags.concat(tag, ' ');
            }
            this._tags = this._tags.slice(0, -1);
        }
        return this;
    };
    Counts.prototype.get = function () {
        console.log(this._tags);
        var body = {
            _method: 'get',
            tags: this._tags == undefined ? '' : this._tags,
        };
        var options = {
            host: this._server + '.donmai.us',
            headers: {
                'User-Agent': 'curl/7.68.0',
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": Buffer.byteLength(qs.stringify(body))
            },
            path: '/counts/posts.json',
            method: 'POST',
        };
        return new Promise(function (res, rej) {
            var req = https.request(options, function (response) {
                if (response.statusCode != 200) {
                    return rej(new Error('Request denied'));
                }
                var b = '';
                response.on('data', function (c) {
                    b += c;
                });
                response.on('close', function () {
                    var ps = JSON.parse(b);
                    res(ps);
                });
            });
            req.end(qs.stringify(body));
        });
    };
    return Counts;
}());
exports.Counts = Counts;
