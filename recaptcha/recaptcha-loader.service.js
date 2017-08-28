"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
require("rxjs/add/observable/of");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var Observable_1 = require("rxjs/Observable");
exports.RECAPTCHA_LANGUAGE = new core_1.OpaqueToken('recaptcha-language');
var RecaptchaLoaderService = (function () {
    function RecaptchaLoaderService(platformId, language) {
        this.platformId = platformId;
        this.language = language;
        this.init();
        this.ready = common_1.isPlatformBrowser(this.platformId) ? RecaptchaLoaderService.ready.asObservable() : Observable_1.Observable.of();
    }
    /** @internal */
    RecaptchaLoaderService.prototype.init = function () {
        if (RecaptchaLoaderService.ready) {
            return;
        }
        if (common_1.isPlatformBrowser(this.platformId)) {
            window.ng2recaptchaloaded = function () {
                RecaptchaLoaderService.ready.next(grecaptcha);
            };
            RecaptchaLoaderService.ready = new BehaviorSubject_1.BehaviorSubject(null);
            var script = document.createElement('script');
            script.innerHTML = '';
            var langParam = this.language ? '&hl=' + this.language : '';
            script.src = "https://www.google.com/recaptcha/api.js?render=explicit&onload=ng2recaptchaloaded" + langParam;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        }
    };
    RecaptchaLoaderService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    RecaptchaLoaderService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Inject, args: [core_1.PLATFORM_ID,] },] },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [exports.RECAPTCHA_LANGUAGE,] },] },
    ]; };
    return RecaptchaLoaderService;
}());
exports.RecaptchaLoaderService = RecaptchaLoaderService;