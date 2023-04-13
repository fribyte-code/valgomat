import type { Statement } from "./types";

export function csvStatementsToJson(
  csvStatements: string,
  divider = ";"
): Statement[] {
  const colSplitterRegex = new RegExp(`(?<!\\\\)${divider}`);
  const lines = csvStatements.split("\n");
  const headers = lines[0].split(colSplitterRegex);

  const numParties = headers.length - 2; // First two columns should be question, and details

  const potentialErrors: string[] = [];

  const statements: Statement[] = [];
  for (let i = 1; i < lines.length; i++) {
    const statementWithPartyValues = lines[i];
    if (statementWithPartyValues.trim() === "") {
      continue;
    }
    const cols = statementWithPartyValues.split(colSplitterRegex);

    const statement: Statement = {
      statement: cols[0],
      description: cols[1].replace(/\\|^"|"$/g, ""), // Remove escaped characters and remove leading and trailing quotes
      parties: {},
    };

    if (statement.statement.trim() == "") {
      continue;
    }

    const partiesStartRow = 2;
    for (let j = partiesStartRow; j < cols.length; j++) {
      const party = headers[j];
      const value = Number(cols[j]);
      if (isNaN(value)) {
        potentialErrors.push(
          `${party}'s value: ${cols[j]} is NaN for question ${i}`
        );
      }
      statement.parties[party] = value;
    }

    statements.push(statement);
  }

  statements.forEach((s, idx) => {
    if (Object.values(s.parties).length !== numParties) {
      potentialErrors.push(
        `Statement ${idx}, '${JSON.stringify(
          s
        )}' does not have an answer from all parties!`
      );
    }
  });

  if (potentialErrors.length > 0) {
    throw new Error(
      `${
        potentialErrors.length
      } Errors found during parsing of statements:\n ${potentialErrors.join(
        "\n"
      )}`
    );
  }

  return statements;
}
