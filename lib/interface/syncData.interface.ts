import { Point } from './point.interface'

export interface syncData {
  mouse: Point;
  isClick: boolean;
  frameCount: number;
  timeElapsed: number;
  previousFrameTime: number;
}