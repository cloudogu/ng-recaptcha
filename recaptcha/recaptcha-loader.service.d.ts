/// <reference types="grecaptcha" />
import { OpaqueToken } from '@angular/core';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
export declare const RECAPTCHA_LANGUAGE: OpaqueToken;
export declare class RecaptchaLoaderService {
    private readonly platformId;
    ready: Observable<ReCaptchaV2.ReCaptcha>;
    constructor(platformId: {}, language?: string);
}
