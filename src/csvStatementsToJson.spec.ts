import { csvStatementsToJson } from "./csvStatementsToJson";
import { describe, it, expect } from "vitest";
import type { Statement } from "./types";

describe("csvStatementsToJson", () => {
  it("convertsCorrectly", () => {
    const input = `Spørsmål;Om saken;party A;partyB
a;Noe om sak A;-2;2
b;Noe om sak B;2;1`;
    const expected: Statement[] = [
      {
        statement: "a",
        description: "Noe om sak A",
        parties: {
          "party A": -2,
          partyB: 2,
        },
      },
      {
        statement: "b",
        description: "Noe om sak B",
        parties: {
          "party A": 2,
          partyB: 1,
        },
      },
    ];

    expect(csvStatementsToJson(input)).toEqual(expected);
  });

  it("does not split on escaped dividers", () => {
    const input = `Spørsmål;Om saken;party A;partyB
a;Noe om sak A\\; mer tekst;-2;2
b;Noe om sak B;2;1`;
    const expected: Statement[] = [
      {
        statement: "a",
        description: "Noe om sak A; mer tekst",
        parties: {
          "party A": -2,
          partyB: 2,
        },
      },
      {
        statement: "b",
        description: "Noe om sak B",
        parties: {
          "party A": 2,
          partyB: 1,
        },
      },
    ];

    expect(csvStatementsToJson(input)).toEqual(expected);
  });

  it("removes leading and trailing quotes", () => {
    const input = `Spørsmål;Om saken;party A;partyB
a;"Noe om sak A\\; mer tekst";-2;2`;
    const expected: Statement[] = [
      {
        statement: "a",
        description: "Noe om sak A; mer tekst",
        parties: {
          "party A": -2,
          partyB: 2,
        },
      },
    ];

    expect(csvStatementsToJson(input)).toEqual(expected);
  });

  it("removes escape sign '\\'", () => {
    const input = `Spørsmål;Om saken;party A;partyB
a;"Noe om sak A\\; mer tekst";-2;2`;
    const expected: Statement[] = [
      {
        statement: "a",
        description: "Noe om sak A; mer tekst",
        parties: {
          "party A": -2,
          partyB: 2,
        },
      },
    ];

    expect(csvStatementsToJson(input)).toEqual(expected);
  });

  it("does not add empty lines", () => {
    const input = `Spørsmål;Om saken;party A;partyB
a;;-2;2

b;;2;1

;;
`;
    const expected: Statement[] = [
      {
        statement: "a",
        description: "",
        parties: {
          "party A": -2,
          partyB: 2,
        },
      },
      {
        statement: "b",
        description: "",
        parties: {
          "party A": 2,
          partyB: 1,
        },
      },
    ];

    expect(csvStatementsToJson(input)).toEqual(expected);
  });

  it("crash if any statements miss answer from a party", () => {
    const input = `Spørsmål;Om saken;party A;partyB
a;;-2
b;;2;1
`;

    expect(() => csvStatementsToJson(input)).toThrowError();
  });

  it("crash if any values isNaN", () => {
    const input = `Spørsmål;Om saken;party A;partyB
a;;-2;2
b;;2;not a number
`;

    expect(() => csvStatementsToJson(input)).toThrowError();
  });
});
