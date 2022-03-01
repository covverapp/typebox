import { Type } from "@sinclair/typebox";
import { ok, fail } from "./validate";

describe("DateTime", () => {
  it("Should not validate number", () => {
    const T = Type.DateTime();
    fail(T, 1);
  });
  it("Should not validate string", () => {
    const T = Type.DateTime();
    fail(T, "hello");
  });
  it("Should not validate boolean", () => {
    const T = Type.DateTime();
    fail(T, true);
  });
  it("Should not validate array", () => {
    const T = Type.DateTime();
    fail(T, [1, 2, 3]);
  });
  it("Should not validate object", () => {
    const T = Type.DateTime();
    fail(T, { a: 1, b: 2 });
  });
  it("Should validate null", () => {
    const T = Type.DateTime();
    ok(T, null);
  });
  it("Should not validate undefined", () => {
    const T = Type.DateTime();
    fail(T, undefined);
  });

  it("Should validate string format as date time", () => {
    const T = Type.DateTime();
    ok(T, "2021-06-11T20:30:00-04:00");
  });

  it("Should not validate empty string", () => {
    const T = Type.DateTime();
    fail(T, "");
  });
});
