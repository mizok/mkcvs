import { Composition, forEach, randomWithinRange } from '../index';

window.onload = () => {
  let testDiv = document.getElementById('test');
  let comp = new Composition(testDiv);
  let layer0 = comp.newLayer('2d');

  layer0.background('rgba(255,0,0,0.5)');

  comp.onResize = () => {
    layer0.background('rgba(255,0,0,0.5)');
  }
}
