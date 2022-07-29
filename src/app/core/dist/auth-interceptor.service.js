"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthInterceptorService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var constants_1 = require("../constants");
var AuthInterceptorService = /** @class */ (function () {
    function AuthInterceptorService(_authService, _router) {
        this._authService = _authService;
        this._router = _router;
    }
    AuthInterceptorService.prototype.intercept = function (req, next) {
        var _this = this;
        if (req.url.startsWith(constants_1.Constants.apiRoot)) {
            return rxjs_1.from(this._authService.getAccessToken().then(function (token) {
                var headers = new http_1.HttpHeaders().set('Authorization', "Bearer " + token);
                var authReq = req.clone({ headers: headers });
                return next.handle(authReq).pipe(operators_1.tap(function (_) { }, function (error) {
                    var respError = error;
                    if (respError && (respError.status === 401 || respError.status === 403)) {
                        _this._router.navigate(['/unauthorized']);
                    }
                })).toPromise();
            }));
        }
        else {
            return next.handle(req);
        }
    };
    AuthInterceptorService = __decorate([
        core_1.Injectable()
    ], AuthInterceptorService);
    return AuthInterceptorService;
}());
exports.AuthInterceptorService = AuthInterceptorService;
