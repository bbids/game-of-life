import Camera from "./Camera";
import Grid from "./Grid";
import GridCell from "./GridCell";
import Simulation from "./Simulation";
import SimulationCanvas from "./SimulationCanvas";
import { aliveCellsCollection, CameraControl } from "./types";

interface canvasRenderingContext2d {
  ctx: CanvasRenderingContext2D
}

export default class ConwayCanvas extends SimulationCanvas implements CameraControl, canvasRenderingContext2d {
  declare ctx: CanvasRenderingContext2D;

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

  draw(aliveCells: Array<Array<number>>) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.grid.draw(this.ctx);

    for (let i = 0; i < aliveCells.length; i++) {
      for (let j = 0; j < aliveCells[i].length; j++) {
        if (aliveCells[i][j] === 1) {
          const cell = new GridCell(i, j);
          cell.draw(this.ctx);
        }
      }
    }
    // aliveCells.forEach((cell: GridCell) => {
    //   cell.draw(this.ctx);
    // });
  }

  nextGeneration(aliveCells: Array<Array<number>>): Array<Array<number>> {
    const newAliveCells: Array<Array<number>> = new Array();
    for (let i = 0; i < aliveCells.length; i++) {
      newAliveCells[i] = new Array(aliveCells.length).fill(0);
    }

    for (let i = 2; i < aliveCells.length - 2; i++) {
      for (let j = 2; j < aliveCells[i].length - 2; j++) {
        let aliveNeighbours = 0;

        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (x === 0 && y === 0) continue;
            if (aliveCells[i + x][j + y]) {
              aliveNeighbours++;
            }
          }
        }

        //
        if (!aliveCells[i][j] && Math.random() > 0.87)
          newAliveCells[i][j] = 0;
        else if(aliveCells[i][j] && aliveNeighbours == 7)
          newAliveCells[i][j] = 0;
        else if (aliveNeighbours == 1)
          newAliveCells[i][j] = 1;
        else if (aliveNeighbours == 0)
          newAliveCells[i][j] = 1;
        else
          newAliveCells[i][j] = 0;
      
      }
    }
    return newAliveCells;
  }
}