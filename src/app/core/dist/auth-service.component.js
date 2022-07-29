"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var oidc_client_1 = require("oidc-client");
var constants_1 = require("../constants");
var rxjs_1 = require("rxjs");
var auth_context_1 = require("../model/auth-context");
var AuthService = /** @class */ (function () {
    function AuthService(_httpClient) {
        var _this = this;
        this._httpClient = _httpClient;
        this._loginChangedSubject = new rxjs_1.Subject();
        this.loginChanged = this._loginChangedSubject.asObservable();
        var stsSettings = {
            authority: constants_1.Constants.stsAuthority,
            client_id: constants_1.Constants.clientId,
            redirect_uri: constants_1.Constants.clientRoot + "signin-callback",
            scope: 'openid profile projects-api',
            response_type: 'code',
            post_logout_redirect_uri: constants_1.Constants.clientRoot + "signout-callback",
            automaticSilentRenew: true,
            silent_redirect_uri: constants_1.Constants.clientRoot + "assets/silent-callback.html"
        };
        this._userManager = new oidc_client_1.UserManager(stsSettings);
        this._userManager.events.addAccessTokenExpired(function (_) {
            _this._loginChangedSubject.next(false);
        });
        this._userManager.events.addUserLoaded(function (user) {
            if (_this._user !== user) {
                _this._user = user;
                _this.loadSecurityContext();
                _this._loginChangedSubject.next(!!user && !user.expired);
            }
        });
    }
    AuthService.prototype.login = function () {
        return this._userManager.signinRedirect();
    };
    AuthService.prototype.isLoggedIn = function () {
        var _this = this;
        return this._userManager.getUser().then(function (user) {
            var userCurrent = !!user && !user.expired;
            if (_this._user !== user) {
                _this._loginChangedSubject.next(userCurrent);
            }
            if (userCurrent && !_this.authContext) {
                _this.loadSecurityContext();
            }
            _this._user = user;
            return userCurrent;
        });
    };
    AuthService.prototype.completeLogin = function () {
        var _this = this;
        return this._userManager.signinRedirectCallback().then(function (user) {
            _this._user = user;
            _this._loginChangedSubject.next(!!user && !user.expired);
            return user;
        });
    };
    AuthService.prototype.logout = function () {
        this._userManager.signoutRedirect();
    };
    AuthService.prototype.completeLogout = function () {
        this._user = null;
        this._loginChangedSubject.next(false);
        return this._userManager.signoutRedirectCallback();
    };
    AuthService.prototype.getAccessToken = function () {
        return this._userManager.getUser().then(function (user) {
            if (!!user && !user.expired) {
                return user.access_token;
            }
            else {
                return null;
            }
        });
    };
    AuthService.prototype.loadSecurityContext = function () {
        var _this = this;
        this._httpClient
            .get(constants_1.Constants.apiRoot + "Projects/AuthContext")
            .subscribe(function (context) {
            _this.authContext = new auth_context_1.AuthContext();
            _this.authContext.claims = context.claims;
            _this.authContext.userProfile = context.userProfile;
        }, function (error) { return console.error(error); });
    };
    AuthService = __decorate([
        core_1.Injectable()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
