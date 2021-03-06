import { Layer, syncData } from '../interface';

export class LayerDom implements Layer {
  public layerType: string = 'dom';
  public syncData: syncData;
  public frameIsPaused: boolean = false;
  public dom: HTMLElement;
  public onFrame: Function = () => { };
  public onResize: Function = () => { };
  private ele: HTMLElement;
  constructor(
    ele: HTMLElement, syncData: syncData
  ) {
    this.ele = ele;
    this.syncData = syncData;
    this.init();
  }
  private init() {
    this.dom = document.createElement('div');
    this.dom.style.position = 'absolute';
    this.dom.style.width = '100%';
    this.dom.style.height = '100%';
    this.ele.prepend(this.dom);
  }


}