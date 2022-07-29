"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CoreModule = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var auth_interceptor_service_1 = require("./auth-interceptor.service");
var auth_service_component_1 = require("./auth-service.component");
var account_service_1 = require("./account.service");
var project_service_1 = require("./project.service");
var admin_route_guard_1 = require("./admin-route-guard");
var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        core_1.NgModule({
            imports: [],
            exports: [],
            declarations: [],
            providers: [
                auth_service_component_1.AuthService,
                account_service_1.AccountService,
                project_service_1.ProjectService,
                admin_route_guard_1.AdminRouteGuard,
                { provide: http_1.HTTP_INTERCEPTORS, useClass: auth_interceptor_service_1.AuthInterceptorService, multi: true }
            ]
        })
    ], CoreModule);
    return CoreModule;
}());
exports.CoreModule = CoreModule;
