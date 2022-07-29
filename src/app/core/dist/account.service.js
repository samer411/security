"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AccountService = void 0;
var core_1 = require("@angular/core");
var constants_1 = require("../constants");
var AccountService = /** @class */ (function () {
    function AccountService(_httpClient) {
        this._httpClient = _httpClient;
    }
    AccountService.prototype.getAllUsers = function () {
        return this._httpClient.get(constants_1.Constants.apiRoot + 'Account/Users');
    };
    AccountService.prototype.createUserProfile = function (userProfile) {
        return this._httpClient.post(constants_1.Constants.apiRoot + "Account/Profile", userProfile);
    };
    AccountService.prototype.updateUserProfile = function (userProfile) {
        return this._httpClient.put(constants_1.Constants.apiRoot + "Account/Profile/" + userProfile.id, userProfile);
    };
    AccountService.prototype.register = function (userInfo) {
        return this._httpClient.post(constants_1.Constants.apiRoot + "Account/Register", userInfo);
    };
    AccountService = __decorate([
        core_1.Injectable()
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;
