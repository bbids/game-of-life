import './style.css';
import Simulation from './Simulation';

function setupAnomalyHeader() {
  const anomalyHeader = document.querySelector(".anomaly-header") as HTMLElement;
  const exitBtn = document.querySelector(".exit-btn") as HTMLElement;

  exitBtn.addEventListener('click', () => {
    anomalyHeader.style.display = 'none';
  });
}
setupAnomalyHeader();


const canvas : HTMLCanvasElement | null= document.querySelector('#main-canvas');
if (canvas === null) {
  throw new Error("canvas missing");
}
const simulation = new Simulation(canvas);
simulation.fillStartingCells();
simulation.update();
setInterval(() => {
  simulation.cycle();
}, 100);
