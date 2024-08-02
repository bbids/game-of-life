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
const canvas = document.querySelector('#main-canvas') as HTMLCanvasElement;
const simulation = new Simulation(canvas);
simulation.fillStartingCells();
simulation.cycle();
