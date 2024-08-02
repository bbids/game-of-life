import GridCell from "./GridCell";
import { coordinateConversion, viewportTransform } from "./viewportUtils";

export default class Grid {
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (viewportTransform.scale <= 0.4) return;

    ctx.beginPath();
    ctx.strokeStyle = 'grey'

    // horizontal
    for (
      let i = viewportTransform.y % GridCell.referenceCellSize * viewportTransform.scale;
      i < this.canvas.height;
      i += GridCell.referenceCellSize * viewportTransform.scale) {
      ctx.moveTo(0, i);
      ctx.lineTo(this.canvas.width, i);
    }

    // vertical
    for (
      let j = viewportTransform.x % GridCell.referenceCellSize * viewportTransform.scale;
      j < this.canvas.width;
      j += GridCell.referenceCellSize * viewportTransform.scale) {
      ctx.moveTo(j, 0);
      ctx.lineTo(j, this.canvas.height);
    }

    ctx.stroke();

    // for development reference, temporary
    ctx.fillRect(
      coordinateConversion.getScreenX(0),
      coordinateConversion.getScreenY(0),
      GridCell.referenceCellSize * viewportTransform.scale,
      GridCell.referenceCellSize * viewportTransform.scale);
  }

}