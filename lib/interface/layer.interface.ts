import { syncData } from './syncData.interface'
export interface Layer {
  ctx?: CanvasRenderingContext2D | WebGLRenderingContext;
  cvs?: HTMLCanvasElement;
  dom?: HTMLElement;
  frameIsPaused?: boolean;
  onResize: Function;
  onFrame: Function;
  layerType: string;
  syncData: syncData;
  setSize?: (width: number, height: number) => void;
  triggerResizingMechanism?: () => void;
}