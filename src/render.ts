const canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const blockSize = 15;
const zoomSpeed = 0.3;

const cameraTransform = {
  /**
   * origin of Coordinate system is (0,0)
   */
  originX: 0,
    /**
   * origin of Coordinate system is (0,0)
   */
  originY: 0,
  displacementX: 0,
  displacementY: 0,
  scale: 1
};

// Used as a reference for computing displacement in panning
let previousX = 0, previousY = 0;

const updatePanning = (event: MouseEvent) => {
  const localX = event.clientX;
  const localY = event.clientY;

  const panningSpeed = 1 / cameraTransform.scale;

  cameraTransform.displacementX += (localX - previousX) * panningSpeed;
  cameraTransform.displacementY += (localY - previousY) * panningSpeed;

  previousX = localX;
  previousY = localY;
}

const updateZooming = (event: WheelEvent): boolean => {
  const previousScale = cameraTransform.scale;
  const zoomSpeedFactor = event.deltaY < 0 ? zoomSpeed : -zoomSpeed;

  // for scaling the zoom speed in a way that doesn't force extreme slow/fast zooms
  const newScale = cameraTransform.scale * Math.exp(zoomSpeedFactor);

  // Necessarily positive, negative will cause bugs
  // 0.005 is arbitrary, but lower limit is necessary for not getting lost
  if (newScale <= 0.005) return false;

  // difference to the top left of the element
  const mouseX = (event.clientX / previousScale);
  const mouseY = (event.clientY / previousScale);

  // translation += posBefore * increase - posBefore
  cameraTransform.displacementX -= mouseX * (newScale / previousScale - 1);
  cameraTransform.displacementY -= mouseY * (newScale / previousScale - 1);
  cameraTransform.scale = newScale;

  return true;
}

const onMouseMove = (event: MouseEvent) => {
  updatePanning(event);

  render()
}

const onMouseWheel = (event: WheelEvent) => {
  event.preventDefault();

  if (updateZooming(event)) {
    render();
  }
}

// zooming
canvas.addEventListener('click', () => {
  canvas.addEventListener('wheel', onMouseWheel);
});

// panning
canvas.addEventListener('mousedown', (event) => {
  previousX = event.clientX;
  previousY = event.clientY;

  canvas.addEventListener('mousemove', onMouseMove);
})
canvas.addEventListener('mouseup', () => {
  canvas.removeEventListener('mousemove', onMouseMove);
})


canvas.addEventListener('click', (event) => {
  drawBlockFromClick(event);
})

/*
  Differentiate Screen and Coordinate value pairs,
  former meant for drawing and later as a frame
  of reference for computing former.

*/
function toScreenX(xCoordinate: number): number {
  return (xCoordinate + cameraTransform.displacementX) * cameraTransform.scale
}

function toScreenY(yCoordinate: number): number {
  return (yCoordinate + cameraTransform.displacementY) * cameraTransform.scale
}

function toCoordinateX(xScreen: number): number {
  return (xScreen / cameraTransform.scale) - cameraTransform.displacementX;
}

function toCoordinateY(yScreen: number): number {
  return (yScreen / cameraTransform.scale) - cameraTransform.displacementY;
}

/*
  Drawing
*/

function drawBlockFromClick(event: MouseEvent) {
  const blockNrHorizontal = Math.floor(toCoordinateX(event.clientX) / blockSize); 
  const blockNrVertical   = Math.floor(toCoordinateY(event.clientY) / blockSize);

  console.log(blockNrHorizontal, blockNrVertical);

  drawBlock(blockNrHorizontal, blockNrVertical);
}

/**
 * 
 * @param blockNrHorizontal Integer that represents a block
 * @param blockNrVertical Integer that represents a block
 */
function drawBlock(blockNrHorizontal: number, blockNrVertical: number) {
  const { scale } = cameraTransform;

  const displacedOriginX = toScreenX(0);
  const displacedOriginY = toScreenY(0);

  const blockX = displacedOriginX + blockNrHorizontal * blockSize * scale;
  const blockY = displacedOriginY + blockNrVertical   * blockSize * scale;

  ctx.fillRect(blockX, blockY, blockSize * scale, blockSize * scale);
}

function drawGrid() {
  const { displacementX, displacementY, scale } = cameraTransform;
  if (scale <= 0.4) return;
  
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

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();

  // The (0,0) Coordinate pair block
  const { displacementX, displacementY, scale } = cameraTransform;
  ctx.fillRect(displacementX * scale, displacementY * scale, blockSize * scale, blockSize * scale);

  for (let i = 0; i < 150; i++) {
    drawBlock(i, i);
  }
}

render();
