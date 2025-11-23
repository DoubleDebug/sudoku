import type { SudokuGame } from "./logic";
import type { CellPosition } from "./types";

export class SudokuUi {
  private getCellId(position: CellPosition) {
    return `cell-${position.r}-${position.c}`;
  }

  drawGrid(container: HTMLElement, game: SudokuGame) {
    const allCells = game.getAllCells();
    const grid = document.createElement("div");
    grid.className = "grid";

    for (let blockIndex = 0; blockIndex < 9; blockIndex++) {
      const block = document.createElement("div");
      block.className = "block";

      for (let blockCellIndex = 0; blockCellIndex < 9; blockCellIndex++) {
        const cellRowIndex =
          Math.floor(blockCellIndex / 3) + Math.floor(blockIndex / 3) * 3;
        const cellColIndex =
          (blockCellIndex % 3) + Math.floor(blockIndex % 3) * 3;

        const cellInfo = allCells.find(
          (cell) =>
            cell.position.r === cellRowIndex && cell.position.c === cellColIndex
        )!;

        const cellElement = document.createElement("div");
        cellElement.className = "cell";
        cellElement.id = this.getCellId(cellInfo.position);

        if (cellInfo.number === null) {
          cellElement.innerText = "";
        } else {
          cellElement.innerHTML = String(cellInfo.number);
          cellElement.className += " opened";
        }

        block.appendChild(cellElement);
      }

      grid.appendChild(block);
    }

    container.appendChild(grid);
  }
}
