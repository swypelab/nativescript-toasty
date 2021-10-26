import { Application, Color, Screen, Utils } from '@nativescript/core';
import { ToastDuration, ToastPosition } from './toast.common';
export * from './toast.common';
export class Toasty {
    constructor(opts) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        this._screenHeight = Screen.mainScreen.heightPixels;
        this._screenWidth = Screen.mainScreen.widthPixels;
        this._text = (_a = opts) === null || _a === void 0 ? void 0 : _a.text;
        this._duration = (_c = (_b = opts) === null || _b === void 0 ? void 0 : _b.duration, (_c !== null && _c !== void 0 ? _c : ToastDuration.SHORT));
        this._position = (_e = (_d = opts) === null || _d === void 0 ? void 0 : _d.position, (_e !== null && _e !== void 0 ? _e : ToastPosition.BOTTOM));
        this._textColor = (_g = (_f = opts) === null || _f === void 0 ? void 0 : _f.textColor, (_g !== null && _g !== void 0 ? _g : 'white'));
        this._backgroundColor = (_j = (_h = opts) === null || _h === void 0 ? void 0 : _h.backgroundColor, (_j !== null && _j !== void 0 ? _j : 'black'));
        this._androidOpts = (_l = (_k = opts) === null || _k === void 0 ? void 0 : _k.android, (_l !== null && _l !== void 0 ? _l : {}));
        this._x = (_m = opts) === null || _m === void 0 ? void 0 : _m.xAxisOffset;
        this._y = (_o = opts) === null || _o === void 0 ? void 0 : _o.yAxisOffset;
        this._tapToDismiss = (_q = (_p = opts) === null || _p === void 0 ? void 0 : _p.tapToDismiss, (_q !== null && _q !== void 0 ? _q : false));
        this._anchorView = (_r = opts) === null || _r === void 0 ? void 0 : _r.anchorView;
        this._toast = android.widget.Toast.makeText(Utils.android.getApplicationContext(), this._text, android.widget.Toast.LENGTH_SHORT);


        const ref = new WeakRef(this);
        const toastView =  this._toast.getView()
        if( toastView != null ){
            toastView.setOnTouchListener(new android.view.View.OnTouchListener({
                onTouch(param0, param1) {
                    var _a, _b, _c;
                    if ((_a = ref.get()) === null || _a === void 0 ? void 0 : _a._tapToDismiss) {
                        (_c = (_b = ref.get()) === null || _b === void 0 ? void 0 : _b._toast) === null || _c === void 0 ? void 0 : _c.cancel();
                    }
                    return false;
                }
            }));
        }


