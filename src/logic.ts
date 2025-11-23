import type { CellInfo, RawSudokuState, SudokuState } from "./types";

export class SudokuGame {
  private state: SudokuState;

  constructor(initialState: RawSudokuState) {
    this.state = Array(9)
      .fill(null)
      .map(() => Array(9).fill(null)) as SudokuState;

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const value = initialState[row][col];
        this.state[row][col] = {
          position: { r: row, c: col },
          number: value,
        };
      }
    }
  }

  private getRowCells(rowIndex: number): CellInfo[] {
    return this.state[rowIndex];
  }

  private getColumnCells(colIndex: number): CellInfo[] {
    return Array(9)
      .fill(null)
      .map((_, rowIndex) => this.state[rowIndex][colIndex]);
  }

  private getBlockCells(blockIndex: number): CellInfo[] {
    const startRowIndex = Math.floor(blockIndex / 3) * 3;
    const startColIndex = Math.floor(blockIndex % 3) * 3;

    const cells = [];
    for (let row = startRowIndex; row < startRowIndex + 3; row++) {
      for (let col = startColIndex; col < startColIndex + 3; col++) {
        const cell = this.state[row][col];
        cells.push(cell);
      }
    }

    return cells;
  }

  /**
   * @returns An error message if the state is invalid, or `null` if it is.
   */
  validateState(): string | null {
    // 1) check for numbers outside of 1-9 range
    const numArray = this.state.reduce(
      (arr, row) => [...arr, ...row.map((cell) => cell.number)],
      [] as (number | null)[]
    );

    const invalidNumber = numArray.find(
      (num) => num !== null && (num < 1 || num > 9)
    );
    if (typeof invalidNumber === "number") {
      return `Grid contains the number ${invalidNumber} which is an invalid number for Sudoku.`;
    }

    // 2) check for duplicate numbers in each row
    for (let row = 0; row < 9; row++) {
      const rowNumbers = this.getRowCells(row).map((cell) => cell.number);
      for (let j = 1; j <= 9; j++) {
        if (rowNumbers.filter((num) => num === j).length > 1)
          return `Row ${row + 1} contains multiple number ${j}s.`;
      }
    }

    // 3) check for duplicate numbers in each column
    for (let col = 0; col < 9; col++) {
      const colNumbers = this.getColumnCells(col).map((cell) => cell.number);
      for (let j = 1; j <= 9; j++) {
        if (colNumbers.filter((num) => num === j).length > 1)
          return `Column ${col + 1} contains multiple number ${j}s.`;
      }
    }

    // 4) check for duplicate numbers in block
    for (let blockIndex = 0; blockIndex < 9; blockIndex++) {
      const blockCellNumbers = this.getBlockCells(blockIndex).map(
        (cell) => cell.number
      );
      for (let j = 1; j <= 9; j++) {
        if (blockCellNumbers.filter((num) => num === j).length > 1)
          return `Block ${blockIndex + 1} contains multiple number ${j}s.`;
      }
    }

    return null;
  }

  getAllCells(): CellInfo[] {
    return this.state.flat();
  }

  isStateValid(): boolean {
    const error = this.validateState();
    return error === null;
  }

  isGameOver() {
    // TODO: Implement this function
  }

  solveNextStep() {
    // TODO: Implement this function
  }
}
