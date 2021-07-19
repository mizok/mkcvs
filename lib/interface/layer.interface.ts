import { syncData } from './syncData.interface'
export interface Layer {
  ctx?: CanvasRenderingContext2D | WebGLRenderingContext;
  cvs?: HTMLCanvasElement;
  dom?: HTMLElement;
  frameIsPaused?: boolean;
  layerType: string;
  syncData: syncData;
  setSize?: (width: number, height: number) => void;
  triggerResizingMechanism?: () => void;
  [propName: string]: any;
}