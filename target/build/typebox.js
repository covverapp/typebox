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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = exports.TypeBuilder = exports.VoidKind = exports.UndefinedKind = exports.PromiseKind = exports.FunctionKind = exports.ConstructorKind = exports.AnyKind = exports.UnknownKind = exports.NullKind = exports.BooleanKind = exports.IntegerKind = exports.NumberKind = exports.DateTimeKind = exports.StringKind = exports.LiteralKind = exports.EnumKind = exports.ArrayKind = exports.RecordKind = exports.ObjectKind = exports.TupleKind = exports.UnionKind = exports.IntersectKind = exports.KeyOfKind = exports.BoxKind = exports.ReadonlyModifier = exports.OptionalModifier = exports.ReadonlyOptionalModifier = void 0;
// ------------------------------------------------------------------------
// Modifiers
// ------------------------------------------------------------------------
exports.ReadonlyOptionalModifier = Symbol("ReadonlyOptionalModifier");
exports.OptionalModifier = Symbol("OptionalModifier");
exports.ReadonlyModifier = Symbol("ReadonlyModifier");
// ------------------------------------------------------------------------
// Schema Standard
// ------------------------------------------------------------------------
exports.BoxKind = Symbol("BoxKind");
exports.KeyOfKind = Symbol("KeyOfKind");
exports.IntersectKind = Symbol("IntersectKind");
exports.UnionKind = Symbol("UnionKind");
exports.TupleKind = Symbol("TupleKind");
exports.ObjectKind = Symbol("ObjectKind");
exports.RecordKind = Symbol("RecordKind");
exports.ArrayKind = Symbol("ArrayKind");
exports.EnumKind = Symbol("EnumKind");
exports.LiteralKind = Symbol("LiteralKind");
exports.StringKind = Symbol("StringKind");
exports.DateTimeKind = Symbol("DateTimeKind");
exports.NumberKind = Symbol("NumberKind");
exports.IntegerKind = Symbol("IntegerKind");
exports.BooleanKind = Symbol("BooleanKind");
exports.NullKind = Symbol("NullKind");
exports.UnknownKind = Symbol("UnknownKind");
exports.AnyKind = Symbol("AnyKind");
// ------------------------------------------------------------------------
// Schema Extended
// ------------------------------------------------------------------------
exports.ConstructorKind = Symbol("ConstructorKind");
exports.FunctionKind = Symbol("FunctionKind");
exports.PromiseKind = Symbol("PromiseKind");
exports.UndefinedKind = Symbol("UndefinedKind");
exports.VoidKind = Symbol("VoidKind");
// ------------------------------------------------------------------------
// Utility
// ------------------------------------------------------------------------
function isObject(object) {
    return (typeof object === "object" && object !== null && !Array.isArray(object));
}
function isArray(object) {
    return typeof object === "object" && object !== null && Array.isArray(object);
}
function clone(object) {
    if (isObject(object))
        return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: clone(object[key]) }), {});
    if (isArray(object))
        return object.map((item) => clone(item));
    return object;
}
// ------------------------------------------------------------------------
// TypeBuilder
// ------------------------------------------------------------------------
class TypeBuilder {
    /** `STANDARD` Modifies a schema object property to be `readonly` and `optional`. */
    ReadonlyOptional(item) {
        return { ...item, modifier: exports.ReadonlyOptionalModifier };
    }
    /** `STANDARD` Modifies a schema object property to be `readonly`. */
    Readonly(item) {
        return { ...item, modifier: exports.ReadonlyModifier };
    }
    /** `STANDARD` Modifies a schema object property to be `optional`. */
    Optional(item) {
        return { ...item, modifier: exports.OptionalModifier };
    }
    /** `STANDARD` Creates a Tuple schema. */
    Tuple(items, options = {}) {
        const additionalItems = false;
        const minItems = items.length;
        const maxItems = items.length;
        return items.length > 0
            ? {
                ...options,
                kind: exports.TupleKind,
                type: "array",
                items,
                additionalItems,
                minItems,
                maxItems,
            }
            : { ...options, kind: exports.TupleKind, type: "array", minItems, maxItems };
    }
    /** `STANDARD` Creates a `object` schema with the given properties. */
    Object(properties, options = {}) {
        const property_names = Object.keys(properties);
        const optional = property_names.filter((name) => {
            const candidate = properties[name];
            return (candidate.modifier &&
                (candidate.modifier === exports.OptionalModifier ||
                    candidate.modifier === exports.ReadonlyOptionalModifier));
        });
        const required_names = property_names.filter((name) => !optional.includes(name));
        const required = required_names.length > 0 ? required_names : undefined;
        return required
            ? { ...options, kind: exports.ObjectKind, type: "object", properties, required }
            : { ...options, kind: exports.ObjectKind, type: "object", properties };
    }
    /** `STANDARD` Creates an intersection schema. Note this function requires draft `2019-09` to constrain with `unevaluatedProperties`. */
    Intersect(items, options = {}) {
        return { ...options, kind: exports.IntersectKind, type: "object", allOf: items };
    }
    /** `STANDARD` Creates a Union schema. */
    Union(items, options = {}) {
        return { ...options, kind: exports.UnionKind, anyOf: items };
    }
    /** `STANDARD` Creates an `Array<T>` schema. */
    Array(items, options = {}) {
        return { ...options, kind: exports.ArrayKind, type: "array", items };
    }
    /** `STANDARD` Creates an `Enum<T>` schema from a TypeScript `enum` definition. */
    Enum(item, options = {}) {
        const values = Object.keys(item)
            .filter((key) => isNaN(key))
            .map((key) => item[key]);
        const anyOf = values.map((value) => typeof value === "string"
            ? { type: "string", const: value }
            : { type: "number", const: value });
        return { ...options, kind: exports.EnumKind, anyOf };
    }
    /** `STANDARD` Creates a literal schema. Supports `string | number | boolean` values. */
    Literal(value, options = {}) {
        return {
            ...options,
            kind: exports.LiteralKind,
            const: value,
            type: typeof value,
        };
    }
    /** `STANDARD` Creates a `string` schema. */
    String(options = {}) {
        return { ...options, kind: exports.StringKind, type: "string" };
    }
    /** `STANDARD` Creates a `date-time` schema. */
    DateTime(options = {}) {
        return {
            ...options,
            kind: exports.DateTimeKind,
            type: "string",
            format: "date-time",
        };
    }
    /** `STANDARD` Creates a `string` schema from a regular expression. */
    RegEx(regex, options = {}) {
        return this.String({ ...options, pattern: regex.source });
    }
    /** `STANDARD` Creates a `number` schema. */
    Number(options = {}) {
        return { ...options, kind: exports.NumberKind, type: "number" };
    }
    /** `STANDARD` Creates a `integer` schema. */
    Integer(options = {}) {
        return { ...options, kind: exports.IntegerKind, type: "integer" };
    }
    /** `STANDARD` Creates a `boolean` schema. */
    Boolean(options = {}) {
        return { ...options, kind: exports.BooleanKind, type: "boolean" };
    }
    /** `STANDARD` Creates a `null` schema. */
    Null(options = {}) {
        return { ...options, kind: exports.NullKind, type: "null" };
    }
    /** `STANDARD` Creates an `unknown` schema. */
    Unknown(options = {}) {
        return { ...options, kind: exports.UnknownKind };
    }
    /** `STANDARD` Creates an `any` schema. */
    Any(options = {}) {
        return { ...options, kind: exports.AnyKind };
    }
    /** `STANDARD` Creates a `keyof` schema. */
    KeyOf(schema, options = {}) {
        const keys = Object.keys(schema.properties);
        return { ...options, kind: exports.KeyOfKind, type: "string", enum: keys };
    }
    /** `STANDARD` Creates a `Record<Keys, Value>` schema. */
    Record(key, value, options = {}) {
        const pattern = key.kind === exports.UnionKind
            ? `^${key.anyOf
                .map((literal) => literal.const)
                .join("|")}$`
            : key.kind === exports.NumberKind
                ? "^(0|[1-9][0-9]*)$"
                : key.pattern
                    ? key.pattern
                    : "^.*$";
        return {
            ...options,
            kind: exports.RecordKind,
            type: "object",
            patternProperties: { [pattern]: value },
        };
    }
    /** `STANDARD` Make all properties in schema object required. */
    Required(schema, options = {}) {
        const next = { ...clone(schema), ...options };
        next.required = Object.keys(next.properties);
        for (const key of Object.keys(next.properties)) {
            const property = next.properties[key];
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
        return next;
    }
    /** `STANDARD`  Make all properties in schema object optional. */
    Partial(schema, options = {}) {
        const next = { ...clone(schema), ...options };
        delete next.required;
        for (const key of Object.keys(next.properties)) {
            const property = next.properties[key];
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
        return next;
    }
    /** `STANDARD` Picks property keys from the given object schema. */
    Pick(schema, keys, options = {}) {
        const next = { ...clone(schema), ...options };
        next.required = next.required
            ? next.required.filter((key) => keys.includes(key))
            : undefined;
        for (const key of Object.keys(next.properties)) {
            if (!keys.includes(key))
                delete next.properties[key];
        }
        return next;
    }
    /** `STANDARD` Omits property keys from the given object schema. */
    Omit(schema, keys, options = {}) {
        const next = { ...clone(schema), ...options };
        next.required = next.required
            ? next.required.filter((key) => !keys.includes(key))
            : undefined;
        for (const key of Object.keys(next.properties)) {
            if (keys.includes(key))
                delete next.properties[key];
        }
        return next;
    }
    /** `STANDARD` Omits the `kind` and `modifier` properties from the given schema. */
    Strict(schema, options = {}) {
        return JSON.parse(JSON.stringify({ ...options, ...schema }));
    }
    /** `EXTENDED` Creates a `constructor` schema. */
    Constructor(args, returns, options = {}) {
        return {
            ...options,
            kind: exports.ConstructorKind,
            type: "constructor",
            arguments: args,
            returns,
        };
    }
    /** `EXTENDED` Creates a `function` schema. */
    Function(args, returns, options = {}) {
        return {
            ...options,
            kind: exports.FunctionKind,
            type: "function",
            arguments: args,
            returns,
        };
    }
    /** `EXTENDED` Creates a `Promise<T>` schema. */
    Promise(item, options = {}) {
        return { ...options, type: "promise", kind: exports.PromiseKind, item };
    }
    /** `EXTENDED` Creates a `undefined` schema. */
    Undefined(options = {}) {
        return { ...options, type: "undefined", kind: exports.UndefinedKind };
    }
    /** `EXTENDED` Creates a `void` schema. */
    Void(options = {}) {
        return { ...options, type: "void", kind: exports.VoidKind };
    }
    /** `EXPERIMENTAL` Creates a recursive type. */
    Rec(callback, options = {}) {
        const $id = options.$id || "";
        const self = callback({ $ref: `${$id}#/definitions/self` });
        return {
            ...options,
            $ref: `${$id}#/definitions/self`,
            definitions: { self },
        };
    }
    /** `EXPERIMENTAL` Creates a recursive type. Pending https://github.com/ajv-validator/ajv/issues/1709 */
    // public Rec<T extends TProperties>($id: string, callback: (self: TAny) => T, options: ObjectOptions = {}): TObject<T> {
    //     const properties = callback({ $recursiveRef: `${$id}` } as any)
    //     return { ...options, kind: ObjectKind, $id, $recursiveAnchor: true, type: 'object', properties }
    // }
    /** `EXPERIMENTAL` Creates a container for schema definitions. */
    Box(definitions, options = {}) {
        return { ...options, kind: exports.BoxKind, definitions };
    }
    /** `EXPERIMENTAL` References a schema. */
    Ref(...args) {
        const $id = args[0]["$id"] || "";
        const key = args[1];
        return args.length === 2
            ? { $ref: `${$id}#/definitions/${key}` }
            : { $ref: $id };
    }
}
exports.TypeBuilder = TypeBuilder;
exports.Type = new TypeBuilder();