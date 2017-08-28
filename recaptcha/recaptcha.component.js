"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var recaptcha_loader_service_1 = require("./recaptcha-loader.service");
var recaptcha_settings_1 = require("./recaptcha-settings");
var nextId = 0;
var RecaptchaComponent = (function () {
    function RecaptchaComponent(loader, zone, settings) {
        this.loader = loader;
        this.zone = zone;
        this.id = "ngrecaptcha-" + nextId++;
        this.resolved = new core_1.EventEmitter();
        if (settings) {
            this.siteKey = settings.siteKey;
            this.theme = settings.theme;
            this.type = settings.type;
            this.size = settings.size;
            this.badge = settings.badge;
        }
    }
    RecaptchaComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.subscription = this.loader.ready.subscribe(function (grecaptcha) {
            if (grecaptcha != null) {
                _this.grecaptcha = grecaptcha;
                _this.renderRecaptcha();
            }
        });
    };
    RecaptchaComponent.prototype.ngOnDestroy = function () {
        // reset the captcha to ensure it does not leave anything behind
        // after the component is no longer needed
        this.grecaptchaReset();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    /**
     * Executes the invisible recaptcha.
     * Does nothing if component's size is not set to "invisible".
     */
    RecaptchaComponent.prototype.execute = function () {
        if (this.size !== 'invisible') {
            return;
        }
        if (this.widget != null) {
            this.grecaptcha.execute(this.widget);
        }
    };
    RecaptchaComponent.prototype.reset = function () {
        if (this.widget != null) {
            if (this.grecaptcha.getResponse(this.widget)) {
                // Only emit an event in case if something would actually change.
                // That way we do not trigger "touching" of the control if someone does a "reset"
                // on a non-resolved captcha.
                this.resolved.emit(null);
            }
            this.grecaptchaReset();
        }
    };
    /** @internal */
    RecaptchaComponent.prototype.expired = function () {
        this.resolved.emit(null);
    };
    /** @internal */
    RecaptchaComponent.prototype.captchaReponseCallback = function (response) {
        this.resolved.emit(response);
    };
    /** @internal */
    RecaptchaComponent.prototype.grecaptchaReset = function () {
        var _this = this;
        if (this.widget != null) {
            this.zone.runOutsideAngular(function () { return _this.grecaptcha.reset(_this.widget); });
        }
    };
    /** @internal */
    RecaptchaComponent.prototype.renderRecaptcha = function () {
        var _this = this;
        this.widget = this.grecaptcha.render(this.id, {
            badge: this.badge,
            callback: function (response) {
                _this.zone.run(function () { return _this.captchaReponseCallback(response); });
            },
            'expired-callback': function () {
                _this.zone.run(function () { return _this.expired(); });
            },
            sitekey: this.siteKey,
            size: this.size,
            tabindex: this.tabIndex,
            theme: this.theme,
            type: this.type,
        });
    };
    RecaptchaComponent.decorators = [
        { type: core_1.Component, args: [{
                    exportAs: 'reCaptcha',
                    selector: 're-captcha',
                    template: "",
                },] },
    ];
    /** @nocollapse */
    RecaptchaComponent.ctorParameters = function () { return [
        { type: recaptcha_loader_service_1.RecaptchaLoaderService, },
        { type: core_1.NgZone, },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [recaptcha_settings_1.RECAPTCHA_SETTINGS,] },] },
    ]; };
    RecaptchaComponent.propDecorators = {
        'id': [{ type: core_1.Input }, { type: core_1.HostBinding, args: ['attr.id',] },],
        'siteKey': [{ type: core_1.Input },],
        'theme': [{ type: core_1.Input },],
        'type': [{ type: core_1.Input },],
        'size': [{ type: core_1.Input },],
        'tabIndex': [{ type: core_1.Input },],
        'badge': [{ type: core_1.Input },],
        'resolved': [{ type: core_1.Output },],
    };
    return RecaptchaComponent;
}());
exports.RecaptchaComponent = RecaptchaComponent;
