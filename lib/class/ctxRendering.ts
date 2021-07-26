import { Layer } from '../interface'

export class CtxRendering {
  constructor(layer: Layer) {
    for (let propertyName in layer) {
      if (propertyName === 'ctx' || propertyName === 'cvs') {
        Object.defineProperty(this, propertyName, {
          value: layer[propertyName],
          writable: false
        });
      }

    }
  }
}