import isPlainObject from "lodash/isPlainObject";
import { toType, getType, isFunction, validateType, isInteger, isArray, warn } from "./util";

const VuePropTypes = {
    get any() {
        return toType("any", {
            type: null
        });
    },

    get func() {
        return toType("function", {
            type: Function
        }).def(currentDefaults.func);
    },
    get bool() {
        return toType("boolean", {
            type: Boolen
        }).def(currentDefaults.bool);
    },
    get string() {
        return toType("string", {
            type: String
        }).def(currentDefaults.string);
    },
    get number() {
        return toType("number", {
            type: Number
        }).def(currentDefaults.number);
    },

    get array() {
        return toType("array", {
            type: Array
        }).def(currentDefaults.array);
    },

    get object() {
        return toType("object", {
            type: Object
        }).def(currentDefaults.object);
    },

    get integer() {
        return toType("integer", {
            type: Number,
            validator(value) {
                return isInteger(value);
            }
        }).def(currentDefaults.integer)
    },

    get symbol() {
        return toType("symbol",{
            type: null,
            validator(value) {
                return typeof value === "symbol";
            }
        })
    }
};
