        this.setToastDuration(this._duration)
            .setToastPosition(this._position)
            .setTextColor(this._textColor)
            .setBackgroundColor(this._backgroundColor);
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
            y = this._y * Screen.mainScreen.scale;
        }
        if (Toasty.isLength(this._y)) {
            if (this._y.unit === 'px') {
                y = this._y.value;
            }
            if (this._y.unit === 'dip') {
                y = this._y.value * Screen.mainScreen.scale;
            }
        }
        if (typeof this._y === 'string') {
            if (this._y.includes('px')) {
                y = parseInt(this._y.replace('px', ''), 0);
            }
            if (this._y.includes('dip')) {
                y = parseInt(this._y.replace('dip', ''), 0) * Screen.mainScreen.scale;
            }
        }
        return y;
    }
    get xPixels() {
        let x;
        if (typeof this._x === 'number') {
            x = this._x * Screen.mainScreen.scale;
        }
        if (Toasty.isLength(this._x)) {
            if (this._x.unit === 'px') {
                x = this._x.value;
            }
            if (this._x.unit === 'dip') {
                x = this._x.value * Screen.mainScreen.scale;
            }
        }
        if (typeof this._x === 'string') {
            if (this._x.includes('px')) {
                x = parseInt(this._x.replace('px', ''), 0);
            }
            if (this._x.includes('dip')) {
                x = parseInt(this._x.replace('dip', ''), 0) * Screen.mainScreen.scale;
            }
        }
        return x;
    }
    show() {
        var _a;
        if (!this._text) {
            throw new Error('Toasty Text is not set.');
        }
        else {
            (_a = this._toast) === null || _a === void 0 ? void 0 : _a.show();
        }
    }
    _measureToast() {
        var _a, _b, _c;
        const window = (_a = (Application.android.foregroundActivity ||
            Application.android.startActivity)) === null || _a === void 0 ? void 0 : _a.getWindow();
        const metrics = new android.util.DisplayMetrics();
        (_b = window) === null || _b === void 0 ? void 0 : _b.getWindowManager().getDefaultDisplay().getMetrics(metrics);
        const MeasureSpec = android.view.View.MeasureSpec;
        const widthMeasureSpec = MeasureSpec.makeMeasureSpec(metrics.widthPixels, MeasureSpec.UNSPECIFIED);
        const heightMeasureSpec = MeasureSpec.makeMeasureSpec(metrics.heightPixels, MeasureSpec.UNSPECIFIED);
        (_c = this._toast) === null || _c === void 0 ? void 0 : _c.getView().measure(widthMeasureSpec, heightMeasureSpec);
    }
    get width() {
        var _a, _b;
        this._measureToast();
        return (_b = ((_a = this._toast) === null || _a === void 0 ? void 0 : _a.getView().getMeasuredWidth()) / Screen.mainScreen.scale, (_b !== null && _b !== void 0 ? _b : 0));
    }
    get height() {
        var _a, _b;
        this._measureToast();
        return (_b = ((_a = this._toast) === null || _a === void 0 ? void 0 : _a.getView().getMeasuredHeight()) / Screen.mainScreen.scale, (_b !== null && _b !== void 0 ? _b : 0));
    }
    cancel() {
        var _a;
        (_a = this._toast) === null || _a === void 0 ? void 0 : _a.cancel();
    }
    setTextColor(value) {
        var _a, _b, _c, _d;
        if (value) {
            this._textColor = value;
            const view = (_a = this._toast) === null || _a === void 0 ? void 0 : _a.getView();
            const text = (_b = view) === null || _b === void 0 ? void 0 : _b.findViewById(android.R.id.message);
            if (typeof value === 'string') {
                const nativeColor = new Color(value).android;
                (_c = text) === null || _c === void 0 ? void 0 : _c.setTextColor(nativeColor);
            }
            else {
                (_d = text) === null || _d === void 0 ? void 0 : _d.setTextColor(value.android);
            }
        }
        return this;
    }
    setBackgroundColor(value) {
        var _a, _b, _c;
        if (value) {
            this._backgroundColor = value;
            const view = (_a = this._toast) === null || _a === void 0 ? void 0 : _a.getView();
            if (typeof value === 'string') {
                const nativeColor = new Color(value).android;
                (_b = view) === null || _b === void 0 ? void 0 : _b.getBackground().setColorFilter(nativeColor, android.graphics.PorterDuff.Mode.SRC_IN);
            }
            else {
                (_c = view) === null || _c === void 0 ? void 0 : _c.getBackground().setColorFilter(value.android, android.graphics.PorterDuff.Mode.SRC_IN);
            }
        }
        return this;
    }
    setToastDuration(value) {
        var _a, _b, _c;
        switch (value) {
            case ToastDuration.SHORT:
                (_a = this._toast) === null || _a === void 0 ? void 0 : _a.setDuration(android.widget.Toast.LENGTH_SHORT);
                break;
            case ToastDuration.LONG:
                (_b = this._toast) === null || _b === void 0 ? void 0 : _b.setDuration(android.widget.Toast.LENGTH_LONG);
                break;
            default:
                (_c = this._toast) === null || _c === void 0 ? void 0 : _c.setDuration(android.widget.Toast.LENGTH_SHORT);
                break;
        }
        return this;
    }
    setToastPosition(value) {
        this._position = value;
        this._updateToastPosition();
        return this;
    }
    _updateToastPosition() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const yOffset = (_a = this.yPixels, (_a !== null && _a !== void 0 ? _a : 0));
        const xOffset = (_b = this.xPixels, (_b !== null && _b !== void 0 ? _b : 0));
        switch (this._position) {
            case ToastPosition.TOP:
                (_c = this._toast) === null || _c === void 0 ? void 0 : _c.setGravity(android.view.Gravity.TOP, xOffset, yOffset);
                break;
            case ToastPosition.TOP_LEFT:
                (_d = this._toast) === null || _d === void 0 ? void 0 : _d.setGravity(android.view.Gravity.TOP | android.view.Gravity.LEFT, xOffset, yOffset);
                break;
            case ToastPosition.TOP_RIGHT:
                (_e = this._toast) === null || _e === void 0 ? void 0 : _e.setGravity(android.view.Gravity.TOP | android.view.Gravity.RIGHT, xOffset, yOffset);
                break;
            case ToastPosition.CENTER:
                (_f = this._toast) === null || _f === void 0 ? void 0 : _f.setGravity(android.view.Gravity.CENTER, xOffset, yOffset);
                break;
            case ToastPosition.CENTER_LEFT:
                (_g = this._toast) === null || _g === void 0 ? void 0 : _g.setGravity(android.view.Gravity.CENTER | android.view.Gravity.LEFT, xOffset, yOffset);
                break;
            case ToastPosition.CENTER_RIGHT:
                (_h = this._toast) === null || _h === void 0 ? void 0 : _h.setGravity(android.view.Gravity.CENTER | android.view.Gravity.RIGHT, xOffset, yOffset);
                break;
            case ToastPosition.BOTTOM:
                (_j = this._toast) === null || _j === void 0 ? void 0 : _j.setGravity(android.view.Gravity.BOTTOM, xOffset, yOffset);
                break;
			case ToastPosition.BOTTOM_FULL_WIDTH:
				(_j = this._toast) === null || _j === void 0 ? void 0 : _j.setGravity(android.view.Gravity.BOTTOM | android.view.Gravity.FILL_HORIZONTAL, 0, 0);
				break;
            case ToastPosition.BOTTOM_LEFT:
                (_k = this._toast) === null || _k === void 0 ? void 0 : _k.setGravity(android.view.Gravity.BOTTOM | android.view.Gravity.LEFT, xOffset, yOffset);
                break;
            case ToastPosition.BOTTOM_RIGHT:
                (_l = this._toast) === null || _l === void 0 ? void 0 : _l.setGravity(android.view.Gravity.BOTTOM | android.view.Gravity.RIGHT, xOffset, yOffset);
                break;
            default:
                break;
        }
    }
}
//# sourceMappingURL=toasty.android.js.map
