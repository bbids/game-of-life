import Simulation from "./Simulation";
import { aliveCellsCollection } from "./types";

export default class SimulationCanvas {
  simulation: Simulation;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(simulation: Simulation, canvas: HTMLCanvasElement) {
    this.simulation = simulation;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
  }

  drawAliveCells(aliveCells: aliveCellsCollection) {
    aliveCells.forEach((cell) => {
      cell.draw(this.ctx);
    });
  }

}