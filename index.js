const anomalyHeader = document.querySelector(".anomaly-header"); 
const exitBtn       = document.querySelector(".anomaly-header__exit-btn");

exitBtn.addEventListener('click', (event) => {
  anomalyHeader.style.display = 'none';
});

