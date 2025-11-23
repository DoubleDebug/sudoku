// 1) UTIL TYPES
type FixedLengthArray<
  T,
  N extends number,
  R extends T[] = []
> = R["length"] extends N ? R : FixedLengthArray<T, N, [T, ...R]>;

// 2) SUDOKU TYPES
export type CellPosition = {
  r: number;
  c: number;
};
export type CellInfo = {
  position: CellPosition;
  number: number | null;
};
export type RawSudokuState = FixedLengthArray<
  FixedLengthArray<number | null, 9>,
  9
>;
export type SudokuState = FixedLengthArray<FixedLengthArray<CellInfo, 9>, 9>;
