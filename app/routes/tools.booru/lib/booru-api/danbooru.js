"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Safebooru = exports.Danbooru = exports.Testbooru = void 0;
var counts_1 = require("./counts");
var posts_1 = require("./posts");
var tags_1 = require("./tags");
var Booru = /** @class */ (function () {
    function Booru() {
        this._server = 'testbooru';
    }
    Booru._Posts = function (server) { return new posts_1.Posts({ server: server }); };
    Booru._Tags = function (server) { return new tags_1.Tags({ server: server }); };
    Booru._Counts = function (server) { return new counts_1.Counts({ server: server }); };
    return Booru;
}());
var Testbooru = exports.Testbooru = /** @class */ (function (_super) {
    __extends(Testbooru, _super);
    function Testbooru() {
        var _this = _super.call(this) || this;
        _this.Posts = Testbooru.Posts;
        _this.Tags = Testbooru.Tags;
        _this.Counts = Testbooru.Counts;
        return _this;
    }
    var _a;
    _a = Testbooru;
    Testbooru.Posts = _a._Posts("testbooru");
    Testbooru.Tags = _a._Tags("testbooru");
    Testbooru.Counts = _a._Counts("testbooru");
    return Testbooru;
}(Booru));
var Danbooru = exports.Danbooru = /** @class */ (function (_super) {
    __extends(Danbooru, _super);
    function Danbooru() {
        var _this = _super.call(this) || this;
        _this.Posts = Danbooru.Posts;
        _this.Tags = Danbooru.Tags;
        _this.Counts = Danbooru.Counts;
        return _this;
    }
    var _b;
    _b = Danbooru;
    Danbooru.Posts = _b._Posts("danbooru");
    Danbooru.Tags = _b._Tags("danbooru");
    Danbooru.Counts = _b._Counts("danbooru");
    return Danbooru;
}(Booru));
var Safebooru = exports.Safebooru = /** @class */ (function (_super) {
    __extends(Safebooru, _super);
    function Safebooru() {
        var _this = _super.call(this) || this;
        _this.Posts = Safebooru.Posts;
        _this.Tags = Safebooru.Tags;
        _this.Counts = Safebooru.Counts;
        return _this;
    }
    var _c;
    _c = Safebooru;
    Safebooru.Posts = _c._Posts("safebooru");
    Safebooru.Tags = _c._Tags("safebooru");
    Safebooru.Counts = _c._Counts("safebooru");
    return Safebooru;
}(Booru));
