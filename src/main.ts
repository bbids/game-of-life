import './style.css';
import './render';

function setupAnomalyHeader() {
  const anomalyHeader = document.querySelector(".anomaly-header") as HTMLElement;
  const exitBtn = document.querySelector(".exit-btn") as HTMLElement;

  exitBtn.addEventListener('click', () => {
    anomalyHeader.style.display = 'none';
  });
}

setupAnomalyHeader();

console.log("?HI");