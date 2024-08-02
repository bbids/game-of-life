import Simulation from "./Simulation";
import { panningReference } from "./types";
import { viewportTransform } from "./viewportUtils";

/**
* Zooming and panning:
* - https://www.sandromaglione.com/articles/infinite-canvas-html-with-zoom-and-pan#convert-coordinates
* - https://stackoverflow.com/questions/2916081/zoom-in-on-a-point-using-scale-and-translate
*/

/*
  Todo: A way to remove eventListeners/destroy the camera.
  Todo: Seperate zooming and panning logic.
*/


export default class Camera  {
  static zoomSpeed = 0.3;

  #simulation: Simulation;

  constructor(simulation: Simulation, canvas: HTMLCanvasElement) {
    this.#simulation = simulation;
    this.init(canvas);
  }

  init(canvas: HTMLCanvasElement) {

    const panningReference: panningReference = {
      x: 0,
      y: 0
    };
    // temporary, later create a pipeline with a drawing process and a running process
    // this.#canvas.addEventListener('click', (event) => {
    //   this.#grid.drawCellFromClick(event);
    // });

    // zooming
    canvas.addEventListener('click', () => {
      canvas.addEventListener('wheel', (event: WheelEvent) => {
        this.onMouseWheel(event);
      });
    });

    // panning
    const onMouseMove = (event: MouseEvent) => {
      this.onMouseMove(event, panningReference);
      panningReference.x = event.clientX;
      panningReference.y = event.clientY;
    };
    canvas.addEventListener('mousedown', (event: MouseEvent) => {
      panningReference.x = event.clientX;
      panningReference.y = event.clientY;

      canvas.addEventListener('mousemove', onMouseMove);
    })
    canvas.addEventListener('mouseup', () => {
      canvas.removeEventListener('mousemove', onMouseMove);
    })
  }

  updateZooming(event: WheelEvent): boolean {
    const previousScale = viewportTransform.scale;
    const zoomSpeedFactor = event.deltaY < 0 ? Camera.zoomSpeed : -Camera.zoomSpeed;

    // for scaling the zoom speed in a way that doesn't force extreme slow/fast zooms
    const newScale = viewportTransform.scale * Math.exp(zoomSpeedFactor);

    // Necessarily positive, negative will cause bugs
    // 0.05 is arbitrary, but lower limit is necessary for not getting lost on way out
    if (newScale <= 0.05) return false;

    // difference to the top left of the element
    const mouseX = (event.clientX / previousScale);
    const mouseY = (event.clientY / previousScale);

    // translation += posBefore * increase - posBefore
    viewportTransform.x -= mouseX * (newScale / previousScale - 1);
    viewportTransform.y -= mouseY * (newScale / previousScale - 1);
    viewportTransform.scale = newScale;

    return true;
  }

  updatePanning(event: MouseEvent, panningReference: panningReference) {
    const localX = event.clientX;
    const localY = event.clientY;

    const panningSpeed = 1 / viewportTransform.scale;

    viewportTransform.x += (localX - panningReference.x) * panningSpeed;
    viewportTransform.y += (localY - panningReference.y) * panningSpeed;
  }

  onMouseWheel(event: WheelEvent) {
    event.preventDefault();

    if (this.updateZooming(event)) {
      this.#simulation.update();
    }
  }

  onMouseMove(event: MouseEvent, panningReference: panningReference) {
    this.updatePanning(event, panningReference);

    this.#simulation.update();
  }

}