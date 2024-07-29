import './style.css';

function setupAnomalyHeader() {
  const anomalyHeader = document.querySelector(".anomaly-header") as HTMLElement;
  const exitBtn = document.querySelector(".anomaly-header__exit-btn") as HTMLElement;

  exitBtn.addEventListener('click', () => {
    anomalyHeader.style.display = 'none';
  });
}

setupAnomalyHeader();