/*
import Simulation from "./Simulation";

const canvas = document.querySelector('main-canvas') as HTMLCanvasElement;

export let previousX = 0, previousY = 0;

export function zoomListener(simulation: Simulation) {
  canvas.addEventListener('click', () => {
    canvas.addEventListener('wheel', simulation.onMouseWheel);
  });
}

export function panningListener(simulation: Simulation) {
  canvas.addEventListener('mousedown', (event: MouseEvent) => {
    previousX = event.clientX;
    previousY = event.clientY;

    canvas.addEventListener('mousemove', simulation.onMouseMove);
  })
  canvas.addEventListener('mouseup', () => {
    canvas.removeEventListener('mousemove', simulation.onMouseMove);
  })
}
*/

// later a way to draw
//canvas.addEventListener('click', (event) => {
//  this.renderer.drawBlockFromClick(event);
//})