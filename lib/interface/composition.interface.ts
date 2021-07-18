import { Point, Layer, syncData } from '../interface';

export interface Composition {
  stack: Layer[];
  ele: HTMLElement;
  syncData: syncData;
  addLayer(type: string): void;
  addEventHandler(): void;
  setBlockPreventingMechanism(): void;
  refreshBaseFrameCounter(): void;
}
