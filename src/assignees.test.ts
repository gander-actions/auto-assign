import assert from "node:assert/strict";
import { test } from "node:test";
import { isAssigned } from "./assignees.ts";

test("isAssigned compares logins case-insensitively", () => {
  assert.ok(isAssigned([{ login: "Gander" }], "gander"));
});

test("isAssigned is false when GitHub dropped the login", () => {
  assert.equal(isAssigned([], "gander"), false);
  assert.equal(isAssigned([{ login: "other" }], "gander"), false);
});
