import { Layer, syncData } from '../interface';

export class LayerDom implements Layer {
  public frameIsPaused: boolean = false;
  private canvasSizefixed: boolean = false;
  private ele: HTMLElement;
  private syncData: syncData;
  constructor(
    ele: HTMLElement, syncData: syncData
  ) {
    this.ele = ele;
    this.syncData = syncData;
  }

  triggerResizingMechanism() {
    if (this.canvasSizefixed) return;
  }

  setSize(width: number, height: number) {
    this.canvasSizefixed = true;
  }
}