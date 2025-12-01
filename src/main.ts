import { SudokuGame } from "./logic";
import "./style.css";
import type { RawSudokuState } from "./types";
import { SudokuUi } from "./ui";
import viteLogo from "/vite.svg";

const state1: RawSudokuState = [
  [null, null, null, 9, null, 8, 2, null, null],
  [2, 9, 1, null, 7, null, null, null, null],
  [3, null, 5, 2, null, 6, null, 9, null],
  [5, null, null, 4, null, 7, 8, 2, null],
  [null, 4, null, 1, null, 9, null, 3, null],
  [null, 3, 8, 6, null, 2, null, null, 4],
  [null, 6, null, 3, null, 5, 4, null, 1],
  [null, null, null, null, 6, null, 9, 8, 5],
  [null, null, 7, 8, null, 4, null, null, null],
];

const game1 = new SudokuGame(state1);
const valid = game1.isStateValid();

const gameContainer = document.getElementById("app")!;
const ui = new SudokuUi();
ui.drawGrid(gameContainer, game1);

game1.solveNextStep();
