import { referenceX, referenceY, screenX, screenY } from "./types";

export const viewportTransform = {
  // x,y displacement
  x: 0,
  y: 0,
  scale: 1
}

export const coordinateConversion = {
  getScreenX(x: referenceX): screenX {
    return (x + viewportTransform.x) * viewportTransform.scale;
  },
  getScreenY(y: referenceY): screenY {
    return (y + viewportTransform.y) * viewportTransform.scale;
  },
  getReferenceX(x: screenX): referenceX {
    return (x / viewportTransform.scale) - viewportTransform.x;
  },
  getReferenceY(y: screenY): referenceY {
    return (y / viewportTransform.scale) - viewportTransform.y;
  }
}
