import type { Statement } from "./types";

export function csvStatementsToJson(
  csvStatements: string,
  divider = ";"
): Statement[] {
  const lines = csvStatements.split("\n");
  const headers = lines[0].split(divider);

  const statements: Statement[] = [];
  for (let i = 1; i < lines.length; i++) {
    const statementWithPartyValues = lines[i];
    if (statementWithPartyValues.trim() === "") {
      continue;
    }
    const rows = statementWithPartyValues.split(divider);

    const statement: Statement = {
      statement: rows[0],
      description: rows[1],
      parties: {},
    };

    if (statement.statement.trim() == "") {
      continue;
    }

    const partiesStartRow = 2;
    for (let j = partiesStartRow; j < rows.length; j++) {
      const party = headers[j];
      const value = Number(rows[j]);
      statement.parties[party] = value;
    }

    statements.push(statement);
  }

  return statements;
}
