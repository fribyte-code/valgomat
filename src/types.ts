export type ValgomatData = {
  /**
   * List of statements to render
   */
  statements: Statement[];
  /**
   * The html to render before starting the valgomat
   */
  introTextHtml: string;
  /**
   * The html to render after finishing the valgomat and results are shown
   */
  resultTextHtml: string;
};

export type Statement = {
  statement: string;
  description?: string;
  parties: {
    [party: string]: number | StatementValue;
  };
};

export type StatementValue = -2 | -1 | 0 | 1 | 2;
