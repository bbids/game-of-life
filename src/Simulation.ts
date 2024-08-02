import Renderer from "./Renderer";
import { aliveCellsCollection, panningReference } from "./types";

export default class Simulation {
  #aliveCells: aliveCellsCollection = new Map();
  #renderer: Renderer;
  #canvas: HTMLCanvasElement;

  static {
    console.log("simulation");
  }

  constructor(canvas: HTMLCanvasElement) {
    this.#canvas = canvas;
    this.#renderer = new Renderer(this, canvas);

    this.#init();
  }

  /**
  * Zooming and panning:
  * - https://www.sandromaglione.com/articles/infinite-canvas-html-with-zoom-and-pan#convert-coordinates
  * - https://stackoverflow.com/questions/2916081/zoom-in-on-a-point-using-scale-and-translate
  */
  #init() {
    const panningReference: panningReference = {
      x: 0,
      y: 0
    };
    // temporary, later create a pipeline with a drawing process and a running process
    this.#canvas.addEventListener('click', (event) => {
      this.#renderer.drawCellFromClick(event);
    });

    // zooming
    this.#canvas.addEventListener('click', () => {
      this.#canvas.addEventListener('wheel', this.#onMouseWheel);
    });

    // panning
    const onMouseMove = (event: MouseEvent) => {
      this.#onMouseMove(event, panningReference);
      panningReference.x = event.clientX;
      panningReference.y = event.clientY;
    };
    this.#canvas.addEventListener('mousedown', (event: MouseEvent) => {
      panningReference.x = event.clientX;
      panningReference.y = event.clientY;

      this.#canvas.addEventListener('mousemove', onMouseMove);
    })
    this.#canvas.addEventListener('mouseup', () => {
      this.#canvas.removeEventListener('mousemove', onMouseMove);
    })
  }

  fillStartingCells() {
    /*
      Useful for dev.
    */
    this.#aliveCells.clear();
    this.#aliveCells.set({ x: 0, y: 0 }, { age: 0 });
    this.#aliveCells.set({ x: 2, y: 1 }, { age: 0 });
    this.#aliveCells.set({ x: 1, y: 0 }, { age: 0 });
    this.#aliveCells.set({ x: 1, y: 1 }, { age: 0 });
  }

  cycle() {
    // grid and other misc.
    this.#renderer.render();

    this.#renderer.renderAliveCells(this.#aliveCells);
  }

  nextGenerationConway() {
    /*
      Use a new collection for storing the cells that are kept alive.
      Iterate through the cells and apply rules of the game.
      For a soft limit use a cell that was previously farthest away + 1,
      and have a hard limit as well.
    */
  }


  stop() {
    /*
      Is useful?
    */
  }

  #onMouseWheel = (event: WheelEvent) => {
    event.preventDefault();

    if (this.#renderer.updateZooming(event)) {
      this.#renderer.render();
      this.#renderer.renderAliveCells(this.#aliveCells);
    }
  }

  #onMouseMove = (event: MouseEvent, panningReference: panningReference) => {
    this.#renderer.updatePanning(event, panningReference);

    this.#renderer.render();
    this.#renderer.renderAliveCells(this.#aliveCells);
  }
}