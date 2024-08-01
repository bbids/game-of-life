const canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const blockSize = 15;

const cameraTransform = {
  originX: 0,
  originY: 0,
  displacementX: 0,
  displacementY: 0,
  scale: 1
};

// We need to keep track of our previous mouse position for later
let previousX = 0, previousY = 0;

const updatePanning = (event: MouseEvent) => {
  const localX = event.clientX;
  const localY = event.clientY;

  cameraTransform.displacementX += localX - previousX;
  cameraTransform.displacementY += localY - previousY;

  previousX = localX;
  previousY = localY;
}

const updateZooming = (event: WheelEvent) => {
  const previousScale = cameraTransform.scale;
  const zoomSpeedFactor = -0.0025;
  const newScale = cameraTransform.scale += event.deltaY * zoomSpeedFactor;

  // difference to the top left
  const mouseX = (event.clientX / previousScale);
  const mouseY = (event.clientY / previousScale);

  // translation += posBefore * increase - posBefore
  cameraTransform.displacementX -= mouseX * (newScale / previousScale - 1);
  cameraTransform.displacementY -= mouseY * (newScale / previousScale - 1);
  cameraTransform.scale = newScale;
}

const onMouseMove = (event: MouseEvent) => {
  updatePanning(event);

  render()
}

const onMouseWheel = (event: WheelEvent) => {
  event.preventDefault();

  updateZooming(event)

  render();
}

canvas.addEventListener('click', () => {
  canvas.addEventListener('wheel', onMouseWheel);
});

canvas.addEventListener('mousedown', (event) => {
  previousX = event.clientX;
  previousY = event.clientY;

  canvas.addEventListener('mousemove', onMouseMove);
})

canvas.addEventListener('mouseup', () => {
  canvas.removeEventListener('mousemove', onMouseMove);
})

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();

  const { displacementX, displacementY, scale } = cameraTransform;
  ctx.fillRect(displacementX * scale, displacementY * scale, blockSize * scale, blockSize * scale);
}

function drawGrid() {
  const { displacementX, displacementY, scale } = cameraTransform;
  if (scale <= 0.25) return;

  ctx.beginPath();
  ctx.strokeStyle = 'grey'

  // horizontal
  for (
    let i = displacementY % blockSize * scale;
    i < canvas.height;
    i += blockSize * scale)
  {
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
  }

  // vertical
  for (
    let j = displacementX % blockSize * scale;
    j < canvas.width;
    j += blockSize * scale)
  {
    ctx.moveTo(j, 0);
    ctx.lineTo(j, canvas.height);
  }

  ctx.stroke();
}

render();
