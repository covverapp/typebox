export declare const ReadonlyOptionalModifier: unique symbol;
export declare const OptionalModifier: unique symbol;
export declare const ReadonlyModifier: unique symbol;
export declare type TModifier = TReadonlyOptional<TSchema> | TOptional<TSchema> | TReadonly<TSchema>;
export declare type TReadonlyOptional<T extends TSchema> = T & {
    modifier: typeof ReadonlyOptionalModifier;
};
export declare type TOptional<T extends TSchema> = T & {
    modifier: typeof OptionalModifier;
};
export declare type TReadonly<T extends TSchema> = T & {
    modifier: typeof ReadonlyModifier;
};
export declare const BoxKind: unique symbol;
export declare const KeyOfKind: unique symbol;
export declare const IntersectKind: unique symbol;
export declare const UnionKind: unique symbol;
export declare const TupleKind: unique symbol;
export declare const ObjectKind: unique symbol;
export declare const RecordKind: unique symbol;
export declare const ArrayKind: unique symbol;
export declare const EnumKind: unique symbol;
export declare const LiteralKind: unique symbol;
export declare const StringKind: unique symbol;
export declare const DateTimeKind: unique symbol;
export declare const NumberKind: unique symbol;
export declare const IntegerKind: unique symbol;
export declare const BooleanKind: unique symbol;
export declare const NullKind: unique symbol;
export declare const UnknownKind: unique symbol;
export declare const AnyKind: unique symbol;
export interface CustomOptions {
    $id?: string;
    title?: string;
    description?: string;
    default?: any;
    examples?: any;
    [prop: string]: any;
}
export declare type StringFormatOption = "date-time" | "time" | "date" | "email" | "idn-email" | "hostname" | "idn-hostname" | "ipv4" | "ipv6" | "uri" | "uri-reference" | "iri" | "uuid" | "iri-reference" | "uri-template" | "json-pointer" | "relative-json-pointer" | "regex";
export declare type StringOptions<TFormat extends string> = {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    format?: TFormat;
    contentEncoding?: "7bit" | "8bit" | "binary" | "quoted-printable" | "base64";
    contentMediaType?: string;
} & CustomOptions;
export declare type ArrayOptions = {
    uniqueItems?: boolean;
    minItems?: number;
    maxItems?: number;
} & CustomOptions;
export declare type NumberOptions = {
    exclusiveMaximum?: number;
    exclusiveMinimum?: number;
    maximum?: number;
    minimum?: number;
    multipleOf?: number;
} & CustomOptions;
export declare type IntersectOptions = {
    unevaluatedProperties?: boolean;
} & CustomOptions;
export declare type ObjectOptions = {
    additionalProperties?: boolean;
} & CustomOptions;
export declare type TEnumType = Record<string, string | number>;
export declare type TKey = string | number;
export declare type TValue = string | number | boolean;
export declare type TRecordKey = TString | TNumber | TUnion<TLiteral<string | number>[]>;
export declare type TEnumKey<T = TKey> = {
    type: "number" | "string";
    const: T;
};
export declare type TDefinitions = {
    [key: string]: TSchema;
};
export declare type TProperties = {
    [key: string]: TSchema;
};
export declare type TBox<T extends TDefinitions> = {
    kind: typeof BoxKind;
    definitions: T;
} & CustomOptions;
export declare type TTuple<T extends TSchema[]> = {
    kind: typeof TupleKind;
    type: "array";
    items?: [...T];
    additionalItems?: false;
    minItems: number;
    maxItems: number;
} & CustomOptions;
export declare type TObject<T extends TProperties> = {
    kind: typeof ObjectKind;
    type: "object";
    properties: T;
    required?: string[];
} & ObjectOptions;
export declare type TUnion<T extends TSchema[]> = {
    kind: typeof UnionKind;
    anyOf: [...T];
} & CustomOptions;
export declare type TIntersect<T extends TSchema[]> = {
    kind: typeof IntersectKind;
    type: "object";
    allOf: [...T];
} & IntersectOptions;
export declare type TKeyOf<T extends TKey[]> = {
    kind: typeof KeyOfKind;
    type: "string";
    enum: [...T];
} & CustomOptions;
export declare type TRecord<K extends TRecordKey, T extends TSchema> = {
    kind: typeof RecordKind;
    type: "object";
    patternProperties: {
        [pattern: string]: T;
    };
} & ObjectOptions;
export declare type TArray<T extends TSchema> = {
    kind: typeof ArrayKind;
    type: "array";
    items: T;
} & ArrayOptions;
export declare type TLiteral<T extends TValue> = {
    kind: typeof LiteralKind;
    const: T;
} & CustomOptions;
export declare type TEnum<T extends TEnumKey[]> = {
    kind: typeof EnumKind;
    anyOf: T;
} & CustomOptions;
export declare type TString = {
    kind: typeof StringKind;
    type: "string";
} & StringOptions<string>;
export declare type TDateTime = {
    kind: typeof DateTimeKind;
    type: "string";
} & StringOptions<"date-time">;
export declare type TNumber = {
    kind: typeof NumberKind;
    type: "number";
} & NumberOptions;
export declare type TInteger = {
    kind: typeof IntegerKind;
    type: "integer";
} & NumberOptions;
export declare type TBoolean = {
    kind: typeof BooleanKind;
    type: "boolean";
} & CustomOptions;
export declare type TNull = {
    kind: typeof NullKind;
    type: "null";
} & CustomOptions;
export declare type TUnknown = {
    kind: typeof UnknownKind;
} & CustomOptions;
export declare type TAny = {
    kind: typeof AnyKind;
} & CustomOptions;
export declare const ConstructorKind: unique symbol;
export declare const FunctionKind: unique symbol;
export declare const PromiseKind: unique symbol;
export declare const UndefinedKind: unique symbol;
export declare const VoidKind: unique symbol;
export declare type TConstructor<T extends TSchema[], U extends TSchema> = {
    kind: typeof ConstructorKind;
    type: "constructor";
    arguments: readonly [...T];
    returns: U;
} & CustomOptions;
export declare type TFunction<T extends TSchema[], U extends TSchema> = {
    kind: typeof FunctionKind;
    type: "function";
    arguments: readonly [...T];
    returns: U;
} & CustomOptions;
export declare type TPromise<T extends TSchema> = {
    kind: typeof PromiseKind;
    type: "promise";
    item: T;
} & CustomOptions;
export declare type TUndefined = {
    kind: typeof UndefinedKind;
    type: "undefined";
} & CustomOptions;
export declare type TVoid = {
    kind: typeof VoidKind;
    type: "void";
} & CustomOptions;
export declare type TSchema = TIntersect<any> | TUnion<any> | TTuple<any> | TObject<any> | TKeyOf<any> | TRecord<any, any> | TArray<any> | TEnum<any> | TLiteral<any> | TString | TDateTime | TNumber | TInteger | TBoolean | TNull | TUnknown | TAny | TConstructor<any[], any> | TFunction<any[], any> | TPromise<any> | TUndefined | TVoid;
export declare type TRequired<T extends TProperties> = {
    [K in keyof T]: T[K] extends TReadonlyOptional<infer U> ? TReadonly<U> : T[K] extends TReadonly<infer U> ? TReadonly<U> : T[K] extends TOptional<infer U> ? U : T[K];
};
export declare type TPartial<T extends TProperties> = {
    [K in keyof T]: T[K] extends TReadonlyOptional<infer U> ? TReadonlyOptional<U> : T[K] extends TReadonly<infer U> ? TReadonlyOptional<U> : T[K] extends TOptional<infer U> ? TOptional<U> : TOptional<T[K]>;
};
export declare type UnionToIntersect<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export declare type ObjectPropertyKeys<T> = T extends TObject<infer U> ? PropertyKeys<U> : never;
export declare type PropertyKeys<T extends TProperties> = keyof T;
export declare type ReadonlyOptionalPropertyKeys<T extends TProperties> = {
    [K in keyof T]: T[K] extends TReadonlyOptional<TSchema> ? K : never;
}[keyof T];
export declare type ReadonlyPropertyKeys<T extends TProperties> = {
    [K in keyof T]: T[K] extends TReadonly<TSchema> ? K : never;
}[keyof T];
export declare type OptionalPropertyKeys<T extends TProperties> = {
    [K in keyof T]: T[K] extends TOptional<TSchema> ? K : never;
}[keyof T];
export declare type RequiredPropertyKeys<T extends TProperties> = keyof Omit<T, ReadonlyOptionalPropertyKeys<T> | ReadonlyPropertyKeys<T> | OptionalPropertyKeys<T>>;
export declare type ReduceModifiers<T extends object> = {
    [K in keyof T]: T[K];
};
export declare type StaticModifiers<T extends TProperties> = {
    readonly [K in ReadonlyOptionalPropertyKeys<T>]?: T[K] extends TReadonlyOptional<infer U> ? Static<U> : never;
} & {
    readonly [K in ReadonlyPropertyKeys<T>]: T[K] extends TReadonly<infer U> ? Static<U> : never;
} & {
    [K in OptionalPropertyKeys<T>]?: T[K] extends TOptional<infer U> ? Static<U> : never;
} & {
    [K in RequiredPropertyKeys<T>]: Static<T[K]>;
};
export declare type StaticEnum<T> = T extends TEnumKey<infer U>[] ? U : never;
export declare type StaticKeyOf<T extends TKey[]> = T extends Array<infer K> ? K : never;
export declare type StaticIntersect<T extends readonly TSchema[]> = UnionToIntersect<StaticUnion<T>>;
export declare type StaticUnion<T extends readonly TSchema[]> = {
    [K in keyof T]: Static<T[K]>;
}[number];
export declare type StaticTuple<T extends readonly TSchema[]> = {
    [K in keyof T]: Static<T[K]>;
};
export declare type StaticObject<T extends TProperties> = ReduceModifiers<StaticModifiers<T>>;
export declare type StaticRecord<K extends TRecordKey, T extends TSchema> = K extends TString ? {
    [key: string]: Static<T>;
} : K extends TNumber ? {
    [key: number]: Static<T>;
} : K extends TUnion<infer L> ? L extends TLiteral<any>[] ? {
    [K in StaticUnion<L>]: Static<T>;
} : never : never;
export declare type StaticArray<T extends TSchema> = Array<Static<T>>;
export declare type StaticLiteral<T extends TValue> = T;
export declare type StaticConstructor<T extends readonly TSchema[], U extends TSchema> = new (...args: [...{
    [K in keyof T]: Static<T[K]>;
}]) => Static<U>;
export declare type StaticFunction<T extends readonly TSchema[], U extends TSchema> = (...args: [...{
    [K in keyof T]: Static<T[K]>;
}]) => Static<U>;
export declare type StaticPromise<T extends TSchema> = Promise<Static<T>>;
export declare type Static<T> = T extends TKeyOf<infer U> ? StaticKeyOf<U> : T extends TIntersect<infer U> ? StaticIntersect<U> : T extends TUnion<infer U> ? StaticUnion<U> : T extends TTuple<infer U> ? StaticTuple<U> : T extends TObject<infer U> ? StaticObject<U> : T extends TRecord<infer K, infer U> ? StaticRecord<K, U> : T extends TArray<infer U> ? StaticArray<U> : T extends TEnum<infer U> ? StaticEnum<U> : T extends TLiteral<infer U> ? StaticLiteral<U> : T extends TString ? string : T extends TDateTime ? Date : T extends TNumber ? number : T extends TInteger ? number : T extends TBoolean ? boolean : T extends TNull ? null : T extends TUnknown ? unknown : T extends TAny ? any : T extends TConstructor<infer U, infer R> ? StaticConstructor<U, R> : T extends TFunction<infer U, infer R> ? StaticFunction<U, R> : T extends TPromise<infer U> ? StaticPromise<U> : T extends TUndefined ? undefined : T extends TVoid ? void : never;
export declare class TypeBuilder {
    /** `STANDARD` Modifies a schema object property to be `readonly` and `optional`. */
    ReadonlyOptional<T extends TSchema>(item: T): TReadonlyOptional<T>;
    /** `STANDARD` Modifies a schema object property to be `readonly`. */
    Readonly<T extends TSchema>(item: T): TReadonly<T>;
    /** `STANDARD` Modifies a schema object property to be `optional`. */
    Optional<T extends TSchema>(item: T): TOptional<T>;
    /** `STANDARD` Creates a Tuple schema. */
    Tuple<T extends TSchema[]>(items: [...T], options?: CustomOptions): TTuple<T>;
    /** `STANDARD` Creates a `object` schema with the given properties. */
    Object<T extends TProperties>(properties: T, options?: ObjectOptions): TObject<T>;
    /** `STANDARD` Creates an intersection schema. Note this function requires draft `2019-09` to constrain with `unevaluatedProperties`. */
    Intersect<T extends TSchema[]>(items: [...T], options?: IntersectOptions): TIntersect<T>;
    /** `STANDARD` Creates a Union schema. */
    Union<T extends TSchema[]>(items: [...T], options?: CustomOptions): TUnion<T>;
    /** `STANDARD` Creates an `Array<T>` schema. */
    Array<T extends TSchema>(items: T, options?: ArrayOptions): TArray<T>;
    /** `STANDARD` Creates an `Enum<T>` schema from a TypeScript `enum` definition. */
    Enum<T extends TEnumType>(item: T, options?: CustomOptions): TEnum<TEnumKey<T[keyof T]>[]>;
    /** `STANDARD` Creates a literal schema. Supports `string | number | boolean` values. */
    Literal<T extends TValue>(value: T, options?: CustomOptions): TLiteral<T>;
    /** `STANDARD` Creates a `string` schema. */
    String<TCustomFormatOption extends string>(options?: StringOptions<StringFormatOption | TCustomFormatOption>): TString;
    /** `STANDARD` Creates a `date-time` schema. */
    DateTime(options?: StringOptions<"date-time">): TDateTime;
    /** `STANDARD` Creates a `string` schema from a regular expression. */
    RegEx(regex: RegExp, options?: CustomOptions): TString;
    /** `STANDARD` Creates a `number` schema. */
    Number(options?: NumberOptions): TNumber;
    /** `STANDARD` Creates a `integer` schema. */
    Integer(options?: NumberOptions): TInteger;
    /** `STANDARD` Creates a `boolean` schema. */
    Boolean(options?: CustomOptions): TBoolean;
    /** `STANDARD` Creates a `null` schema. */
    Null(options?: CustomOptions): TNull;
    /** `STANDARD` Creates an `unknown` schema. */
    Unknown(options?: CustomOptions): TUnknown;
    /** `STANDARD` Creates an `any` schema. */
    Any(options?: CustomOptions): TAny;
    /** `STANDARD` Creates a `keyof` schema. */
    KeyOf<T extends TObject<TProperties>>(schema: T, options?: CustomOptions): TKeyOf<ObjectPropertyKeys<T>[]>;
    /** `STANDARD` Creates a `Record<Keys, Value>` schema. */
    Record<K extends TRecordKey, T extends TSchema>(key: K, value: T, options?: ObjectOptions): TRecord<K, T>;
    /** `STANDARD` Make all properties in schema object required. */
    Required<T extends TObject<TProperties>>(schema: T, options?: ObjectOptions): TObject<TRequired<T["properties"]>>;
    /** `STANDARD`  Make all properties in schema object optional. */
    Partial<T extends TObject<TProperties>>(schema: T, options?: ObjectOptions): TObject<TPartial<T["properties"]>>;
    /** `STANDARD` Picks property keys from the given object schema. */
    Pick<T extends TObject<TProperties>, K extends PropertyKeys<T["properties"]>[]>(schema: T, keys: [...K], options?: ObjectOptions): TObject<Pick<T["properties"], K[number]>>;
    /** `STANDARD` Omits property keys from the given object schema. */
    Omit<T extends TObject<TProperties>, K extends PropertyKeys<T["properties"]>[]>(schema: T, keys: [...K], options?: ObjectOptions): TObject<Omit<T["properties"], K[number]>>;
    /** `STANDARD` Omits the `kind` and `modifier` properties from the given schema. */
    Strict<T extends TSchema>(schema: T, options?: CustomOptions): T;
    /** `EXTENDED` Creates a `constructor` schema. */
    Constructor<T extends TSchema[], U extends TSchema>(args: [...T], returns: U, options?: CustomOptions): TConstructor<T, U>;
    /** `EXTENDED` Creates a `function` schema. */
    Function<T extends TSchema[], U extends TSchema>(args: [...T], returns: U, options?: CustomOptions): TFunction<T, U>;
    /** `EXTENDED` Creates a `Promise<T>` schema. */
    Promise<T extends TSchema>(item: T, options?: CustomOptions): TPromise<T>;
    /** `EXTENDED` Creates a `undefined` schema. */
    Undefined(options?: CustomOptions): TUndefined;
    /** `EXTENDED` Creates a `void` schema. */
    Void(options?: CustomOptions): TVoid;
    /** `EXPERIMENTAL` Creates a recursive type. */
    Rec<T extends TSchema>(callback: (self: TAny) => T, options?: CustomOptions): T;
    /** `EXPERIMENTAL` Creates a recursive type. Pending https://github.com/ajv-validator/ajv/issues/1709 */
    /** `EXPERIMENTAL` Creates a container for schema definitions. */
    Box<T extends TDefinitions>(definitions: T, options?: CustomOptions): TBox<T>;
    /** `EXPERIMENTAL` References a schema inside a box. The referenced box must specify an `$id`. */
    Ref<T extends TBox<TDefinitions>, K extends keyof T["definitions"]>(box: T, key: K): T["definitions"][K];
    /** `EXPERIMENTAL` References a schema. The referenced schema must specify an `$id`. */
    Ref<T extends TSchema>(schema: T): T;
}
export declare const Type: TypeBuilder;