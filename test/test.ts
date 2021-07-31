import { Composition, forEach, randomWithinRange, CtxRendering } from '../index';
import { Layer } from '../lib/interface/layer.interface'

window.onload = () => {
  let testDiv = document.getElementById('test');
  let comp = new Composition(testDiv);
  let layer0 = comp.newLayer();
  console.log(layer0);
  new AA(layer0);

}

class AA extends CtxRendering {
  constructor(layer: Layer) {
    super(layer)
  }
  init() {

  }
}
