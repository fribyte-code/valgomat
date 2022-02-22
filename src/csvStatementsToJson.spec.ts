import { csvStatementsToJson } from "./csvStatementsToJson";
import { describe, it, expect } from "vitest";
import type { Statement } from "./types";

describe("csvStatementsToJson", () => {
  it("convertsCorrectly", () => {
    const input = `Spørsmål;party A;partyB
a;-2;2
b;2;1`;
    const expected: Statement[] = [
      {
        statement: "a",
        parties: {
          "party A": -2,
          partyB: 2,
        },
      },
      {
        statement: "b",
        parties: {
          "party A": 2,
          partyB: 1,
        },
      },
    ];

    expect(csvStatementsToJson(input)).toEqual(expected);
  });

  it("does not add empty lines", () => {
    const input = `Spørsmål;party A;partyB
a;-2;2

b;2;1

`;
    const expected: Statement[] = [
      {
        statement: "a",
        parties: {
          "party A": -2,
          partyB: 2,
        },
      },
      {
        statement: "b",
        parties: {
          "party A": 2,
          partyB: 1,
        },
      },
    ];

    expect(csvStatementsToJson(input)).toEqual(expected);
  });
});
