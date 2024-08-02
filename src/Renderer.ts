import Simulation from "./Simulation";
import { aliveCellsCollection, cellCoordinatePair, cellX, cellY, panningReference, referenceX, referenceY, screenX, screenY } from "./types";

export default class Renderer {
  simulation: Simulation;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  // Todo: getter, setters
  displacementX: number;
  displacementY: number;
  scale: number;

  static referenceCellSize: number = 15;
  static zoomSpeed: number = 0.3;

  constructor(simulation: Simulation, canvas: HTMLCanvasElement) {
    this.simulation = simulation;

    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')!;

    // canvas is bscly an image, so can't rely on css for sizing
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;

    this.displacementX = 0;
    this.displacementY = 0;
    this.scale = 1;
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();

    // for development reference
    this.ctx.fillRect(
      this.#toScreenX(0),
      this.#toScreenY(0),
      Renderer.referenceCellSize * this.scale,
      Renderer.referenceCellSize * this.scale);
  }

  renderAliveCells(aliveCells: aliveCellsCollection) {
    aliveCells.forEach((_, cellCoordinatePair) => {
      this.drawCell(cellCoordinatePair);
    });
  }


  drawCellFromClick(event: MouseEvent) {
    const x: cellX = Math.floor(this.#toReferenceX(event.clientX) / Renderer.referenceCellSize);
    const y: cellY = Math.floor(this.#toReferenceY(event.clientY) / Renderer.referenceCellSize);

    console.log(x, y);

    this.drawCell({ x, y });
  }

  drawCell(cellCoordinatePair: cellCoordinatePair) {
    const screenCellSize = Renderer.referenceCellSize * this.scale;

    const blockX = this.#toScreenX(0) + cellCoordinatePair.x * screenCellSize;
    const blockY = this.#toScreenY(0) + cellCoordinatePair.y * screenCellSize;

    this.ctx.fillRect(blockX, blockY, screenCellSize, screenCellSize);
  }

  drawGrid() {
    if (this.scale <= 0.4) return;

    this.ctx.beginPath();
    this.ctx.strokeStyle = 'grey'

    // horizontal
    for (
      let i = this.displacementY % Renderer.referenceCellSize * this.scale;
      i < this.canvas.height;
      i += Renderer.referenceCellSize * this.scale) {
      this.ctx.moveTo(0, i);
      this.ctx.lineTo(this.canvas.width, i);
    }

    // vertical
    for (
      let j = this.displacementX % Renderer.referenceCellSize * this.scale;
      j < this.canvas.width;
      j += Renderer.referenceCellSize * this.scale) {
      this.ctx.moveTo(j, 0);
      this.ctx.lineTo(j, this.canvas.height);
    }

    this.ctx.stroke();
  }

  updateZooming = (event: WheelEvent): boolean => {
    const previousScale = this.scale;
    const zoomSpeedFactor = event.deltaY < 0 ? Renderer.zoomSpeed : -Renderer.zoomSpeed;
  
    // for scaling the zoom speed in a way that doesn't force extreme slow/fast zooms
    const newScale = this.scale * Math.exp(zoomSpeedFactor);
  
    // Necessarily positive, negative will cause bugs
    // 0.05 is arbitrary, but lower limit is necessary for not getting lost on way out
    if (newScale <= 0.05) return false;
  
    // difference to the top left of the element
    const mouseX = (event.clientX / previousScale);
    const mouseY = (event.clientY / previousScale);
  
    // translation += posBefore * increase - posBefore
    this.displacementX -= mouseX * (newScale / previousScale - 1);
    this.displacementY -= mouseY * (newScale / previousScale - 1);
    this.scale = newScale;
  
    return true;
  }

  updatePanning(event: MouseEvent, panningReference: panningReference) {
    const localX = event.clientX;
    const localY = event.clientY;

    const panningSpeed = 1 / this.scale;
  
    this.displacementX += (localX - panningReference.x) * panningSpeed;
    this.displacementY += (localY - panningReference.y) * panningSpeed;
  }

  #toScreenX(x: referenceX): screenX {
    return (x + this.displacementX) * this.scale;
  }

  #toScreenY(y: referenceY): screenY {
    return (y + this.displacementY) * this.scale;
  }

  #toReferenceX(x: screenX): referenceX {
    return (x / this.scale) - this.displacementX;
  }

  #toReferenceY(y: screenY): referenceY {
    return (y / this.scale) - this.displacementY;
  }
}