import Camera from "./Camera";
import Grid from "./Grid";
import Simulation from "./Simulation";
import SimulationCanvas from "./SimulationCanvas";
import { aliveCellsCollection, CameraControl } from "./types";

export default class ConwayCanvas extends SimulationCanvas implements CameraControl {
  grid: Grid;
  camera: Camera;

  constructor(simulation: Simulation, canvas: HTMLCanvasElement) {
    super(simulation, canvas);
    this.simulation = simulation;
    this.camera = new Camera(simulation, canvas);

    // canvas is bscly an image, so can't rely on css for sizing
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;

    this.grid = new Grid(this.canvas);
  }

  draw(aliveCells: aliveCellsCollection) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.grid.draw(this.ctx);
    this.drawAliveCells(aliveCells);
  }

  nextGeneration(aliveCells: aliveCellsCollection) {
    /*
      Use a new collection for storing the cells that are kept alive.
      Iterate through the cells and apply rules of the game.
      For a soft limit use a cell that was previously farthest away + 1,
      and have a hard limit as well.
    */
  }
}