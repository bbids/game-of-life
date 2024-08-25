import ConwayCanvas from "./ConwayCanvas";

export default class Simulation {
  //#aliveCells: aliveCellsCollection<GridCell> = new Map();
  #aliveCells: Array<Array<number>> = new Array();
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
    
    for (let i = 0; i < 250; i++) {
      this.#aliveCells[i] = new Array(250).fill(0);
      for (let j = 0; j < 250; j++) {
        this.#aliveCells[i][j] = Math.random() > 0.50 ? 1 : 0;
      }
    }
    // for (let i = 0; i < 40; i++) {
    //   for (let j = 0; j < 50; j++) {
    //     if (Math.random() > 0.1) {
    //       this.#aliveCells.set(`${i},${j}`, new GridCell(i, j));
    //     }
    //   }
    // }

    // this.#aliveCells.set(`${0},${0}`, new GridCell(0, 0));
    // this.#aliveCells.set(`${1},${0}`, new GridCell(1, 0));
    // this.#aliveCells.set(`${2},${0}`, new GridCell(2, 0));
  }

  cycle() {
    // grid and other misc.
    this.#aliveCells = this.#canvas.nextGeneration(this.#aliveCells);
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