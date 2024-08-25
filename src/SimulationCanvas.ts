import Simulation from "./Simulation";

export default class SimulationCanvas {
  simulation: Simulation;
  canvas: HTMLCanvasElement;
  ctx: RenderingContext;

  constructor(simulation: Simulation, canvas: HTMLCanvasElement) {
    this.simulation = simulation;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
  }

}