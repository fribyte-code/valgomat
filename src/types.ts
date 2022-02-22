export type Statement = {
  statement: string;
  parties: {
    [party: string]: number | StatementValue;
  };
};

export type StatementValue = -2 | -1 | 0 | 1 | 2;
