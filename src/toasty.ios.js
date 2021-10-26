import { Color, Device, Enums, Frame, Screen, Utils } from '@nativescript/core';
import { ToastDuration, ToastPosition } from './toast.common';
export * from './toast.common';
export class Toasty {
    constructor(opts) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        this._toastStyle = ToastStyle.new();
        this._text = (_a = opts) === null || _a === void 0 ? void 0 : _a.text;
        this._duration = (_c = (_b = opts) === null || _b === void 0 ? void 0 : _b.duration, (_c !== null && _c !== void 0 ? _c : 2));
        this._position = (_e = (_d = opts) === null || _d === void 0 ? void 0 : _d.position, (_e !== null && _e !== void 0 ? _e : 2));
        this._textColor = (_g = (_f = opts) === null || _f === void 0 ? void 0 : _f.textColor, (_g !== null && _g !== void 0 ? _g : 'white'));
        this._backgroundColor = ((_h = opts) === null || _h === void 0 ? void 0 : _h.backgroundColor) || 'black';
        this._iOSOpts = (_k = (_j = opts) === null || _j === void 0 ? void 0 : _j.ios, (_k !== null && _k !== void 0 ? _k : {}));
        this._x = (_l = opts) === null || _l === void 0 ? void 0 : _l.xAxisOffset;
        this._y = (_m = opts) === null || _m === void 0 ? void 0 : _m.yAxisOffset;
        this._tapToDismiss = (_p = (_o = opts) === null || _o === void 0 ? void 0 : _o.tapToDismiss, (_p !== null && _p !== void 0 ? _p : false));
        this._anchorView = (_q = opts) === null || _q === void 0 ? void 0 : _q.anchorView;
        this.setToastDuration(this._duration)
            .setToastPosition(this._position)
            .setTextColor(this._textColor)
            .setBackgroundColor(this._backgroundColor);
        if (this._iOSOpts.displayShadow) {
            this._toastStyle.displayShadow = this._iOSOpts.displayShadow;
            if (this._iOSOpts.shadowColor) {
                if (typeof this._iOSOpts.shadowColor === 'string') {
                    this._toastStyle.shadowColor = new Color(this._iOSOpts.shadowColor).ios;
                }
                else {
                    this._toastStyle.shadowColor = (_t = (_s = (_r = this._iOSOpts) === null || _r === void 0 ? void 0 : _r.shadowColor) === null || _s === void 0 ? void 0 : _s.ios, (_t !== null && _t !== void 0 ? _t : new Color('black').ios));
                }
            }
        }
        if (this._iOSOpts.cornerRadius || this._iOSOpts.cornerRadius === 0) {
            this._toastStyle.cornerRadius = this._iOSOpts.cornerRadius;
        }
        if (this._iOSOpts.messageNumberOfLines) {
            this._toastStyle.messageNumberOfLines = this._iOSOpts.messageNumberOfLines;
        }
        ToastManager.shared.isTapToDismissEnabled = this._tapToDismiss;
        ToastManager.shared.style = this._toastStyle;
        return this;
    }
    get position() {
        return this._position;
    }
    set position(value) {
        if (value) {
            this._position = value;
            this.setToastPosition(value);
        }
    }
    get duration() {
        return this._duration;
    }
    set duration(value) {
        if (value) {
            this._duration = value;
            this.setToastDuration(value);
        }
    }
    get textColor() {
        return this._textColor;
    }
    set textColor(value) {
        if (value) {
            this._textColor = value;
            this.setTextColor(value);
        }
    }
    get backgroundColor() {
        return this._backgroundColor;
    }
    set backgroundColor(value) {
        if (value) {
            this._backgroundColor = value;
            this.setBackgroundColor(value);
        }
    }
    set xAxisOffset(value) {
        this._x = value;
        this._updateToastPosition();
    }
    set yAxisOffset(value) {
        this._y = value;
        this._updateToastPosition();
    }
    get xAxisOffset() {
        return this._x;
    }
    get yAxisOffset() {
        return this._y;
    }
    static isLength(value) {
        return (value &&
            !Utils.isNullOrUndefined(value.unit) &&
            !Utils.isNullOrUndefined(value.value));
    }
    get yPixels() {
        let y;
        if (typeof this._y === 'number') {
            y = this._y;
        }
        if (Toasty.isLength(this._y)) {
            if (this._y.unit === 'px') {
                y = this._y.value / Screen.mainScreen.scale;
            }
            if (this._y.unit === 'dip') {
                y = this._y.value;
            }
        }
        if (typeof this._y === 'string') {
            if (this._y.includes('px')) {
                y = parseInt(this._y.replace('px', ''), 0) / Screen.mainScreen.scale;
            }
            if (this._y.includes('dip')) {
                y = parseInt(this._y.replace('dip', ''), 0);
            }
        }
        return y;
    }
    get xPixels() {
        let x;
        if (typeof this._x === 'number') {
            x = this._x;
        }
        if (Toasty.isLength(this._x)) {
            if (this._x.unit === 'px') {
                x = this._x.value / Screen.mainScreen.scale;
            }
            if (this._x.unit === 'dip') {
                x = this._x.value;
            }
        }
        if (typeof this._x === 'string') {
            if (this._x.includes('px')) {
                x = parseInt(this._x.replace('px', ''), 0) / Screen.mainScreen.scale;
            }
            if (this._x.includes('dip')) {
                x = parseInt(this._x.replace('dip', ''), 0);
            }
        }
        return x;
    }
    getOffset(offset) {
        let symbol;
        switch (this._position) {
            case ToastPosition.TOP_LEFT:
            case ToastPosition.BOTTOM_LEFT:
            case ToastPosition.CENTER_LEFT:
                symbol = '-';
                break;
            case ToastPosition.TOP_RIGHT:
            case ToastPosition.BOTTOM_RIGHT:
            case ToastPosition.CENTER_RIGHT:
                symbol = '+';
                break;
            default:
                const value = `${offset}`;
                if (value.includes('-')) {
                    symbol = '';
                }
                else {
                    symbol = '-';
                }
                break;
        }
        const result = Number(`${symbol}${offset}`);
        return Number.isNaN(result) ? undefined : result;
    }
    show() {
        var _a, _b, _c;
        if (!this._text) {
            throw new Error('Text is not set');
        }
        else {
            (_a = this._getView()) === null || _a === void 0 ? void 0 : _a.makeToastWithOffset(this._text, CGPointMake((_b = this.getOffset(this.xPixels), (_b !== null && _b !== void 0 ? _b : 0)), (_c = this.getOffset(this.yPixels), (_c !== null && _c !== void 0 ? _c : 0))));
        }
    }
    get width() {
        return 0;
    }
    get height() {
        return 0;
    }
    cancel() {
        var _a;
        (_a = this._getView()) === null || _a === void 0 ? void 0 : _a.hideAllToastsWithIncludeActivityClearQueue(true, true);
    }
    setTextColor(value) {
        if (value) {
            this._textColor = value;
            if (typeof value === 'string') {
                this._toastStyle.messageColor = new Color(value).ios;
            }
            else {
                this._toastStyle.messageColor = value.ios;
            }
            ToastManager.shared.style = this._toastStyle;
        }
        return this;
    }
    setBackgroundColor(value) {
        if (value) {
            this._backgroundColor = value;
            if (typeof value === 'string') {
                this._toastStyle.backgroundColor = new Color(value).ios;
            }
            else {
                this._toastStyle.backgroundColor = value.ios;
            }
            ToastManager.shared.style = this._toastStyle;
        }
        return this;
    }
    _updateToastPosition() {
        switch (this._position) {
            case ToastPosition.TOP:
                ToastManager.shared.position = 0;
                break;
            case ToastPosition.TOP_LEFT:
                ToastManager.shared.position = 3;
                break;
            case ToastPosition.TOP_RIGHT:
                ToastManager.shared.position = 4;
                break;
            case ToastPosition.CENTER:
                ToastManager.shared.position = 1;
                break;
            case ToastPosition.CENTER_LEFT:
                ToastManager.shared.position = 5;
                break;
            case ToastPosition.CENTER_RIGHT:
                ToastManager.shared.position = 6;
                break;
            case ToastPosition.BOTTOM:
                ToastManager.shared.position = 2;
                break;
            case ToastPosition.BOTTOM_LEFT:
                ToastManager.shared.position = 7;
                break;
            case ToastPosition.BOTTOM_RIGHT:
                ToastManager.shared.position = 8;
                break;
            default:
                break;
        }
    }
    setToastPosition(value) {
        this._position = value;
        this._updateToastPosition();
        return this;
    }
    setToastDuration(value) {
        switch (value) {
            case ToastDuration.SHORT:
                ToastManager.shared.duration = 2.0;
                break;
            case ToastDuration.LONG:
                ToastManager.shared.duration = 4.0;
                break;
            default:
                ToastManager.shared.duration = 2.0;
                break;
        }
        return this;
    }
    _getView() {
        if (!Frame.topmost()) {
            const root = this.topViewController;
            if (!root) {
                throw new Error('There is no topmost');
            }
            return root.view.window;
        }
        else {
            if (this._iOSOpts && this._anchorView) {
                return this._anchorView;
            }
            else {
                let viewController = Frame.topmost().viewController;
                if (viewController.presentedViewController) {
                    if (Device.deviceType !== Enums.DeviceType.Tablet) {
                        while (viewController.presentedViewController) {
                            viewController = viewController.presentedViewController;
                        }
                    }
                }
                return viewController.view;
            }
        }
    }
    static get rootViewController() {
        const keyWindow = UIApplication.sharedApplication.keyWindow;
        return keyWindow != null ? keyWindow.rootViewController : undefined;
    }
    get topViewController() {
        const root = Toasty.rootViewController;
        if (root == null) {
            return undefined;
        }
        return this.findTopViewController(root);
    }
    findTopViewController(root) {
        const presented = root.presentedViewController;
        if (presented != null) {
            return this.findTopViewController(presented);
        }
        if (root instanceof UISplitViewController) {
            const last = root.viewControllers.lastObject;
            if (last == null) {
                return root;
            }
            return this.findTopViewController(last);
        }
        else if (root instanceof UINavigationController) {
            const top = root.topViewController;
            if (top == null) {
                return root;
            }
            return this.findTopViewController(top);
        }
        else if (root instanceof UITabBarController) {
            const selected = root.selectedViewController;
            if (selected == null) {
                return root;
            }
            return this.findTopViewController(selected);
        }
        else {
            return root;
        }
    }
}
//# sourceMappingURL=toasty.ios.js.map