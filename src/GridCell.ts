import Cell from "./Cell";
import { cellX, cellY } from "./types";
import { coordinateConversion, viewportTransform } from "./viewportUtils";

export default class GridCell extends Cell {
  x: cellX;
  y: cellY;
  age: number;

  static referenceCellSize: number = 15;

  constructor(x: cellX, y: cellY, age = 0) {
    super();
    this.x = x;
    this.y = y;
    this.age = age;
  }

  toString() {
    return `Cell(${this.x}, ${this.y})`
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const screenCellSize = GridCell.referenceCellSize * viewportTransform.scale;

    const blockX = coordinateConversion.getScreenX(0) + this.x * screenCellSize;
    const blockY = coordinateConversion.getScreenY(0) + this.y * screenCellSize;

    ctx.fillRect(blockX, blockY, screenCellSize, screenCellSize);
  }

  //
  //drawFromClick(event: MouseEvent, ctx: CanvasRenderingContext2D) {
  //  const x: cellX = Math.floor(coordinateConversion.getReferenceX(event.clientX) / GridCell.referenceCellSize);
  //  const y: cellY = Math.floor(coordinateConversion.getReferenceY(event.clientY) / GridCell.referenceCellSize);
//
  //  console.log(x, y);
//
  //  this.draw(ctx);
  //}
}