import Camera from "./Camera";
import Cell from "./GridCell";

export type cellX = number;
export type cellY = number;
export type screenX = number;
export type screenY = number;
export type referenceX = number;
export type referenceY = number;

/**
 * Used for identification of cells.
 * Part of reference coordinate system.
 * Integers only.
 */
export interface cellCoordinatePair {
  x: cellX,
  y: cellY
};

/**
 * Used for drawing
 */
export interface screenCoordinatePair {
  x: screenX,
  y: screenY
}

/**
 * Uses a reference coordinate system that is always the same.
 * Used for computing cell coordinate which use this system.
 */
export interface referenceCoordinatePair {
  x: referenceX,
  y: referenceY
}

export type aliveCellsCollection = Set<Cell>;

/**
 * Used as a reference for computing displacement in panning
 */
export interface panningReference {
  x: number
  y: number
}

export interface CameraControl {
  camera: Camera
}