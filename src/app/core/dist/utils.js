"use strict";
exports.__esModule = true;
exports.Utils = void 0;
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.formatError = function (error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            return 'An error occurred: ' + error.error.message;
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            var msg = "Unknown error";
            if (error.error && typeof error.error === 'string') {
                msg = error.error;
            }
            else if (error.message) {
                msg = error.message;
            }
            return "Backend returned code " + error.status + ", " + error.error;
        }
    };
    ;
    return Utils;
}());
exports.Utils = Utils;
