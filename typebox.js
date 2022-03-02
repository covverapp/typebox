"use strict";
/*--------------------------------------------------------------------------

TypeBox: JSON Schema Type Builder with Static Type Resolution for TypeScript

The MIT License (MIT)

Copyright (c) 2021 Haydn Paterson (sinclair) <haydn.developer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---------------------------------------------------------------------------*/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = exports.TypeBuilder = exports.VoidKind = exports.UndefinedKind = exports.PromiseKind = exports.FunctionKind = exports.ConstructorKind = exports.DateTimeKind = exports.RefKind = exports.AnyKind = exports.UnknownKind = exports.NullKind = exports.BooleanKind = exports.IntegerKind = exports.NumberKind = exports.StringKind = exports.LiteralKind = exports.EnumKind = exports.ArrayKind = exports.RecordKind = exports.ObjectKind = exports.TupleKind = exports.UnionKind = exports.IntersectKind = exports.KeyOfKind = exports.NamespaceKind = exports.ReadonlyModifier = exports.OptionalModifier = exports.ReadonlyOptionalModifier = void 0;
// --------------------------------------------------------------------------
// Modifiers
// --------------------------------------------------------------------------
exports.ReadonlyOptionalModifier = Symbol('ReadonlyOptionalModifier');
exports.OptionalModifier = Symbol('OptionalModifier');
exports.ReadonlyModifier = Symbol('ReadonlyModifier');
// --------------------------------------------------------------------------
// Schema Standard
// --------------------------------------------------------------------------
exports.NamespaceKind = Symbol('NamespaceKind');
exports.KeyOfKind = Symbol('KeyOfKind');
exports.IntersectKind = Symbol('IntersectKind');
exports.UnionKind = Symbol('UnionKind');
exports.TupleKind = Symbol('TupleKind');
exports.ObjectKind = Symbol('ObjectKind');
exports.RecordKind = Symbol('RecordKind');
exports.ArrayKind = Symbol('ArrayKind');
exports.EnumKind = Symbol('EnumKind');
exports.LiteralKind = Symbol('LiteralKind');
exports.StringKind = Symbol('StringKind');
exports.NumberKind = Symbol('NumberKind');
exports.IntegerKind = Symbol('IntegerKind');
exports.BooleanKind = Symbol('BooleanKind');
exports.NullKind = Symbol('NullKind');
exports.UnknownKind = Symbol('UnknownKind');
exports.AnyKind = Symbol('AnyKind');
exports.RefKind = Symbol('RefKind');
/* Covver code */
exports.DateTimeKind = Symbol("DateTimeKind");
// --------------------------------------------------------------------------
// Extended Schema Types
// --------------------------------------------------------------------------
exports.ConstructorKind = Symbol('ConstructorKind');
exports.FunctionKind = Symbol('FunctionKind');
exports.PromiseKind = Symbol('PromiseKind');
exports.UndefinedKind = Symbol('UndefinedKind');
exports.VoidKind = Symbol('VoidKind');
// --------------------------------------------------------------------------
// Utility
// --------------------------------------------------------------------------
function isObject(object) {
    return typeof object === 'object' && object !== null && !Array.isArray(object);
}
function isArray(object) {
    return typeof object === 'object' && object !== null && Array.isArray(object);
}
function clone(object) {
    if (isObject(object))
        return Object.keys(object).reduce(function (acc, key) {
            var _a;
            return (__assign(__assign({}, acc), (_a = {}, _a[key] = clone(object[key]), _a)));
        }, {});
    if (isArray(object))
        return object.map(function (item) { return clone(item); });
    return object;
}
// --------------------------------------------------------------------------
// TypeBuilder
// --------------------------------------------------------------------------
var TypeBuilder = /** @class */ (function () {
    function TypeBuilder() {
        this.schemas = new Map();
    }
    /** `Standard` Modifies an object property to be both readonly and optional */
    TypeBuilder.prototype.ReadonlyOptional = function (item) {
        return __assign(__assign({}, item), { modifier: exports.ReadonlyOptionalModifier });
    };
    /** `Standard` Modifies an object property to be readonly */
    TypeBuilder.prototype.Readonly = function (item) {
        return __assign(__assign({}, item), { modifier: exports.ReadonlyModifier });
    };
    /** `Standard` Modifies an object property to be optional */
    TypeBuilder.prototype.Optional = function (item) {
        return __assign(__assign({}, item), { modifier: exports.OptionalModifier });
    };
    /** `Standard` Creates a type type */
    TypeBuilder.prototype.Tuple = function (items, options) {
        if (options === void 0) { options = {}; }
        var additionalItems = false;
        var minItems = items.length;
        var maxItems = items.length;
        var schema = ((items.length > 0)
            ? __assign(__assign({}, options), { kind: exports.TupleKind, type: 'array', items: items, additionalItems: additionalItems, minItems: minItems, maxItems: maxItems }) : __assign(__assign({}, options), { kind: exports.TupleKind, type: 'array', minItems: minItems, maxItems: maxItems }));
        return this.Store(schema);
    };
    /** `Standard` Creates an object type with the given properties */
    TypeBuilder.prototype.Object = function (properties, options) {
        if (options === void 0) { options = {}; }
        var property_names = Object.keys(properties);
        var optional = property_names.filter(function (name) {
            var candidate = properties[name];
            return (candidate.modifier &&
                (candidate.modifier === exports.OptionalModifier ||
                    candidate.modifier === exports.ReadonlyOptionalModifier));
        });
        var required_names = property_names.filter(function (name) { return !optional.includes(name); });
        var required = (required_names.length > 0) ? required_names : undefined;
        return this.Store(((required)
            ? __assign(__assign({}, options), { kind: exports.ObjectKind, type: 'object', properties: properties, required: required }) : __assign(__assign({}, options), { kind: exports.ObjectKind, type: 'object', properties: properties })));
    };
    /** `Standard` Creates an intersect type. */
    TypeBuilder.prototype.Intersect = function (items, options) {
        if (options === void 0) { options = {}; }
        return this.Store(__assign(__assign({}, options), { kind: exports.IntersectKind, type: 'object', allOf: items }));
    };
    /** `Standard` Creates a union type */
    TypeBuilder.prototype.Union = function (items, options) {
        if (options === void 0) { options = {}; }
        return this.Store(__assign(__assign({}, options), { kind: exports.UnionKind, anyOf: items }));
    };
    /** `Standard` Creates an array type */
    TypeBuilder.prototype.Array = function (items, options) {
        if (options === void 0) { options = {}; }
        return this.Store(__assign(__assign({}, options), { kind: exports.ArrayKind, type: 'array', items: items }));
    };
    /** `Standard` Creates an enum type from a TypeScript enum */
    TypeBuilder.prototype.Enum = function (item, options) {
        if (options === void 0) { options = {}; }
        var values = Object.keys(item).filter(function (key) { return isNaN(key); }).map(function (key) { return item[key]; });
        var anyOf = values.map(function (value) { return typeof value === 'string' ? { type: 'string', const: value } : { type: 'number', const: value }; });
        return this.Store(__assign(__assign({}, options), { kind: exports.EnumKind, anyOf: anyOf }));
    };
    /** `Standard` Creates a literal type. Supports string, number and boolean values only */
    TypeBuilder.prototype.Literal = function (value, options) {
        if (options === void 0) { options = {}; }
        return this.Store(__assign(__assign({}, options), { kind: exports.LiteralKind, const: value, type: typeof value }));
    };
    /** `Standard` Creates a string type */
    TypeBuilder.prototype.String = function (options) {
        if (options === void 0) { options = {}; }
        return this.Store(__assign(__assign({}, options), { kind: exports.StringKind, type: 'string' }));
    };
    /* Covver code */
    /** `Standard` Creates a `date-time` schema. */
    TypeBuilder.prototype.DateTime = function (options) {
        if (options === void 0) { options = {}; }
        return this.Store(__assign(__assign({}, options), { kind: exports.DateTimeKind, type: ["string", "null"], format: "date-time" }));
    };
    /* end Covver code */
    /** `Standard` Creates a string type from a regular expression */
    TypeBuilder.prototype.RegEx = function (regex, options) {
        if (options === void 0) { options = {}; }
        return this.String(__assign(__assign({}, options), { pattern: regex.source }));
    };
    /** `Standard` Creates a number type */
    TypeBuilder.prototype.Number = function (options) {
        if (options === void 0) { options = {}; }
        return this.Store(__assign(__assign({}, options), { kind: exports.NumberKind, type: 'number' }));
    };
    /** `Standard` Creates an integer type */
    TypeBuilder.prototype.Integer = function (options) {
        if (options === void 0) { options = {}; }
        return this.Store(__assign(__assign({}, options), { kind: exports.IntegerKind, type: 'integer' }));
    };
    /** `Standard` Creates a boolean type */
    TypeBuilder.prototype.Boolean = function (options) {
        if (options === void 0) { options = {}; }
        return this.Store(__assign(__assign({}, options), { kind: exports.BooleanKind, type: 'boolean' }));
    };
    /** `Standard` Creates a null type */
    TypeBuilder.prototype.Null = function (options) {
        if (options === void 0) { options = {}; }
        return this.Store(__assign(__assign({}, options), { kind: exports.NullKind, type: 'null' }));
    };
    /** `Standard` Creates an unknown type */
    TypeBuilder.prototype.Unknown = function (options) {
        if (options === void 0) { options = {}; }
        return this.Store(__assign(__assign({}, options), { kind: exports.UnknownKind }));
    };
    /** `Standard` Creates an any type */
    TypeBuilder.prototype.Any = function (options) {
        if (options === void 0) { options = {}; }
        return this.Store(__assign(__assign({}, options), { kind: exports.AnyKind }));
    };
    /** `Standard` Creates a record type */
    TypeBuilder.prototype.Record = function (key, value, options) {
        var _a;
        if (options === void 0) { options = {}; }
        var pattern = (function () {
            switch (key.kind) {
                case exports.UnionKind: return "^".concat(key.anyOf.map(function (literal) { return literal.const; }).join('|'), "$");
                case exports.KeyOfKind: return "^".concat(key.enum.join('|'), "$");
                case exports.NumberKind: return '^(0|[1-9][0-9]*)$';
                case exports.StringKind: return key.pattern ? key.pattern : '^.*$';
                default: throw Error('Invalid Record Key');
            }
        })();
        return this.Store(__assign(__assign({}, options), { kind: exports.RecordKind, type: 'object', patternProperties: (_a = {}, _a[pattern] = value, _a) }));
    };
    /** `Standard` Creates a keyof type from the given object */
    TypeBuilder.prototype.KeyOf = function (object, options) {
        if (options === void 0) { options = {}; }
        var source = this.Deref(object);
        var keys = Object.keys(source.properties);
        return this.Store(__assign(__assign({}, options), { kind: exports.KeyOfKind, type: 'string', enum: keys }));
    };
    /** `Standard` Makes all properties in the given object type required */
    TypeBuilder.prototype.Required = function (object, options) {
        if (options === void 0) { options = {}; }
        var source = this.Deref(object);
        var schema = __assign(__assign({}, clone(source)), options);
        schema.required = Object.keys(schema.properties);
        for (var _i = 0, _a = Object.keys(schema.properties); _i < _a.length; _i++) {
            var key = _a[_i];
            var property = schema.properties[key];
            switch (property.modifier) {
                case exports.ReadonlyOptionalModifier:
                    property.modifier = exports.ReadonlyModifier;
                    break;
                case exports.ReadonlyModifier:
                    property.modifier = exports.ReadonlyModifier;
                    break;
                case exports.OptionalModifier:
                    delete property.modifier;
                    break;
                default:
                    delete property.modifier;
                    break;
            }
        }
        return this.Store(schema);
    };
    /** `Standard` Makes all properties in the given object type optional */
    TypeBuilder.prototype.Partial = function (object, options) {
        if (options === void 0) { options = {}; }
        var source = this.Deref(object);
        var schema = __assign(__assign({}, clone(source)), options);
        delete schema.required;
        for (var _i = 0, _a = Object.keys(schema.properties); _i < _a.length; _i++) {
            var key = _a[_i];
            var property = schema.properties[key];
            switch (property.modifier) {
                case exports.ReadonlyOptionalModifier:
                    property.modifier = exports.ReadonlyOptionalModifier;
                    break;
                case exports.ReadonlyModifier:
                    property.modifier = exports.ReadonlyOptionalModifier;
                    break;
                case exports.OptionalModifier:
                    property.modifier = exports.OptionalModifier;
                    break;
                default:
                    property.modifier = exports.OptionalModifier;
                    break;
            }
        }
        return this.Store(schema);
    };
    /** `Standard` Picks property keys from the given object type */
    TypeBuilder.prototype.Pick = function (object, keys, options) {
        if (options === void 0) { options = {}; }
        var source = this.Deref(object);
        var schema = __assign(__assign({}, clone(source)), options);
        schema.required = schema.required ? schema.required.filter(function (key) { return keys.includes(key); }) : undefined;
        for (var _i = 0, _a = Object.keys(schema.properties); _i < _a.length; _i++) {
            var key = _a[_i];
            if (!keys.includes(key))
                delete schema.properties[key];
        }
        return this.Store(schema);
    };
    /** `Standard` Omits property keys from the given object type */
    TypeBuilder.prototype.Omit = function (object, keys, options) {
        if (options === void 0) { options = {}; }
        var source = this.Deref(object);
        var schema = __assign(__assign({}, clone(source)), options);
        schema.required = schema.required ? schema.required.filter(function (key) { return !keys.includes(key); }) : undefined;
        for (var _i = 0, _a = Object.keys(schema.properties); _i < _a.length; _i++) {
            var key = _a[_i];
            if (keys.includes(key))
                delete schema.properties[key];
        }
        return this.Store(schema);
    };
    /** `Standard` Omits the `kind` and `modifier` properties from the underlying schema */
    TypeBuilder.prototype.Strict = function (schema, options) {
        if (options === void 0) { options = {}; }
        return JSON.parse(JSON.stringify(__assign(__assign({}, options), schema)));
    };
    /** `Extended` Creates a constructor type */
    TypeBuilder.prototype.Constructor = function (args, returns, options) {
        if (options === void 0) { options = {}; }
        return this.Store(__assign(__assign({}, options), { kind: exports.ConstructorKind, type: 'constructor', arguments: args, returns: returns }));
    };
    /** `Extended` Creates a function type */
    TypeBuilder.prototype.Function = function (args, returns, options) {
        if (options === void 0) { options = {}; }
        return this.Store(__assign(__assign({}, options), { kind: exports.FunctionKind, type: 'function', arguments: args, returns: returns }));
    };
    /** `Extended` Creates a promise type */
    TypeBuilder.prototype.Promise = function (item, options) {
        if (options === void 0) { options = {}; }
        return this.Store(__assign(__assign({}, options), { type: 'promise', kind: exports.PromiseKind, item: item }));
    };
    /** `Extended` Creates a undefined type */
    TypeBuilder.prototype.Undefined = function (options) {
        if (options === void 0) { options = {}; }
        return this.Store(__assign(__assign({}, options), { type: 'undefined', kind: exports.UndefinedKind }));
    };
    /** `Extended` Creates a void type */
    TypeBuilder.prototype.Void = function (options) {
        if (options === void 0) { options = {}; }
        return this.Store(__assign(__assign({}, options), { type: 'void', kind: exports.VoidKind }));
    };
    /** `Standard` Creates a namespace for a set of related types */
    TypeBuilder.prototype.Namespace = function ($defs, options) {
        if (options === void 0) { options = {}; }
        return this.Store(__assign(__assign({}, options), { kind: exports.NamespaceKind, $defs: $defs }));
    };
    TypeBuilder.prototype.Ref = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 2) {
            var namespace = args[0];
            var targetKey = args[1];
            if (namespace.$id === undefined)
                throw new Error("Referenced namespace has no $id");
            if (!this.schemas.has(namespace.$id))
                throw new Error("Unable to locate namespace with $id '".concat(namespace.$id, "'"));
            return this.Store({ kind: exports.RefKind, $ref: "".concat(namespace.$id, "#/$defs/").concat(targetKey) });
        }
        else if (args.length === 1) {
            var target = args[0];
            if (target.$id === undefined)
                throw new Error("Referenced schema has no $id");
            if (!this.schemas.has(target.$id))
                throw new Error("Unable to locate schema with $id '".concat(target.$id, "'"));
            return this.Store({ kind: exports.RefKind, $ref: target.$id });
        }
        else {
            throw new Error('Type.Ref: Invalid arguments');
        }
    };
    /** `Experimental` Creates a recursive type */
    TypeBuilder.prototype.Rec = function (callback, options) {
        if (options === void 0) { options = {}; }
        var $id = options.$id || '';
        var self = callback({ $ref: "".concat($id, "#/$defs/self") });
        return this.Store(__assign(__assign({}, options), { $ref: "".concat($id, "#/$defs/self"), $defs: { self: self } }));
    };
    /** Conditionally stores and schema if it contains an $id and returns  */
    TypeBuilder.prototype.Store = function (schema) {
        var $schema = schema;
        if (!$schema['$id'])
            return $schema;
        this.schemas.set($schema['$id'], $schema);
        return $schema;
    };
    /** Conditionally dereferences a schema if RefKind. Otherwise return argument */
    TypeBuilder.prototype.Deref = function (schema) {
        var $schema = schema;
        if ($schema['kind'] !== exports.RefKind)
            return schema;
        if (!this.schemas.has($schema['$ref']))
            throw Error("Unable to locate schema with $id '".concat($schema['$ref'], "'"));
        return this.Deref(this.schemas.get($schema['$ref']));
    };
    return TypeBuilder;
}());
exports.TypeBuilder = TypeBuilder;
exports.Type = new TypeBuilder();
