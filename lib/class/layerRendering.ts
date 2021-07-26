import { Layer } from '../interface'

export class LayerRendering {
  constructor(layer: Layer) {
    Object.setPrototypeOf(this, layer);
  }
}