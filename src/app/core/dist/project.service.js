"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProjectService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var constants_1 = require("../constants");
var ProjectService = /** @class */ (function () {
    function ProjectService(_httpClient, _authService) {
        this._httpClient = _httpClient;
        this._authService = _authService;
    }
    ProjectService.prototype.getProjects = function () {
        var _this = this;
        return rxjs_1.from(this._authService.getAccessToken().then(function (token) {
            var headers = new http_1.HttpHeaders().set('Authorization', "Bearer " + token);
            return _this._httpClient
                .get(constants_1.Constants.apiRoot + 'Projects', { headers: headers })
                .toPromise();
        }));
    };
    ProjectService.prototype.getProject = function (projectId) {
        return this._httpClient.get(constants_1.Constants.apiRoot + 'Projects/' + projectId);
    };
    ProjectService.prototype.getProjectUsers = function (projectId) {
        return this._httpClient.get(constants_1.Constants.apiRoot + 'Projects/' + projectId + '/Users');
    };
    ProjectService.prototype.addProject = function (project) {
        return this._httpClient.post(constants_1.Constants.apiRoot + 'Projects', project);
    };
    ProjectService.prototype.deleteProject = function (project) {
        return this._httpClient["delete"](constants_1.Constants.apiRoot + 'Projects/' + project.id);
    };
    ProjectService.prototype.addUserPermission = function (userPermission) {
        return this._httpClient.post(constants_1.Constants.apiRoot + 'UserPermissions', userPermission);
    };
    ProjectService.prototype.removeUserPermission = function (userId, projectId) {
        return this._httpClient["delete"](constants_1.Constants.apiRoot + "UserPermissions/?userId=" + userId + "&projectId=" + projectId);
    };
    ProjectService.prototype.updateUserPermission = function (userPermission) {
        return this._httpClient.put(constants_1.Constants.apiRoot + "UserPermissions", userPermission);
    };
    ProjectService.prototype.getMilestones = function (projectId) {
        return this._httpClient.get(constants_1.Constants.apiRoot + 'Milestone');
    };
    ProjectService.prototype.getMilestoneStatuses = function () {
        return this._httpClient.get(constants_1.Constants.apiRoot + "Projects/MilestoneStatuses");
    };
    ProjectService.prototype.addMilestone = function (milestone) {
        return this._httpClient.post(constants_1.Constants.apiRoot + "Projects/Milestones", milestone);
    };
    ProjectService.prototype.deleteMilestone = function (id) {
        return this._httpClient["delete"](constants_1.Constants.apiRoot + "Projects/Milestones/" + id);
    };
    ProjectService.prototype.updateMilestone = function (milestone) {
        return this._httpClient.put(constants_1.Constants.apiRoot + "Projects/Milestones/" + milestone.id, milestone);
    };
    ProjectService = __decorate([
        core_1.Injectable()
    ], ProjectService);
    return ProjectService;
}());
exports.ProjectService = ProjectService;
