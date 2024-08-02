import ConwayCanvas from "./ConwayCanvas";
import GridCell from "./GridCell";
import { aliveCellsCollection } from "./types";

export default class Simulation {
  #aliveCells: aliveCellsCollection = new Set();
  #canvas: ConwayCanvas;

  static {
    console.log("conway simulation, others to follow");
  }

  constructor(canvas: HTMLCanvasElement) {
    this.#canvas = new ConwayCanvas(this, canvas);
  }

  fillStartingCells() {
    /*
      Useful for dev.
    */
    this.#aliveCells.clear();
    this.#aliveCells.add(new GridCell(0, 0));
    this.#aliveCells.add(new GridCell(2, 1));
    this.#aliveCells.add(new GridCell(1, 0));
    this.#aliveCells.add(new GridCell(1, 1));
  }

  cycle() {
    // grid and other misc.
    this.#canvas.nextGeneration(this.#aliveCells);
    this.#canvas.draw(this.#aliveCells);
  }

  update() {
    this.#canvas.draw(this.#aliveCells);
  }

  stop() {
    /*
      Is useful?
    */
  }

}